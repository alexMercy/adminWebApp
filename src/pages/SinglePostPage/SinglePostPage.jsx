import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Comments} from "../../components/Comments/Comments";
import {Col, Row, Button, Divider, Space} from "antd";
import {PostOnSinglePage} from "../../components/PostOnSinglePage/PostOnSinglePage";
import {fetchUsers} from "../../store/user";
import {useDispatch} from "react-redux";
import {ArrowUpOutlined} from "@ant-design/icons";

export const SinglePostPage = () => {

    const navigate = useNavigate();
    const postId = Number(useParams().id);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [postId]);

    return (
        <Row>
            <Col style={{marginRight: "30%", marginLeft: "10%"}} flex="auto">
                <Space>
                    <Button>Edit</Button>
                    <Button type={"primary"} danger>Delete</Button>
                    <Button icon={<ArrowUpOutlined />} type={"primary"} onClick={() => navigate(-1)}>Go back</Button>
                </Space>
                <Divider style={{marginTop:15,marginBottom:15, borderColor: "#c9c9c9"}}/>
                <PostOnSinglePage postId={postId}/>
                <Comments postId={postId}/>
            </Col>

        </Row>
    );
}