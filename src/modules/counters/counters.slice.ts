import { AppState } from "../../store";

type CounterState = {
    counter: number;
};

export type CounterId = string;

type CountersState = Record<CounterId, CounterState | null>;

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

type Action = IncrementAction | DecrementAction;

const initialCountersState: CountersState = {};
const initialCounterState: CounterState = { counter: 0 };

export const countersReducer = (state = initialCountersState, action: Action): CountersState => {
    switch (action.type) {
      case "increment": {
        const { counterId } = action.payload;
        const currentCounter = state[counterId] ?? initialCounterState;
        return {
          ...state,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        };
      }
      case "decrement": {
        const { counterId } = action.payload;
        const currentCounter = state[counterId] ?? initialCounterState;
        return {
          ...state,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        };
      }
      default:
        return state;
    }
};

export const selectCounter = (state: AppState, counterId: CounterId) =>
    state.counters[counterId];