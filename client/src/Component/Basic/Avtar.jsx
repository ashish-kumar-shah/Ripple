import React from 'react'

const Avtar = ({design,piccss,value}) => {
  return (
    <div className={`${design}   object-cover object-top|| `}  >
        <img src={value} alt="avtar" className={`${piccss} object-cover object-top || w-full h-full`} />
    </div>
  )
}

export default Avtar