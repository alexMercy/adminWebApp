import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async (args = {postId: '', updateFlag: false}, {getState,rejectWithValue}) => {
        const postIds = selectorsPost.selectIds(getState());

        if (((postIds.length > 1) || (postIds.length === 1 && postIds[0] === args.postId)) && !args.updateFlag) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }


        const data = await axios.get(`http://localhost:3300/posts/${args.postId}`)
            .then(response => {
                return response.data;
        });

        // return args.postId ? [data] : data
        return data;
    }
);

export const updatePost = createAsyncThunk(
    "post/updatePost",
    (item, { rejectWithValue}) => {

        return axios.patch(`http://localhost:3300/posts/${item.id}`,
            item,
            {'Content-type': 'application/json; charset=UTF-8'})
            .then(response => (response.data))
            .catch(() => rejectWithValue(LoadingStatuses.failed));
    }
);

export const addPost = createAsyncThunk(
    "post/addPost",
    (item, { rejectWithValue}) => {
        return axios.post(`http://localhost:3300/posts/`,
            item,
            {'Content-type': 'application/json; charset=UTF-8'})
            .then(response => (response.data))
            .catch(() => rejectWithValue(LoadingStatuses.failed));
    }
);

export const deletePost = createAsyncThunk(
    "post/deletePost",
    (postId, { rejectWithValue}) => {

        return axios.delete(`http://localhost:3300/posts/${postId}`)
            .then(response => response.data)
            .catch(() => rejectWithValue(LoadingStatuses.failed));
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
            })

            .addCase(updatePost.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(updatePost.fulfilled, (state, { payload }) => {
                postsAdapter.updateOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(updatePost.rejected, (state) => {
                state.status = LoadingStatuses.failed;
            })

            .addCase(deletePost.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(deletePost.fulfilled, (state, payload) => {
                postsAdapter.removeOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(deletePost.rejected, (state) => {
                state.status = LoadingStatuses.failed;
            })

            .addCase(addPost.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(addPost.fulfilled, (state, { payload }) => {
                postsAdapter.addOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(addPost.rejected, (state) => {
                state.status = LoadingStatuses.failed;
            }),
});

export const selectorsPost = postsAdapter.getSelectors(store => store.post);

export const selectorIsPostLoading = (state) =>  state.post.status === LoadingStatuses.pending;
export const postStatus = (state) =>  state.post.status;
