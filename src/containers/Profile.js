import React, { useState, useEffect } from 'react'
import './Profile.css'
import Link from '../components/Link/Link'
import List from '../components/List/List'

const getGithubDataUser = (state, setState) => () => {
  const fetchData = async () => {
    const profile = await fetch('https://api.github.com/users/caiocutrim') // eslint-disable-line
    const profileJSON = await profile.json()
    if (profileJSON) {
      setState({
        ...state,
        data: profileJSON,
        loading: false
      })
    }
  }
  fetchData()
}

const Profile = () => {
  const [state, setState] = useState({ data: {}, loading: true })
  useEffect(getGithubDataUser(state, setState))
  const { data, loading } = state
  if (loading) {
    return (<div>Loading...</div>)
  }
  const items = [
    { label: 'html_url', value: <Link url={data.html_url} title='Github url' /> },
    { label: 'repos_url', value: data.repos_url },
    { label: 'name', value: data.name },
    { label: 'company', value: data.company },
    { label: 'location', value: data.location },
    { label: 'email', value: data.email },
    { label: 'bio', value: data.bio }
  ]
  return (
    <div className='Profile-container'>
      <img className='Profile-avatar' src={data.avatar_url} alt='Avatar' />
      <List items={items} />
    </div>
  )
}

export default Profile
