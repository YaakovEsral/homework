import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import SubmitPost from './components/SubmitPost';
import Login from './components/Login';

function App() {

    return (
        <div className="App">

            <BrowserRouter>
                <Header />
                <Route path="/" exact>
                    <PostList />
                </Route>
                <Route path="/submitPost">
                    <SubmitPost />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
