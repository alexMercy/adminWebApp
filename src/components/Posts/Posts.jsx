import {Post} from "../Post/Post";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectorIsPostLoading, selectorsPost} from "../../store/post";
import {fetchUsers} from "../../store/user";
import styles from "./styles.module.css";

export const Posts = () => {
    const postsIds = useSelector(selectorsPost.selectIds);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const isLoading = useSelector(selectorIsPostLoading);

    if (isLoading){
        return (<div>Loading...</div>);
    }

    return (
        <div className={styles.root}>
            {postsIds.map(postId => (
                <Post  key={postId} postId={postId}/>
            ))}
        </div>



    );
}