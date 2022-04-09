export const todoReducer = (state=[], action) => {
  switch(action.type) {
    case 'AGREGAR':
      return [
        ...state,
        action.payload
      ]
    break;
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}
