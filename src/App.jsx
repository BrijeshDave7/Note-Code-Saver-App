import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pastes from './components/Pastes';
import Viewpastes from './components/Viewpastes';

const route = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <Viewpastes/>
      </div>
    }
  ]
)

function App() {
  

  return (
    <div>
      <RouterProvider router={route}/>
    </div>
  )
}

export default App
