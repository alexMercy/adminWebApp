import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const todosAdapter = createEntityAdapter();
const initialState = todosAdapter.getInitialState();


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodos: todosAdapter.addMany,
    },
});

export const actionsTodo = todoSlice.actions;
export const selectorsTodo = todosAdapter.getSelectors(store => store.todo);
