import {Post} from "../Post/Post";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPost, fetchPosts, selectorIsPostLoading, selectorsPost} from "../../store/post";
import {fetchUsers} from "../../store/user";
import styles from "./styles.module.css";
import {Button, Card, Form, Input, Modal, Skeleton, Space} from "antd";
import {v4 as uuid} from "uuid";

export const Posts = () => {
    const postsIds = useSelector(selectorsPost.selectIds);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");


    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const isLoading = useSelector(selectorIsPostLoading);

    if (isLoading){
        return (
            <>
            {[1,2].map((id) =>
                <Card key={id}
                    title={""}
                    bordered={false}
                    style={{width: 1000 , marginBottom: 20, fontSize:14}}
                >
                    <Skeleton/>
                </Card>)}
            </>);
    }

const showModal = () => {
    setIsModalOpen(true);
};

const handleOk = () => {
    const dataItem = {
        userId: "1",
        id: uuid(),
        title: title,
        body: body
    }

    dispatch(addPost(dataItem));
    dispatch(fetchPosts());
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
};

    return (
        <div className={styles.container}>
            <Button className={styles.addButton} type="primary" onClick={showModal}>
                Add
            </Button>
            <div className={styles.postList}>
                {postsIds.map(postId => (
                    <Post  key={postId} postId={postId}/>
                ))}
            </div>


            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form  name="add-post">
                    <Form.Item
                        name={['user', 'title']}
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name={['user', 'body']} label="Body">
                        <Input.TextArea onChange={(e) => setBody(e.target.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}