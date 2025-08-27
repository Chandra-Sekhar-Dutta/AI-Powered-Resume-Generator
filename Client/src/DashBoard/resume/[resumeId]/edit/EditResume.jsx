import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../Component/FormSection'
import ResumePreview from '../../Component/ResumePreview'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import Dummy from '@/Data/Dummy'
import GlobalAPI from './../../../../../Service/GlobalAPI'

const EditResume = () => {
  const params = useParams()
  const [resumeInfo, setResumeInfo] = useState()

  useEffect(() => {
    // setResumeInfo(Dummy)
    GetResumeInfoFromDatabase()
  }, [])

  const GetResumeInfoFromDatabase = () => {
    // Fetch Resume Info from Database using resumeId from params
    GlobalAPI.GetResumeInfoByID(params?.resumeId)
      .then((res) => {
        console.log("Resume Info fetched successfully", res.data);

        // ensure safe defaults
        const resumeData = {
          education: res.data?.data?.education || [],
          skills: res.data?.data?.skills || [],
          experience: res.data?.data?.experience || [],
          summery: res.data?.data?.summery || "",
          ...res.data?.data, // keep other fields intact
        };

        setResumeInfo(resumeData);
      })
      .catch((err) => {
        console.error("Error fetching resume info", err);
      });
  };


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
