import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchUsers, selectorIsUserLoading} from "../../store/user";
import {fetchAlbums, selectorIsAlbumLoading, selectorsAlbum} from "../../store/album";
import {Album} from "../Album/Album";
import {Button, Space} from "antd";
import styles from "./styles.module.css";

export const Albums = () => {

    const [counterAlbums, setCount] = useState(0);

    const albumIds = useSelector(selectorsAlbum.selectIds);

    const isUserLoading = useSelector(state => selectorIsUserLoading(state));
    const isAlbumLoading = useSelector(state => selectorIsAlbumLoading(state));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchAlbums());
    },[]);

    if (isUserLoading) {
        return (<div>Loading...</div>);
    }

    if(!albumIds) return;

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Space className={styles.root}>
            <>
                {albumIds.slice(0, 8 + 8 * counterAlbums).map(albumId => (
                <Album key={albumId} albumId={albumId}/>))}
            </>
        </Space>
            <Button onClick={() => setCount(counterAlbums + 1)}>View more</Button>
            {counterAlbums}
        </div>
    );
}
