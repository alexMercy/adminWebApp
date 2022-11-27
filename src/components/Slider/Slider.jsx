import styles from "./styles.module.css";
import {Button, Col, Row, Spin, Typography} from "antd";
import {LeftOutlined, RightOutlined, CloseOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {selectorIsPhotoLoading, selectorsPhoto} from "../../store/photo";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const Slider = ({albumId}) => {

    const [state, setState] = useState({currentId: 0, length: 0});

    const navigate = useNavigate();

    const photosObject = useSelector(state => selectorsPhoto.selectById(state, albumId));
    const isLoading = useSelector(selectorIsPhotoLoading);

    useEffect(() => {
        if (photosObject)
        setState({currentId: 0, length: photosObject.photos.length})
    }, [photosObject])

    if (isLoading || !photosObject) return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", height: "85vh"}}><Spin size="large"/></div>);


    const onButtonClick = (direction) => {
        const {currentId, length} = state;
        const newId = currentId + direction

        if( newId < 0) {
            setState(prevState => {
                prevState = {...prevState};
                prevState.currentId = length + newId;
                return prevState;
            });
        }
        else if( newId >= 0 && newId < length) {
            setState(prevState => {
                prevState = {...prevState};
                prevState.currentId = newId;
                return prevState;
            });
        }
        else if( newId >= length) {
            setState(prevState => {
                prevState = {...prevState};
                prevState.currentId = newId - length;
                return prevState;
            });
        }
    }

    const photo = photosObject.photos[state.currentId];

    return(
        <div>
            <Row style={{height: "84.4vh"}}>
                <Col flex={1}>
                    <div style={{height: "10vh"}}></div>
                    <Button onClick={() => onButtonClick(-1)} className={styles.button} style={{width: "100%"}}
                            type={"text"}
                            icon={<LeftOutlined />}/>
                </Col>
                <Col flex={3} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}} >
                    <div style={{height: "10vh", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 114}}>
                        <Typography.Title style={{display: "flex", justifyContent:"center"}}
                                          level={3}>Photo #{state.currentId + 1}</Typography.Title>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around",
                        flexDirection: "column", height:600, width: 500, marginBottom: 10}}>

                        <img style={{width: 500}} alt={photo.title} src={photo.url}/>
                        <Typography.Title  level={3}>
                            <span style={{display:"block", height: 64, textAlign: "center"}}>{photo.title}</span
                            ></Typography.Title>
                    </div>

                </Col>
                <Col flex={1}>
                    <Button onClick={() => navigate(-1)} className={styles.close} style={{width: "100%"}}
                            type={"text"}
                            icon={<CloseOutlined />}/>

                    <Button onClick={() => onButtonClick(1)} className={styles.button} style={{width: "100%"}}
                            type={"text"}
                            icon={<RightOutlined />}/>
                </Col>
            </Row>
        </div>
    );
}