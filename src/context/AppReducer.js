const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      }
    default:
      return state;
  }
};

export default reducer;