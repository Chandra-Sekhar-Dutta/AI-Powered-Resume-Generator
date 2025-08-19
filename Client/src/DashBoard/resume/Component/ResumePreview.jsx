import React, { useContext } from 'react'
import PersonalPreviewDetail from './Preview/PersonalPreviewDetail'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import Summery from './Preview/Summery'
import ProfessionalExperience from './Preview/ProfessionalExperience'
import Education from './Preview/Education'
import Skill from './Preview/Skill'

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  return (
    <div className='border-t-[10px]'
    style={{borderColor:resumeInfo?.themeColor}}>

      {/* personal detail */}
      <PersonalPreviewDetail resumeInfo={resumeInfo} />

      {/* summery */}
      <Summery resumeInfo={resumeInfo}/>

      {/* educational details */}
      <Education resumeInfo={resumeInfo}/>
      
      {/* skills */}
      <Skill resumeInfo={resumeInfo}/>

      {/* professional experience */}
      <ProfessionalExperience resumeInfo={resumeInfo}/>

    </div>
  )
}

export default ResumePreview
