import {useSelector} from "react-redux";
import {selectorIsPostLoading, selectorsPost} from "../../store/post";
import {selectorsUser} from "../../store/user";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";


export const Post = ({postId}) => {

    const {userId, title, body} = useSelector(state =>  selectorsPost.selectById(state, postId));
    const {name} = useSelector(state => selectorsUser.selectById(state, userId));

    return (
        <Link className={styles.root} to={"/posts/" + postId}>
            <h3>{name}</h3>
            <h1>{title}</h1>
            <p>{body}</p>
        </Link>
    );
}
