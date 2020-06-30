import React from 'react'
import './Header.css'
import Link from '../Link/Link'
import logo from '../../GitHub-Mark-Light-64px.png'
const Header = () => (
  <header className='App-header'>
    <img src={logo} className='App-logo' alt='logo' />
    <Link url='https://reactjs.org' title='Learn React' />
    <p>
          Edit <code>src/App.js</code> and save to reload.
    </p>
  </header>
)

export default Header
