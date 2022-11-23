import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Posts} from "../../components/Posts/Posts";
import {fetchPosts, selectorsPost} from "../../store/post";


export const PostsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts())
    },[]);

    const posts = useSelector(selectorsPost.selectAll)
    console.log(posts);

    return (
        <Posts />
    );
};
