import React, { createContext, useReducer, useContext, useState } from 'react';

export type StateType = Record<string, any>

export interface EventInterface {
  name: string
  handler: () => void
}

interface VMContextValue {
  state: any;
  events: any[];
  dispatchState: (value: any) => void;
  registerEvent: (event: any) => void;
  dispatchEvent: (event: any) => void | undefined;
}

const initialState = {};

const VMContext = createContext<VMContextValue>({
  state: {},
  events: [],
  dispatchState: () => {},
  dispatchEvent: () => {},
  registerEvent: () => {},
});

const reducer = (state: StateType, updated: StateType ) => {
  return {
    ...state,
    ...updated,
  };
}

const VMContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [events, setEvents] = useState<EventInterface[]>([]);

  const registerEvent = (event: EventInterface) => {
    setEvents([...events, event]);
  }

  const dispatchEvent = (name: string) => {
    const eventIndex = events.findIndex((e) => e.name === name);

    if (eventIndex !== -1) {
      events[eventIndex].handler();
    }
  }

  const dispatchState = (value: StateType) => dispatch(value)

  return (
    <VMContext.Provider value={{ state, events, dispatchEvent, registerEvent, dispatchState }}>
      {children}
    </VMContext.Provider>
  );
};

const useVMContext = () => {
  return useContext(VMContext);
};

export { VMContextProvider, useVMContext };
