import React from 'react'

const Skill = ({ resumeInfo }) => {
  return (
    <div className="px-4 py-2">
      <h2
        className="text-lg font-semibold text-center text-gray-800"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr
        style={{ borderColor: resumeInfo?.themeColor }}
        className="my-4 border-t-2"
      />

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>{skill?.name}</span>
              <span className="text-gray-500">{skill?.rating}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${skill?.rating}%`,
                  backgroundColor: resumeInfo?.themeColor,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skill
