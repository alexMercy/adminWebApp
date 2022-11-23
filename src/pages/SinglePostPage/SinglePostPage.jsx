import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectorIsPostLoading, selectorsPost} from "../../store/post";
import {selectorsUser} from "../../store/user";
import React, {useEffect} from "react";

import {Comments} from "../../components/Comments/Comments";

export const SinglePostPage = () => {
    const postId = Number(useParams().id);
    const post = useSelector(state => selectorsPost.selectById(state, postId));
    const user = useSelector(state => selectorsUser.selectById(state, post?.userId));

    const isLoading = useSelector((state) =>
       selectorIsPostLoading(state));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(postId));
    }, [postId]);

    if (isLoading){
        return (<div>Loading...</div>);
    }

    return (
        <>
            <h3>{user?.name}</h3>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <Comments postId={postId}/>
        </>
    );
}