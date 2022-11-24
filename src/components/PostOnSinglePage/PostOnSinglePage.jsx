import styles from "./styles.module.css";
import {Card, Divider, Skeleton} from "antd";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectorIsPostLoading, selectorsPost} from "../../store/post";
import {selectorIsUserLoading, selectorsUser} from "../../store/user";

export const PostOnSinglePage = ({postId}) => {

    const post = useSelector(state => selectorsPost.selectById(state, postId));
    const user = useSelector(state => selectorsUser.selectById(state, post?.userId));

    const isPostLoading = useSelector((state) => selectorIsPostLoading(state));
    const isUserLoading = useSelector(state => selectorIsUserLoading(state))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(postId));
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
        </Card>);
}