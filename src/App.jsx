import './App.css';
import { PostsPage} from "./pages/PostsPage/PostsPage";
import {CustomLayout} from "./components/Layout/layout";
import {Route, Routes} from "react-router-dom";
import {TodosPage} from "./pages/TodosPage/TodosPage";
import {AlbumsPage} from "./pages/AlbumsPage/AlbumsPage";
import {SinglePostPage} from "./pages/SinglePostPage/SinglePostPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import {HomePage} from "./pages/HomePage/HomePage";
import {SingleAlbumPage} from "./pages/SingleAlbumPage/SingleAlbumPage";


function App() {
    return (
        <Routes>
            <Route path="/" element={<CustomLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/todos" element={<TodosPage/>}/>
                <Route path="/posts" element={<PostsPage/>}/>
                <Route path="/posts/:id" element={<SinglePostPage/>}/>
                <Route path="/albums" element={<AlbumsPage/>}/>
                <Route path="/albums/:id" element={<SingleAlbumPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>);
}

export default App;
