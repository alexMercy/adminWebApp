import {Comment} from "../Comment/Comment";
import React, {useEffect} from "react";
import {fetchUsers, selectorIsUserLoading} from "../../store/user";
import {fetchComments, selectorIsCommentsLoading, selectorsComment} from "../../store/comments";
import {useDispatch, useSelector} from "react-redux";

export const Comments = ({postId}) => {

    const commentIds = useSelector(selectorsComment.selectIds);
    const isCommentsLoading = useSelector(selectorIsCommentsLoading);
    const isUsersLoading = useSelector(selectorIsUserLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchComments(postId));
    }, [postId]);


    if (isCommentsLoading || isUsersLoading){
        return (<div>Loading...</div>);
    }
    return (
        <>{commentIds.map(id =>
            <Comment key={id} commentId={id}/>
        )}</>
    );
}