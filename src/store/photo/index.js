import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";

const photosAdapter = createEntityAdapter();


export const fetchPhotos = createAsyncThunk(
    "photo/fetchPhotos",
    async (albumId, {getState, rejectWithValue}) => {
        if (selectorsPhoto.selectIds(getState()).length > 0) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }


        return await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => {
                return response.data;
            });
    }
);



export const photoSlice = createSlice({
    name: "photo",
    initialState: photosAdapter.getInitialState(
        {status: LoadingStatuses.idle}),
    reducers: {
        // addPosts: postsAdapter.addMany,
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
                photosAdapter.setAll(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchPhotos.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});

export const selectorsPhoto = photosAdapter.getSelectors(store => store.photo);

export const selectorIsPhotoLoading = (state) =>  state.comment.status === LoadingStatuses.pending;