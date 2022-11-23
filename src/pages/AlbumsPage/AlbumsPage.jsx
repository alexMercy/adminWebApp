import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {actionsAlbum, selectorsAlbum} from "../../store/album";

export const AlbumsPage = () => {
    const dispatch = useDispatch();
    const albumsEntities = useSelector(selectorsAlbum.selectEntities);
    const albumsIds = useSelector(selectorsAlbum.selectIds);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then(response => {
                dispatch(actionsAlbum.addAlbums(response.data));
            });

    }, []);

    return (
        <div>
            {albumsIds.map(id => (
                <div key={id}>{albumsEntities[id].title}</div>
            ))}
        </div>
    );
};