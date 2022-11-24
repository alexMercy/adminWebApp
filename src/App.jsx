import './App.css';
import { PostsPage} from "./pages/PostsPage/PostsPage";
import {CustomLayout} from "./components/Layout/layout";
import {Route, Routes} from "react-router-dom";
import {TodosPage} from "./pages/TodosPage/TodosPage";
import {AlbumsPage} from "./pages/AlbumsPage/AlbumsPage";
import {SinglePostPage} from "./pages/SinglePostPage/SinglePostPage";


function App() {
    return (
        <Routes>
            <Route path="/" element={<CustomLayout/>}>
                <Route path="/todos" element={<TodosPage/>}/>
                <Route path="/posts" element={<PostsPage/>}/>
                <Route path="/posts/:id" element={<SinglePostPage/>}/>
                <Route path="/albums" element={<AlbumsPage/>}/>
            </Route>
        </Routes>);
}

export default App;
