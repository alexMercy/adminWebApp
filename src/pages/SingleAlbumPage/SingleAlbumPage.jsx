import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchPhotos, selectorIsPhotoLoading} from "../../store/photo";
import {Spin} from "antd";
import {Slider} from "../../components/Slider/Slider";

export const SingleAlbumPage = () => {

    const albumId = useParams().id;

    const isPhotoLoading = useSelector(selectorIsPhotoLoading);

    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(fetchPhotos({albumId}))
    }, [])

    if (isPhotoLoading) {
        return (<div style={{display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", height: "85vh"}}><Spin size="large"/></div>);
    }


    return(<Slider albumId={albumId}/>);
}