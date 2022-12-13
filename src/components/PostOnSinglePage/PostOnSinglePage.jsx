import styles from "./styles.module.css";
import {Button, Card, Col, Divider, Form, Input, Modal, Row, Skeleton, Space} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectorIsPostLoading, selectorsPost, updatePost} from "../../store/post";
import {selectorIsUserLoading, selectorsUser} from "../../store/user";

export const PostOnSinglePage = ({isModalOpen, setIsModalOpen, postId}) => {

    const post = useSelector(state => selectorsPost.selectById(state, postId));
    const user = useSelector(state => selectorsUser.selectById(state, post?.userId));

    const isPostLoading = useSelector((state) => selectorIsPostLoading(state));
    const isUserLoading = useSelector(state => selectorIsUserLoading(state));

    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");

    const handleOk = () => {
        if (!title) return;
        const dataItem = {
            userId: "1",
            id: postId,
            title: title,
            body: body
        }

        dispatch(updatePost(dataItem))
            .then(() => dispatch(fetchPosts({postId, updateFlag: true}))
                .then(()=> setIsModalOpen(false)));

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts({postId}));
    }, [postId]);

    if (isUserLoading || isPostLoading){
        return (
                <Card
                    title=""
                    bordered={false}
                    className={styles.root}
                >
                    <Skeleton/>
                </Card>
               );
    }

    return (
        <>
            <Card
                title={<span className={styles.title} >{post?.title}</span>}
                bordered={false}
                className={styles.root}
            >
                <div className={styles.container}>
                    <span>{post?.body}</span>
                </div>
                <Divider/>
                <div className={styles.author}>Author: {user?.name}</div>
            </Card>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form  name="add-post">
                    <Form.Item
                        name={['title']}
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input  onChange={(e) => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item name={['body']} label="Body">
                        <Input.TextArea  onChange={(e) => setBody(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}