import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchUsers, selectorIsUserLoading} from "../../store/user";
import {fetchAlbums, selectorIsAlbumLoading, selectorsAlbum} from "../../store/album";
import {Album} from "../Album/Album";
import {Space, Spin} from "antd";
import styles from "./styles.module.css";
import {fetchPhotos, selectorIsPhotoLoading} from "../../store/photo";

export const Albums = () => {

    const albumIds = useSelector(selectorsAlbum.selectIds);

    const isUserLoading = useSelector(state => selectorIsUserLoading(state));
    const isAlbumLoading = useSelector(state => selectorIsAlbumLoading(state));
    const isPhotosLoading = useSelector(state => selectorIsPhotoLoading(state));



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchAlbums());
    },[]);

    useEffect(() => {
        if(!albumIds) return;
        albumIds.map(albumId => dispatch(fetchPhotos({albumId: albumId, isCover: true})));
    }, [albumIds])

    if (isPhotosLoading || isUserLoading || isAlbumLoading) {
        return (<div style={{display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", height: "85vh"}}><Spin/></div>);
    }

    if(!albumIds) return;

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Space className={styles.root}>
            <>
                {albumIds.map(albumId => (<Album key={albumId} albumId={albumId}/>))}
            </>
        </Space>
        </div>
    );
}
