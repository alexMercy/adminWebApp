import {useSelector} from "react-redux";
import {selectorsPost} from "../../store/post";
import {selectorsUser} from "../../store/user";
import {Link} from "react-router-dom";
import {Card} from "antd";


export const Post = ({postId}) => {


    const post = useSelector(state =>  selectorsPost.selectById(state, postId));
    const user = useSelector(state => selectorsUser.selectById(state, post?.userId));

    if (!(post && user)) return;

    return (
        <Link  to={"/posts/" + postId}>
            <Card
                title={post.title}
                extra={<div style={{color: '#1677ff'}}>More</div>}
                bordered={false}
                style={{width: 370,
                        marginBottom: 20, fontSize:14}}
                hoverable="true"
            >

                <p style={{height: 150, display:"flex", alignItems:"center"}}>{post.body}</p>
                <h5 style={{textAlign: "right"}}>Author: {user.name}</h5>
            </Card>
        </Link>
    );
}