import {Title} from "../../components/Title/Title";
import {Link} from "react-router-dom";
import postsVideo from "../../videos/postsBack.mp4";
import todosVideo from "../../videos/todosBack.mp4";
import albumsVideo from "../../videos/albumsBack.mp4";
import {Typography} from "antd";
import styles from "./styles.module.css";

const root = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
}


export const HomePage = () => (
    <div style={{height: "82vh"}}>
        <Typography.Title style={{marginLeft: "5%", marginBottom: 80 ,fontWeight: 900}}>Home Page</Typography.Title>
        <div>
            <Link className={styles.todo} style={root} to="/todos" > <Title video={todosVideo} title="Todos"/> </Link>
            <Link className={styles.post} style={root} to="/posts" > <Title video={postsVideo} title="Posts"/> </Link>
            <Link className={styles.album} style={root} to="/albums" > <Title video={albumsVideo} title="Albums"/> </Link>
        </div>
    </div>
);