import {Post} from "../Post/Post";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectorIsPostLoading, selectorsPost} from "../../store/post";
import {fetchUsers} from "../../store/user";
import styles from "./styles.module.css";
import image from '../../img/postsBackground.jpg';
import {Card, Skeleton} from "antd";

export const Posts = () => {
    const postsIds = useSelector(selectorsPost.selectIds);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const isLoading = useSelector(selectorIsPostLoading);

    if (isLoading){
        return (
            <div className={styles.root}>
                <div className={styles.image} style={{backgroundImage: `url(${image})`}}>\
                    <span className={styles.title}>Posts</span>
                </div>
                {[1,2].map((id) =>
                    <Card key={id}
                        title={""}
                        bordered={false}
                        style={{width: 1000 , marginBottom: 20, fontSize:14}}
                    >
                        <Skeleton/>
                    </Card>)}
            </div>);
    }

    return (
        <div className={styles.root}>
            <div className={styles.image} style={{backgroundImage: `url(${image})`}}>\
                <span className={styles.title}>Posts</span>
            </div>
            {postsIds.map(postId => (
                <Post  key={postId} postId={postId}/>
            ))}
        </div>



    );
}