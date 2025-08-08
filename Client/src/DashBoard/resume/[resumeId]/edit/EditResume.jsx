import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../Component/FormSection'
import ResumePreview from '../../Component/ResumePreview'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import Dummy from '@/Data/Dummy'

const EditResume = () => {
  const params = useParams()
  const [resumeInfo, setResumeInfo] = useState()

  useEffect(() => {
    setResumeInfo(Dummy)
  }, [])

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gray-50 p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-[85vh]">
            <FormSection />
          </div>

          {/* Resume Preview Section */}
          <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-[85vh]">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
