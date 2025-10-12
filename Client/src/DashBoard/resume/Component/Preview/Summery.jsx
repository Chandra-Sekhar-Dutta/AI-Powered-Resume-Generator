import React from 'react'

const Summery = ({ resumeInfo }) => {
  return (
    <div className="px-4 py-2">
      <h2
        className='className="text-lg font-semibold text-left text-gray-800"
                style={{ color: resumeInfo?.themeColor }}'>
        Summary
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed text-justify">
        {resumeInfo?.summery}
      </p>
    </div>
  )
}

export default Summery
