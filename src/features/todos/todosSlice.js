import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0

const todosSlice = createSlice({
  // Prefix for generated Action types
  name: 'todos',
  // the initial state value for the reducer
  initialState: [],
  // an object, where the keys will become action type strings,
  // and the functions are reducers that will be run when that action type is dispatched. 
  reducers: {
    // Action Type: "todos/addTodo"
    addTodo: {
      reducer(state, action) {
        const { id, text } = action.payload;
        state.push({ id, text, completed: false });
      },
      // the prepare `callback`
      prepare(text) {
        return { payload: { text, id: nextTodoId++ } }
      }
    },
    // Action Type: "todos/toggleTodo"
    toggleTodo(state, action) {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
    // NO DEFAULT HANDLER REQD
  }
})
// NOTE: We can do "mutation of STATE", bcoz BTS `produce` from `immer libarary` is used

// todosSlice => 
/*
{
  name: "todos",
  reducer: (state, action) => newState,
  actions: {
    addTodo: (payload) => ({type: "todos/addTodo", payload}),
    toggleTodo: (payload) => ({type: "todos/toggleTodo", payload})
  },
  caseReducers: {
    addTodo: (state, action) => newState,
    toggleTodo: (state, action) => newState,
  }
}
*/

// ActionCreators
export const { addTodo, toggleTodo } = todosSlice.actions;

// Reducer Function
export default todosSlice.reducer;