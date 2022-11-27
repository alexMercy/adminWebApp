import React from "react";
import {Albums} from "../../components/Albums/Albums";
import {Title} from "../../components/Title/Title";
import albumsVideo from "../../videos/albumsBack.mp4";



export const AlbumsPage = () => {

    return (
        <>
        <div style={{marginBottom:20}}><Title video={albumsVideo} title="Albums"/></div>
            <Albums />
        </>
    );
};