import React, { useState } from 'react'

const Skill = () => {

  const formField = {
    category: "",
    items: [""]
  }

  const [skills,setSkills]=useState([formField])

  return (
    <div>Skill
        <div>Add your professional skills here</div>
    </div>
  )
}

export default Skill