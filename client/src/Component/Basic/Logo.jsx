import React from 'react'
import logo from './logo.png'
const Logo = ({design}) => {
  return (
    <img src={logo} alt="logo" className={`aspect-square mix-blend-hard-light  bg-white ${design}`} />
  )
}

export default Logo