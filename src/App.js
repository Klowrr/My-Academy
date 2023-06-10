import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Logbook from './pages/logbook';
import Todo from './pages/todo';
import Resource from './pages/resource';
import Erorr from './pages/error';
import Home from './pages/home';
import FirstPage from './pages/firstPage';
import Sidebar from './component/sidebar';
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <SkeletonTheme baseColor="#e8f3ff" highlightColor="#ffff">
      <Router basename='My-Academy'>
        <Routes>
          <Route path='/' >
            <Route index element={<FirstPage/>}></Route>
            <Route path='/' element={<Sidebar/>}>
              <Route index path='Home' element={<Home/>}></Route>
              <Route path='Todo' element={<Todo/>}></Route>
              <Route path='LogBook' element={<Logbook/>}></Route>
              {/* <Route path=':id' element={<Logbook/>}></Route> */}
              <Route path='Resource' element={<Resource/>}></Route>
            </Route>
          <Route path='*' element={<Erorr/>}></Route>
          </Route>
        </Routes>
      </Router>
    </SkeletonTheme>
    
  );
}

export default App;
 