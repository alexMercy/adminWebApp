import React from "react";
import {useSelector} from "react-redux";
import {selectorsComment} from "../../store/comments";
import {selectorsUser} from "../../store/user";

export const Comment = ({commentId}) => {
    const commnt = useSelector(state => selectorsComment.selectById(state, commentId));
    const users = useSelector(selectorsUser.selectAll);
    const rand = Math.floor(Math.random() * users.length);
    return (
        <>
            <h2>{commnt.name}</h2>
            <h3>{users[rand].name}</h3>
            <p>{commnt.body}</p>
        </>
    );
}