import React from 'react'

const UserName = ({value,design}) => {
  return (
    <span className = {`${design } || font-semibold`}>
        {value}
    </span>
  )
}

export default UserName