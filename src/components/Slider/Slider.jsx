import {useSelector} from "react-redux";
import {selectorIsPhotoLoading, selectorsPhoto} from "../../store/photo";
import {Space, Typography} from "antd";
import {CaretLeftFilled, CaretRightFilled} from "@ant-design/icons";

export const Slider = ({albumId}) => {
    // const album = useSelector(state => selectorsAlbum.selectById(state, albumId));
    const photos = useSelector(state => selectorsPhoto.selectById(state,albumId)?.photos);

    if (!photos) return;

    return(
        <Space style={{display: "flex", alignItems: "center"}}>
            <CaretLeftFilled  style={{fontSize: "large"}}/>
            <div style={{width: 150, height: 170, overflow:"hidden", display: "flex"}}>
                {photos.map(photo => (
                    <div style={{display:"flex", flexDirection: "column",width: 150, height: 150}}>
                        <img style={{ maxHeight:"100%"}} key={photo.id}  src={photo.url} alt=""/>
                        <Typography style={{position: "relative", display: "block", height: 50}}>{photo.title}</Typography>
                    </div>))};
            </div>
            <CaretRightFilled style={{fontSize: "large"}}/>
        </Space>

    );
}