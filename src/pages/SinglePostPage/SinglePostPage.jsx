import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Comments} from "../../components/Comments/Comments";
import {Col, Row, Button, Divider, Space, Form, Input, Modal, Skeleton} from "antd";
import {PostOnSinglePage} from "../../components/PostOnSinglePage/PostOnSinglePage";
import {fetchUsers} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import {ArrowUpOutlined} from "@ant-design/icons";
import {addPost, deletePost, fetchPosts, updatePost} from "../../store/post";

export const SinglePostPage = () => {

    const navigate = useNavigate();
    const postId = useParams().id;
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchUsers())
    }, [postId]);
    function onDelete() {
        dispatch(deletePost(postId))
            .then(()=> dispatch(fetchPosts({updateFlag: true})).then(() => navigate(-1)));
    }


    return (
        <>
            <Row>
                <Col style={{marginRight: "30%", marginLeft: "10%"}} flex="auto">
                    <Space>
                        <Button onClick={() =>setIsModalOpen(true)}>Edit</Button>
                        <Button onClick={onDelete} type={"primary"} danger>Delete</Button>
                        <Button icon={<ArrowUpOutlined />} type={"primary"} onClick={() => navigate(-1)}>Go back</Button>
                    </Space>
                    <Divider style={{marginTop:15,marginBottom:15, borderColor: "#c9c9c9"}}/>
                    <PostOnSinglePage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} postId={postId}/>
                    <Comments postId={postId}/>
                </Col>
            </Row>

        </>
    );
}