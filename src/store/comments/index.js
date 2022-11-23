import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";
import {selectorsUser} from "../user";

const commentsAdapter = createEntityAdapter();


export const fetchComments = createAsyncThunk(
    "comment/fetchComments",
    (postId, {getState, rejectWithValue}) => {
        if (selectorsComment.selectIds(getState()).length > 0) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }

        return axios.get(`https://jsonplaceholder.typicode.com/comments${postId && `?postId=${postId}`}`)
            .then(response => response.data);

    }
);



export const commentSlice = createSlice({
    name: "comment",
    initialState: commentsAdapter.getInitialState(
        {status: LoadingStatuses.idle}),
    reducers: {
        // addPosts: postsAdapter.addMany,
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(fetchComments.fulfilled, (state, { payload }) => {
                commentsAdapter.setMany(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchComments.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});

export const selectorsComment = commentsAdapter.getSelectors(store => store.comment);

export const selectorIsCommentsLoading = (state) =>  state.comment.status === LoadingStatuses.pending;