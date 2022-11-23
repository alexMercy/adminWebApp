import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorIsPostLoading, selectorsPost} from "../../store/post";
import {selectorsUser} from "../../store/user";

export const SinglePostPage = () => {
    const postId = Number(useParams().id);
    const {userId, title, body} = useSelector(state =>  selectorsPost.selectById(state, postId));
    const {name} = useSelector(state => selectorsUser.selectById(state, userId));

    const isLoading = useSelector(selectorIsPostLoading);

    if (isLoading){
        return (<div>Loading...</div>);
    }
    return (
        <>
            <h3>{name}</h3>
            <h1>{title}</h1>
            <p>{body}</p>
        </>
    );
}