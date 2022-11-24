import {useSelector} from "react-redux";
import {selectorsPost} from "../../store/post";
import {selectorsUser} from "../../store/user";
import {Link} from "react-router-dom";
import {Card} from "antd";


export const Post = ({postId}) => {

    const {userId, title, body} = useSelector(state =>  selectorsPost.selectById(state, postId));
    const {name} = useSelector(state => selectorsUser.selectById(state, userId));

    //TODO: доделать CRUD, добавить кнопку назад на отдельном посте
    return (
        <Link  to={"/posts/" + postId}>
            <Card
                title={title}
                extra={<div style={{color: '#1677ff'}}>More</div>}
                bordered={false}
                style={{width: 900, marginBottom: 20, fontSize:14}}
                hoverable="true"
            >
                <p>{body}</p>
                <h5 style={{textAlign: "right"}}>Author: {name}</h5>
            </Card>
        </Link>
    );
}
