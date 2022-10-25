import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  orders: [
    {
      id: Math.floor(Math.random() * 100000000),
      name: 'Simona Petreska',
      email: 'simona@petreska.se',
      from: 'Street 3, Skopje',
      to: 'Street 17, Skopje',
      distance: 10,
      livingArea: 67,
      atticArea: 6,
      piano: false,
      total: 3300
    }
  ]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addOrder(order) {
    dispatch({
      type: 'ADD_ORDER',
      payload: order
    });
  }

  return (
    <GlobalContext.Provider 
      value={{
        orders: state.orders,
        addOrder
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};