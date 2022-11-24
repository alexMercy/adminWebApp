import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchUsers, selectorIsUserLoading} from "../../store/user";
import {fetchAlbums, selectorIsAlbumLoading, selectorsAlbum} from "../../store/album";

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
        <div>
            {albumIds.map(albumId => (
                <div>{albumId}</div>)
                // <Album key={albumId} commentId={albumId}/>
            )}
        </div>
    );
}
