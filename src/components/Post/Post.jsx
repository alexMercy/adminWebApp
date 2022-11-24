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
                extra={<Link  to={"/posts/" + postId}>More</Link>}
                bordered={false}
                style={{ width: 1000 , marginBottom: 20, fontSize:14}}
                hoverable="true"
            >
                <p>{body}</p>
                <h5 style={{textAlign: "right"}}>Actor: {name}</h5>
            </Card>
        </Link>
    );
}
