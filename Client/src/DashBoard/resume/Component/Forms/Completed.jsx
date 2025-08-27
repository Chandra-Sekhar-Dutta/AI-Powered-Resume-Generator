import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

const Completed = ({ enableNext }) => {
  
  // As soon as Completed is mounted, disable Next
  React.useEffect(() => {
    enableNext(false)
  }, [enableNext])

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-sm text-center">
      <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        All Done 🎉
      </h2>
      <p className="text-gray-600 mb-6">
        You've successfully completed all the sections of your resume builder.
      </p>
      <Button onClick={() => console.log("Submit / Redirect action")}>
        Download Resume
      </Button>
    </div>
  )
}

export default Completed
