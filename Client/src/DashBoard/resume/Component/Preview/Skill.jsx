import React from 'react'

const Skill = ({ resumeInfo }) => {
  return (
    <div className="px-6 py-4">
      {/* Heading */}
      <h2
        className="text-lg font-bold uppercase tracking-wide mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr
        style={{ borderColor: resumeInfo?.themeColor }}
        className="mb-4 border-t-2"
      />

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index}>
            {/* Category */}
            <h3
              className="text-sm font-semibold mb-1"
              style={{ color: resumeInfo?.themeColor }}
            >
              {skill?.category}
            </h3>

            {/* Items inline, resume-style */}
            <p className="text-sm text-gray-800">
              {skill?.items.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skill
