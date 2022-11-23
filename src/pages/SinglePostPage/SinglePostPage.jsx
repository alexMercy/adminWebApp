import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectorIsPostLoading, selectorsPost} from "../../store/post";
import {fetchUsers, selectorsUser} from "../../store/user";
import React, {useEffect} from "react";
import {fetchComments, selectorsComment} from "../../store/comments";

export const SinglePostPage = () => {
    const postId = Number(useParams().id);
    const post = useSelector(state => selectorsPost.selectById(state, postId));
    const user = useSelector(state => selectorsUser.selectById(state, post?.userId));

    const commentIds = useSelector(selectorsComment.selectIds);
    const comments = useSelector(selectorsComment.selectEntities);

    const isLoading = useSelector((state) =>
       selectorIsPostLoading(state));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchPosts(postId));
        dispatch(fetchComments(postId));
    }, [postId]);

    console.log(isLoading);

    if (isLoading){
        return (<div>Loading...</div>);
    }

    if (!commentIds.length || user.name || post.userId) return;

    return (
        <>
            <h3>{user?.name}</h3>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            {commentIds.map(id =>
                <div key={id}>
                   <h3>{comments[id].name}</h3>
                   <h4>{comments[id].body}</h4>
                </div>
            )}
        </>
    );
}