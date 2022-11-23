import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const albumsAdapter = createEntityAdapter();
const initialState = albumsAdapter.getInitialState();

export const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        addAlbums: albumsAdapter.addMany,

    },
});

export const actionsAlbum = albumSlice.actions;
export const selectorsAlbum = albumsAdapter.getSelectors(store => store.album);
