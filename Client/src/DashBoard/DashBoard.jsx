import React, { useEffect, useState } from 'react'
import AddResumeButton from './components/AddResumeButton'
import { useUser } from '@clerk/clerk-react'
import GlobalAPI from './../../Service/GlobalAPI'
import ResumeCardItems from './components/ResumeCardItems'

const DashBoard = () => {
  const { user } = useUser()

  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    user && GetResumeList()
  }, [user])

  const GetResumeList = () => {
    GlobalAPI.GetUserResume(user?.primaryEmailAddress?.emailAddress)
      .then(res => {
        setResumeList(res.data.data)
        console.log("Resume List:", res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">My Resumes</h2>
          <p className="mt-2 text-lg text-gray-600">
            Start building your AI-powered resumes
          </p>
        </div>

        {/* Grid for Resumes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <AddResumeButton />
          {resumeList.length>0 && resumeList.map((resume, index) => (
            <ResumeCardItems resume={resume} key={index} refreshData={GetResumeList}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
