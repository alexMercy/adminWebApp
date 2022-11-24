import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectorIsUserLoading, selectorsUser} from "../../store/user";
import {fetchAlbums, selectorsAlbum} from "../../store/album";
import {fetchPhotos, selectorIsPhotoLoading} from "../../store/photo";
import {useEffect} from "react";
import {Slider} from "../Slider/Slider";

export const Album = ({albumId}) => {
    const album = useSelector(state => selectorsAlbum.selectById(state, albumId));
    const user = useSelector(state => selectorsUser.selectById(state, album?.userId));

    const isPhotosLoading = useSelector(state => selectorIsPhotoLoading(state));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos(albumId));
    },[albumId]);

    if (isPhotosLoading) {
        return (<div>Loading...</div>)
    }

    return(
        <Slider/>
    );

}