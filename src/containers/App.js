import React from 'react'
import './App.css'
import Header from '../components/Header/Header'
import logo from '../logo.svg'
import Profile from './Profile'
function App () {
  return (
    <div className='App'>
      <Header logo={logo} />
      <Profile />
    </div>
  )
}

export default App
