import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";

const photosAdapter = createEntityAdapter(
    {sortComparer: (a, b) => a.id - b.id,}
);


export const fetchPhotos = createAsyncThunk(
    "photo/fetchPhotos",
    async ({albumId, isCover}, {getState, rejectWithValue}) => {
        const photos = selectorsPhoto.selectById(getState(), albumId)?.photos;
        if (photos?.length > 1) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }


        return await axios.get(`http://localhost:3300/photos?albumId=${albumId}${isCover? "&_limit=1" : ""}`)
            .then(response => {
                return {id: albumId,  photos: response.data};
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
                photosAdapter.upsertOne(state, payload);
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

export const selectorIsPhotoLoading = (state) =>  state.photo.status === LoadingStatuses.pending;
