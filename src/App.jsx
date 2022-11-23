import './App.css';
import {postLoader, PostsPage} from "./pages/PostsPage/PostsPage";
import {Layout} from "./components/Layout/layout";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {TodosPage} from "./pages/TodosPage/TodosPage";
import {AlbumsPage} from "./pages/AlbumsPage/AlbumsPage";
import {SinglePostPage} from "./pages/SinglePostPage/SinglePostPage";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<TodosPage/>}/>
        <Route path="/posts" element={<PostsPage/>} loader={postLoader}/>
        <Route path="/posts/:id" element={<SinglePostPage/>}/>
        <Route path="/albums" element={<AlbumsPage/>}/>
    </Route>
));

function App() {
    return (<RouterProvider router={router}/>);
}

export default App;
