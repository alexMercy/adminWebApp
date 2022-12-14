import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async (postId="", {getState,rejectWithValue}) => {
        const postIds = selectorsPost.selectIds(getState());

        if ((postIds.length > 1) || (postIds.length === 1 && postIds[0] === postId)) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }


        const data = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                return response.data;
        });

        return postId ? [data] : data
    }
);

const postsAdapter = createEntityAdapter();

export const postSlice = createSlice({
    name: "post",
        initialState: postsAdapter.getInitialState(
            {status: LoadingStatuses.idle}),
    extraReducers: (builder) =>
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(fetchPosts.fulfilled, (state, {payload} ) => {
                postsAdapter.setAll(state, payload);
                state.status = LoadingStatuses.success;

            })
            .addCase(fetchPosts.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),

});

export const selectorsPost = postsAdapter.getSelectors(store => store.post);

export const selectorIsPostLoading = (state) =>  state.post.status === LoadingStatuses.pending;
