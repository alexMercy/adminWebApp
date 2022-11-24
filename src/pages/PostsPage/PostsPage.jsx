import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Posts} from "../../components/Posts/Posts";
import {fetchPosts} from "../../store/post";


export const PostsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts())
    },[]);

    return (
        <Posts />
    );
};
