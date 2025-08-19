import React from 'react'

const ProfessionalExperience = ({ resumeInfo }) => {
  return (
    <div className="px-4 py-2">
      <h2
        style={{ color: resumeInfo?.themeColor }}
        className="text-lg font-semibold text-left"
      >
        Professional Experience
      </h2>
      <hr
        style={{ borderColor: resumeInfo?.themeColor }}
        className="my-4 border-t-2"
      />

      {resumeInfo?.experience.map((exp, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-base font-semibold text-gray-800">
            {exp?.title}
          </h3>
          <div className="flex justify-between text-sm text-gray-600 italic">
            <span>
              {exp?.companyName}, {exp?.city}, {exp?.state}
            </span>
            <span className="not-italic text-gray-500">
              {exp?.startDate} - {exp?.currentlyWorking ? 'Present' : exp?.endDate}
            </span>
          </div>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
            {exp?.workSummery}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ProfessionalExperience
