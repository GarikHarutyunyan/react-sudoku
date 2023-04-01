import {
  Dictionary,
  EntityId,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {ILevel, RequestStatus} from "../data-structures";

const levelsAdapter = createEntityAdapter<ILevel>();

export interface ILevelState {
  level: {
    entity: ILevel | null;
    status: RequestStatus;
  };
  levels: {
    ids: EntityId[];
    entities: Dictionary<ILevel>;
    status: RequestStatus;
  };
}

const initialState: ILevelState = {
  level: {entity: null, status: RequestStatus.IDLE},
  levels: {ids: [], entities: {}, status: RequestStatus.IDLE},
};

export const getLevels = createAsyncThunk("levels/get", async () => {
  return import("./mockData").then((a) => a.mockData);
});

export const getLevel = createAsyncThunk(
  "levels/getOne",
  async (id: string) => {
    return import("./mockData").then((a) =>
      a.mockData.find((level) => level.id === id)
    );
  }
);

export const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLevels.pending, (state) => {
        state.levels.status = RequestStatus.LOADING;
      })
      .addCase(getLevels.fulfilled, (state, action) => {
        state.levels.status = RequestStatus.SUCCEEDED;
        levelsAdapter.setAll(state.levels, action.payload);
      })
      .addCase(getLevels.rejected, (state) => {
        state.levels.status = RequestStatus.FAILED;
      });

    builder
      .addCase(getLevel.pending, (state) => {
        state.levels.status = RequestStatus.LOADING;
      })
      .addCase(getLevel.fulfilled, (state, action) => {
        state.levels.status = RequestStatus.SUCCEEDED;
        state.level.entity = action.payload || null;
        action.payload && levelsAdapter.setOne(state.levels, action.payload);
      })
      .addCase(getLevel.rejected, (state) => {
        state.levels.status = RequestStatus.FAILED;
      });
  },
});

const levelsSelectors = levelsAdapter.getSelectors<RootState>(
  (state: RootState) => state.level.levels
);

export const selectLevels = (state: RootState): ILevel[] =>
  levelsSelectors.selectAll(state);

export const selectLevel = (state: RootState): ILevel | null =>
  state.level.level.entity;

// export const {} = levelSlice.actions;

export const levelReducer = levelSlice.reducer;
