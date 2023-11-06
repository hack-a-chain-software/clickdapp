import React, { createContext, useReducer, useContext, useState } from 'react';

interface VMContextValue {
  state: any;
  events: any[];
  dispatchState: (value: any) => void;
  registerEvent: (callback: any, state: any) => void;
  dispatchEvent: (callback: any, state: any) => void | undefined;
}

const initialState = {};

const VMContext = createContext<VMContextValue>({
  state: {},
  events: [],
  dispatchState: () => {},
  dispatchEvent: () => {},
  registerEvent: () => {},
});

const reducer = (state: any, action: any) => {
  return {
    ...state,
    ...action,
  };
}

const VMContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [events, setEvents] = useState<any[]>([]);

  const registerEvent = (event: any) => {
    setEvents([...events, event]);
  }

  const dispatchEvent = (event: any) => {
    const eventIndex = events.findIndex((e) => e.name === event.name);

    if (eventIndex !== -1) {
      events[eventIndex].handler();
    }
  }

  const dispatchState = (value: any) => dispatch(value)

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
