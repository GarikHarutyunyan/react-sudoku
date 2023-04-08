import {
  Dictionary,
  EntityId,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from './store';
import {ICoordinate, ILevel, RequestStatus} from '../data-structures';
import {GameUtils, MatrixUtils} from '../utils';

const levelsAdapter = createEntityAdapter<ILevel>();

export interface ILevelState {
  level: {
    entity: ILevel | null;
    status: RequestStatus;
    isSolved: boolean;
    activeCoordinate: ICoordinate | null;
    immutableCoordinates: ICoordinate[];
    emptyCoordinatesCount: number;
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
    isSolved: false,
    activeCoordinate: null,
    immutableCoordinates: [],
    emptyCoordinatesCount: 81,
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
      const coordinate: ICoordinate = action.payload;
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
        const oldValueWasEmpty: boolean =
          state.level.entity.matrix[coordinate.y][coordinate.x] === 0;

        state.level.entity.matrix[coordinate.y][coordinate.x] = action.payload;

        if (oldValueWasEmpty) {
          state.level.emptyCoordinatesCount--;
        }

        const allCoordinatesAreFilled: boolean =
          state.level.emptyCoordinatesCount === 0;

        if (allCoordinatesAreFilled) {
          const gameIsSolved: boolean = GameUtils.checkSolution(
            state.level.entity.matrix
          );

          if (gameIsSolved) {
            state.level.isSolved = true;
          }
        }
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
        if (action.payload) {
          state.level.immutableCoordinates = MatrixUtils.getFilledCoordinates(
            action.payload.matrix
          );

          state.level.emptyCoordinatesCount =
            81 - state.level.immutableCoordinates.length;

          levelsAdapter.setOne(state.levels, action.payload);
        }
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

export const checkIsSolved = (state: RootState): boolean =>
  state.level.level.isSolved;

export const {changeActiveCoordinate, changeActiveCoordinateValue} =
  levelSlice.actions;

export const levelReducer = levelSlice.reducer;
