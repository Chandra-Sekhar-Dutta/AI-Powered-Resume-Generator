import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../../Service/GlobalAPI';
import { toast } from 'sonner'

const Skill = ({ enableNext }) => {
  const params = useParams()

  const formField = {
    id: "",
    category: "",
    items: []
  }

    useEffect(() => {
      resumeInfo && setSkills(resumeInfo.skills || [formField])
    }, []);

  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([formField])

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  // Initially disable Next
  useEffect(() => {
    enableNext(false)
  }, [enableNext])

  const handleChange = (index, e) => {
    const newSkills = [...skills]
    const { name, value } = e.target
    newSkills[index][name] = value
    setSkills(newSkills)
  }

  const addNewSkill = () => setSkills([...skills, { ...formField }])

  const removeSkill = () => skills.length > 1 && setSkills(skills.slice(0, -1))

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    const isIncomplete = skills.some(skill =>
      !skill.category.trim() || skill.items.length === 0
    )

    if (isIncomplete) {
      setLoading(false)
      toast.error("⚠️ Please fill all skill details before saving")
      enableNext(false) // keep next disabled
      return
    }

    const data = { data: { skills } }

    GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
      .then((res) => {
        setLoading(false)
        toast.success("Skills updated successfully 🎉")
        enableNext(true) // allow moving forward ONLY after successful save
        console.log("Skills updated successfully", res.data)
      })
      .catch((err) => {
        setLoading(false)
        toast.error("❌ Error updating skills")
        enableNext(false)
        console.error("Error updating skills:", err)
      })
  }

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills })
  }, [skills])

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Professional Skills</h2>
      <p className="text-gray-600 mb-6">Add your professional skills by category</p>

      <div className="space-y-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-xl shadow-sm bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Skill {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  name="category"
                  value={skill.category}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Ex: Programming Languages, Frameworks"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Items */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Items</label>
                <input
                  name="items"
                  value={skill.items.join(", ")} // display as comma separated string
                  onChange={(e) => {
                    const newSkills = [...skills]
                    newSkills[index].items = e.target.value.split(",").map(i => i.trim())
                    setSkills(newSkills)
                  }}
                  placeholder="Ex: C++, Python, React.js"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-3">
                <Button variant="outline" onClick={addNewSkill}>+ Add Skill</Button>
                <Button variant="destructive" onClick={removeSkill}>- Delete</Button>
              </div>
              <Button
                variant="default"
                type="button"
                onClick={onSave}
                disabled={loading}
                className="px-6"
              >
                {loading ? <LoaderCircle className="animate-spin" /> : "Save Skills"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skill
