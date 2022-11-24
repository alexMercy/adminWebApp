import {Comment} from "../Comment/Comment";
import React, {useEffect} from "react";
import {selectorIsUserLoading} from "../../store/user";
import {fetchComments, selectorIsCommentsLoading, selectorsComment} from "../../store/comments";
import {useDispatch, useSelector} from "react-redux";
import {Card, Skeleton} from "antd";

export const Comments = ({postId}) => {

    const commentIds = useSelector(selectorsComment.selectIds);

    const isCommentsLoading = useSelector(selectorIsCommentsLoading);
    const isUserLoading = useSelector(state => selectorIsUserLoading(state))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [postId]);


    if (isUserLoading||isCommentsLoading){
        return (
            <Card  title="">
                <Skeleton/>
            </Card>);
    }
    return (
        <Card  title="Comments">
            <>{commentIds.map(id =>
                <Comment key={id} commentId={id}/>
            )}</>
        </Card>

    );
}