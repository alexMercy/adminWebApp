import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";

const commentsAdapter = createEntityAdapter();


export const fetchComments = createAsyncThunk(
    "comment/fetchComments",
    async (postId, {getState, rejectWithValue}) => {
        if (selectorsComment.selectIds(getState()).length > 0) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }


        return await axios.get(`http://localhost:3300/comments?postId=${postId}`)
            .then(response => {
                return response.data;
            });
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
                commentsAdapter.setAll(state, payload);
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