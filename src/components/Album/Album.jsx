import {useSelector} from "react-redux";
import {selectorsUser} from "../../store/user";
import {selectorsAlbum} from "../../store/album";
import {selectorsPhoto} from "../../store/photo";
import {Card} from "antd";
import {Link} from "react-router-dom";

const {Meta} = Card;

export const Album = ({albumId}) => {
    const album = useSelector(state => selectorsAlbum.selectById(state, albumId));
    const user = useSelector(state => selectorsUser.selectById(state, album.userId));
    const photosEntity = useSelector(state => selectorsPhoto.selectById(state, albumId));

    if (! (album && user && photosEntity)) return;

    const photo = photosEntity.photos[0];

    return(
        <Link to={"/albums/" + albumId}>
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt="album" src={photo.url} />}
            >
                <Meta title={photo.title} description={photo.url} />
            </Card>
        </Link>
    );

}