import { Notebook } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const ResumeCardItems = ({ resume }) => {
  return (
    <NavLink to={'/dashboard/resume/' + resume.documentId+"/edit"}
      className="group cursor-pointer rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition duration-300 min-h-[180px] bg-white"
    >
      <Notebook className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
      <span className="font-medium text-center">{resume.Title}</span>
    </NavLink>
  )
}

export default ResumeCardItems
