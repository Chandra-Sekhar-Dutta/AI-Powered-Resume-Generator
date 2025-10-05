import React from 'react'

const Skill = ({ resumeInfo }) => {
  return (
    <div
      className="px-4 py-2"
      style={{ boxShadow: 'none' }} // ensures no inherited shadow
    >
      {/* Heading - Match other sections */}
      <h2
        className="text-lg font-semibold text-left text-gray-800"
        style={{
          color: resumeInfo?.themeColor,
          textShadow: 'none', // ensures no text shadow
        }}
      >
        Skills
      </h2>

      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
          boxShadow: 'none',
        }}
        className="my-4 border-t-2"
      />

      {/* Skills Grid - Always 2 columns */}
      <div
        className="grid grid-cols-2 gap-y-3 gap-x-6"
        style={{ boxShadow: 'none' }}
      >
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} style={{ boxShadow: 'none' }}>
            {/* Category */}
            <h3
              className="text-sm font-semibold mb-1"
              style={{
                color: resumeInfo?.themeColor,
                textShadow: 'none',
              }}
            >
              {skill?.category}
            </h3>

            {/* Items inline, resume-style */}
            <p
              className="text-sm text-gray-700"
              style={{ textShadow: 'none' }}
            >
              {skill?.items.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skill
