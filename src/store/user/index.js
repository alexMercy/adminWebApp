import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import {useSelector} from "react-redux";
import axios from "axios";

const usersAdapter = createEntityAdapter();


export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    (_, {rejectWithValue}) => {
        // const userIds = useSelector(usersAdapter.getSelectors(store => store.post).selectIds);
        // if (userIds.length > 0) {
        //     return rejectWithValue(LoadingStatuses.earlyAdded);
        // }

        return axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => response.data);
    }
);

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    (userId, {rejectWithValue}) => {
        // const userIds = useSelector(usersAdapter.getSelectors(store => store.post).selectIds);
        // if (userIds.length > 0) {
        //     return rejectWithValue(LoadingStatuses.earlyAdded);
        // }

        return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
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
                usersAdapter.addMany(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchUsers.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            })
            .addCase(fetchUser.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(fetchUser.fulfilled, (state, { payload }) => {
                usersAdapter.addOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchUser.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});

export const selectorsUser = usersAdapter.getSelectors(store => store.user);
