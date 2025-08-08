import React from 'react'

const Summery = ({ resumeInfo }) => {
  return (
    <div className="px-4 py-2">
      <p className="text-sm text-gray-700 leading-relaxed">
        {resumeInfo?.summery}
      </p>
    </div>
  )
}

export default Summery
