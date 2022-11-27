import React from "react";
import {useSelector} from "react-redux";
import {selectorsComment} from "../../store/comments";
import {selectorsUser} from "../../store/user";
import {Card, Divider} from "antd";

export const Comment = ({commentId}) => {

    const commentData = useSelector(state => selectorsComment.selectById(state, commentId));
    const users = useSelector(selectorsUser.selectAll);
    const rand = Math.floor(Math.random() * users.length);
    return (
        <Card style={{marginBottom: 15}} type="inner" title={<span style={{fontSize: "large"}}>{`User: ${users[rand].name}`}</span>}>
            <span style={{fontWeight: 600}}>{commentData.name}</span>
                <Divider style={{margin: 2}}/>
            <p>{commentData.body}</p>
        </Card>
    );
}