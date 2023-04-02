import {
  Dictionary,
  EntityId,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from './store';
import {ICoordinate, ILevel, RequestStatus} from '../data-structures';

const levelsAdapter = createEntityAdapter<ILevel>();

export interface ILevelState {
  level: {
    entity: ILevel | null;
    status: RequestStatus;
    activeCoordinate: ICoordinate | null;
    immutableCoordinates: ICoordinate[];
  };
  levels: {
    ids: EntityId[];
    entities: Dictionary<ILevel>;
    status: RequestStatus;
  };
}

const initialState: ILevelState = {
  level: {
    entity: null,
    status: RequestStatus.IDLE,
    activeCoordinate: null,
    immutableCoordinates: [],
  },
  levels: {ids: [], entities: {}, status: RequestStatus.IDLE},
};

export const getLevels = createAsyncThunk('levels/get', async () => {
  return import('./mockData').then((a) => a.mockData);
});

export const getLevel = createAsyncThunk(
  'levels/getOne',
  async (id: string) => {
    return import('./mockData').then((a) =>
      a.mockData.find((level) => level.id === id)
    );
  }
);

const includesCoordinate = (
  coordinates: ICoordinate[],
  coordinate: ICoordinate
) => {
  return coordinates.some(
    (c: ICoordinate) => c.x === coordinate.x && c.y === coordinate.y
  );
};

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    changeActiveCoordinate: (state: ILevelState, action) => {
      const coordinate = action.payload;
      const isCoordinateMutable = !includesCoordinate(
        state.level.immutableCoordinates,
        coordinate
      );
      if (isCoordinateMutable) {
        state.level.activeCoordinate = coordinate;
      }
    },
    changeActiveCoordinateValue: (state: ILevelState, action) => {
      const coordinate = state.level.activeCoordinate;
      if (state.level.entity && coordinate) {
        state.level.entity.matrix[coordinate.y][coordinate.x] = action.payload;
      }
    },
  },
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
        state.level.immutableCoordinates =
          action.payload?.matrix.reduce(
            (matrixCoordinates: ICoordinate[], row: number[], y: number) => {
              const coordinates: ICoordinate[] = row.reduce(
                (rowCoordinates: ICoordinate[], cell: number, x: number) => {
                  if (cell) {
                    return [...rowCoordinates, {x, y}];
                  }
                  return rowCoordinates;
                },
                []
              );

              return [...matrixCoordinates, ...coordinates];
            },
            []
          ) || [];

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

export const selectCoordinateValue =
  (coordinate: ICoordinate) => (state: RootState) =>
    state.level.level.entity?.matrix[coordinate.y][coordinate.x] || null;

export const selectActiveCoordinate = (state: RootState): ICoordinate | null =>
  state.level.level.activeCoordinate;

export const checkMutability =
  (coordinate: ICoordinate) =>
  (state: RootState): boolean =>
    !includesCoordinate(state.level.level.immutableCoordinates, coordinate);

export const {changeActiveCoordinate, changeActiveCoordinateValue} =
  levelSlice.actions;

export const levelReducer = levelSlice.reducer;
