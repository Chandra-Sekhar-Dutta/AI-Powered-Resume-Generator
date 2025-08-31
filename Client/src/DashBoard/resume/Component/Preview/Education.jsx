import React from 'react'

const Education = ({ resumeInfo }) => {
    return (
        <div className="px-4 py-2">
            <h2
                className="text-lg font-semibold text-left text-gray-800"
                style={{ color: resumeInfo?.themeColor }}
            >
                Education
            </h2>
            <hr
                style={{ borderColor: resumeInfo?.themeColor }}
                className="my-4 border-t-2"
            />

            {resumeInfo?.education?.map((edu, index) => (
                <div key={index} className="mb-4 education-item">
                    <h3 className="text-base font-semibold text-gray-800">
                        {edu?.universityName}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-700">
                        <span>{edu?.degree} in {edu?.major}</span>
                        <span>{edu?.startDate} - {edu?.endDate}</span>
                    </div>
                    <p className='text-sm text-gray-700 leading-relaxed'>
                        {edu?.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Education
