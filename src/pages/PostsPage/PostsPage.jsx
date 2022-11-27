import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Posts} from "../../components/Posts/Posts";
import {fetchPosts} from "../../store/post";
import video from "../../videos/postsBack.mp4";
import {Title} from "../../components/Title/Title";


export const PostsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts())
    },[]);

    return (
        <>
            <div style={{marginBottom:20}}><Title video={video} title="Posts"/></div>
            <Posts />
        </>
    );
};
