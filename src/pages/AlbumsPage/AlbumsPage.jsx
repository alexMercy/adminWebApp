import React from "react";
import {Albums} from "../../components/Albums/Albums";



export const AlbumsPage = () => {

    return (
        <Albums />
    );
    // const dispatch = useDispatch();
    // const albumsEntities = useSelector(selectorsAlbum.selectEntities);
    // const albumsIds = useSelector(selectorsAlbum.selectIds);
    //
    // useEffect(() => {
    //     axios.get("https://jsonplaceholder.typicode.com/albums")
    //         .then(response => {
    //             dispatch(actionsAlbum.addAlbums(response.data));
    //         });
    //
    // }, []);
    //
    // return (
    //     <div>
    //         {albumsIds.map(id => (
    //             <div key={id}>{albumsEntities[id].title}</div>
    //         ))}
    //     </div>
    // );
};