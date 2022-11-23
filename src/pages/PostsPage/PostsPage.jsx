import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Posts} from "../../components/Posts/Posts";
import {fetchPosts} from "../../store/post";
import {useLoaderData} from "react-router-dom";


export const PostsPage = () => {
    const loadedPosts = useLoaderData();
    const dispatch = useDispatch();

    dispatch(loadedPosts());
    return (
        <Posts />
    );
};

export const postLoader = async ({}) => {
   return fetchPosts();
};