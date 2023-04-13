import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todos';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';

const isLogin = false;

function App() {
  return (
        <Router>
          <Routes>
            <Route exact path="/" element={<MainPage/>}/>
            <Route exact path="/signin" element={<SignIn/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/todo" element={<Todo/>}/>
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Router>
  );
}

export default App;
