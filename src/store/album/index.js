import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {LoadingStatuses} from "../../constants/LoadingStatuses";
import axios from "axios";

export const fetchAlbums = createAsyncThunk(
    "album/fetchAlbums",
    async (_, {getState,rejectWithValue}) => {
        if (selectorsAlbum.selectIds(getState()).length > 0) {
            return rejectWithValue(LoadingStatuses.earlyAdded);
        }

        return axios.get("https://jsonplaceholder.typicode.com/albums")
            .then(response => response.data);
    }
);

const albumsAdapter = createEntityAdapter();

export const albumSlice = createSlice({
    name: "album",
    initialState: albumsAdapter.getInitialState(
        {status: LoadingStatuses.idle}),
    extraReducers: (builder) =>
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.status = LoadingStatuses.pending;
            })
            .addCase(fetchAlbums.fulfilled, (state, {payload} ) => {
                albumsAdapter.setAll(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchAlbums.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),

});

export const selectorsAlbum = albumsAdapter.getSelectors(store => store.album);

export const selectorIsAlbumLoading = (state) =>  state.post.status === LoadingStatuses.pending;
