import React from 'react'
import MyApplicationCard from '../cards/MyApplicationCard'

function UserApplicationsView() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <MyApplicationCard img1="https://media.istockphoto.com/id/1644622448/photo/new-houses-construction-residential-house-development.jpg?s=612x612&w=0&k=20&c=toO5Hy1DE-VZcZfJsgVPEmoWVB7VcxBf99WbB_SP49Y=" status="Pending"/>
    </div>
  )
}

export default UserApplicationsView