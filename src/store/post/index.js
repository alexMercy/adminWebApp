import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";
import {selectorsUser} from "../user";

export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
     (postId="", {getState,rejectWithValue}) => {
         if (selectorsPost.selectIds(getState()).length > 0) {
             return rejectWithValue(LoadingStatuses.earlyAdded);
         }

         return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(response => {
                    return response.data;
                });

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
                postsAdapter.setMany(state, payload);
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
