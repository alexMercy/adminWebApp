import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import {useSelector} from "react-redux";
import axios from "axios";

const usersAdapter = createEntityAdapter();


export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    (_, {getState, rejectWithValue}) => {
        if (selectorsUser.selectIds(getState()).length > 0) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }

        return axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => response.data);
    }
);



export const userSlice = createSlice({
    name: "user",
    initialState: usersAdapter.getInitialState(
        {status: LoadingStatuses.idle}),
    reducers: {
        // addPosts: postsAdapter.addMany,
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                usersAdapter.setMany(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchUsers.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});

export const selectorsUser = usersAdapter.getSelectors(store => store.user);

export const selectorIsUserLoading = (state) =>  state.user.status === LoadingStatuses.pending;