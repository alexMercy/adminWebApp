import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchUsers, selectorIsUserLoading} from "../../store/user";
import {fetchAlbums, selectorIsAlbumLoading, selectorsAlbum} from "../../store/album";
import {Album} from "../Album/Album";

export const Albums = () => {

    const albumIds = useSelector(selectorsAlbum.selectIds);

    const isUserLoading = useSelector(state => selectorIsUserLoading(state));
    const isAlbumLoading = useSelector(state => selectorIsAlbumLoading(state));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchAlbums());
    },[]);

    if (isUserLoading || isAlbumLoading) {
        return (<div>Loading...</div>);
    }

    return (
        <div style={{display: "flex", flexDirection:"column", alignItems: "flex-start"}}>{albumIds.map(albumId => (
            <Album key={albumId} albumId={albumId}/>
        ))}</div>
    );
}
