import React from 'react'
import PersonalDetails from './Forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Layout } from 'lucide-react'
import Summary from './Forms/Summary'
import Experience from './Forms/Experience'
import Education from './Forms/Education'
import Skill from './Forms/Skill'

const FormSection = () => {

  const [activeFromIndex, setActiveFromIndex] = React.useState(1)
  const [enableNext, setEnableNext] = React.useState(false)

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-sm"
        >
          <Layout size={18} />
          Theme
        </Button>

        {activeFromIndex > 1 && (
          <Button
            variant="secondary"
            onClick={() => setActiveFromIndex(activeFromIndex - 1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Button>
        )}

        <Button
          className="flex items-center gap-2 text-sm"
          onClick={() => setActiveFromIndex(activeFromIndex + 1)}
          disabled={!enableNext}
        >
          Next
          <ArrowRight size={18} />
        </Button>
      </div>

      {/* Personal Detaisl */}
      { activeFromIndex===1? <PersonalDetails enableNext={setEnableNext} /> : null }
      {/* Summery */}
      {activeFromIndex===2?<Summary enableNext={setEnableNext}/> : null}
      {/* Education */}
      {activeFromIndex===3? <Education enableNext={setEnableNext}/>:null}
      {/* Skills */}
      {activeFromIndex===4? <Skill enableNext={setEnableNext} /> : null}
      {/* Experience */}
      {activeFromIndex===5? <Experience enableNext={setEnableNext} /> : null}
    </div>
  )
}

export default FormSection
