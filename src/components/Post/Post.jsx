import {useSelector} from "react-redux";
import {selectorIsPostLoading, selectorsPost} from "../../store/post";
import {selectorsUser} from "../../store/user";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";


export const Post = ({postId}) => {

    // const {userId, title, body} = useSelector(state =>  selectorsPost.selectById(state, postId));
    // const {name} = useSelector(state => selectorsUser.selectById(state, userId));
    const post = useSelector(state =>  selectorsPost.selectById(state, postId));
    const user = useSelector(state => selectorsUser.selectById(state, post.userId));

    console.log(user);



    return (
        <Link className={styles.root} to={"/posts/" + postId}>
            <h3>{user.name}</h3>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </Link>
    );
}
