
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import CreateQuotes from './components/CreateQuotes'
import Home from './components/Home'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Profile from './components/Profile'
import Register from './components/Register'
import Router from './components/Router'

function App() {

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

    </>
  )
}

export default App
