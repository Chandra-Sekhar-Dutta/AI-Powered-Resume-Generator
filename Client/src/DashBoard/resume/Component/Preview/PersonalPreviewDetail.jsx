import React from 'react'

const PersonalPreviewDetail = ({ resumeInfo }) => {
  return (
    <div className="text-center space-y-1">
      <h2 className="text-2xl font-bold">{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className="text-lg font-medium text-gray-600">{resumeInfo?.jobTitle}</h2>
      <h2 className="text-sm text-gray-500">{resumeInfo?.address}</h2>

      <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
        <h2>{resumeInfo?.phone}</h2>
        <h2>{resumeInfo?.email}</h2>
      </div>

      <hr className="my-4 border-t-2" style={{ borderColor: resumeInfo?.themeColor }} />
    </div>
  )
}

export default PersonalPreviewDetail
