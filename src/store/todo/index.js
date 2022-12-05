import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";

const todosAdapter = createEntityAdapter();


export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    (_, {getState, rejectWithValue}) => {
        if (selectorsTodo.selectIds(getState()).length > 0) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }
        console.log("wanna localhost ")
        return axios.get("http://localhost:3300/todos?_limit=10")
            .then(response => response.data);
    }
);


export const updateTodo = createAsyncThunk(
    "todo/updateTodo",
    (item, { rejectWithValue}) => {

        return axios.patch(`http://localhost:3300/todos/${item.id}`,
            item,
            {'Content-type': 'application/json; charset=UTF-8'})
            .then(response => (response.data))
            .catch(() => rejectWithValue(LoadingStatuses.failed));
    }
);

export const addTodo = createAsyncThunk(
    "todo/addTodo",
    (item, { rejectWithValue}) => {

        return axios.post(`http://localhost:3300/todos/`,
            JSON.stringify(item),
            {'Content-type': 'application/json; charset=UTF-8'})
            .then(response => (response.data))
            .catch(() => rejectWithValue(LoadingStatuses.failed));
    }
);

export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
    (item, { rejectWithValue}) => {

        return axios.delete(`http://localhost:3300/todos/${item.id}`)
            .then(response => response.data)
            .catch(() => rejectWithValue(LoadingStatuses.failed));
    }
);



export const todoSlice = createSlice({
    name: "todo",
    initialState: todosAdapter.getInitialState(
        {status: LoadingStatuses.idle}),
    reducers: {
        // addPosts: postsAdapter.addMany,
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(fetchTodos.fulfilled, (state, { payload }) => {
                todosAdapter.addMany(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchTodos.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            })

            .addCase(updateTodo.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(updateTodo.fulfilled, (state, { payload }) => {
                todosAdapter.updateOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(updateTodo.rejected, (state) => {
            state.status = LoadingStatuses.failed;
            })

            .addCase(deleteTodo.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(deleteTodo.fulfilled, (state) => {
                state.status = LoadingStatuses.success;
            })
            .addCase(deleteTodo.rejected, (state) => {
                state.status = LoadingStatuses.failed;
            })

            .addCase(addTodo.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(addTodo.fulfilled, (state, { payload }) => {
                todosAdapter.addOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(addTodo.rejected, (state) => {
                state.status = LoadingStatuses.failed;
            }),
});

export const selectorsTodo = todosAdapter.getSelectors(store => store.todo);

export const selectorIsTodoSuccess = (state) =>  state.todo.status === LoadingStatuses.success;
