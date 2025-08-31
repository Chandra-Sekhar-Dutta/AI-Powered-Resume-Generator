import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import GlobalAPI from './../../../../../Service/GlobalAPI';
import { useParams } from 'react-router-dom';
import { LoaderCircle, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const Experience = ({ enableNext }) => {
  const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    workSummery: ""
  }

      useEffect(() => {
        resumeInfo && setExperience(resumeInfo.experience || [formField])
      }, []);

  const params = useParams()
  const [experience, setExperience] = useState([formField])
  const [loading, setLoading] = useState(false)

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const handleChange = (index, e) => {
    const NewEntries = [...experience]
    const { name, value, type, checked } = e.target
    NewEntries[index][name] = type === "checkbox" ? checked : value
    setExperience(NewEntries)
    enableNext(false) // disable next again if they start editing
  }

  const addNweExperience = () => {
    setExperience([...experience, { ...formField }])
    enableNext(false) // disable until saved again
  }

  const RemoveExperience = () => {
    if (experience.length > 1) {
      setExperience(experience.slice(0, -1))
      enableNext(false)
    }
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    // validation
    const isIncomplete = experience.some(exp =>
      !exp.title.trim() ||
      !exp.companyName.trim() ||
      !exp.city.trim() ||
      !exp.state.trim() ||
      !exp.startDate.trim() ||
      (!exp.currentlyWorking && !exp.endDate.trim()) ||
      !exp.workSummery.trim()
    )

    if (isIncomplete) {
      setLoading(false);
      toast.error("⚠️ Please fill all experience details before proceeding.");
      enableNext(false); // keep Next disabled
      return;
    }

    const data = { data: { experience } }

    GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
      .then((res) => {
        enableNext(true) // allow going Next only after successful save
        setLoading(false)
        toast.success("Experience updated successfully 🎉")
        console.log("Experience updated successfully", res.data);
      })
      .catch((err) => {
        setLoading(false)
        toast.error("❌ Error updating experience")
        console.error("Error updating experience:", err)
      })
  }

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience })
  }, [experience])

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Experience</h2>
      <p className="text-gray-600 mb-8">Add your previous work experiences with key details.</p>

      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Experience {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Position Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
                <input
                  name="title"
                  value={exp.title}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Ex: Software Engineer"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  name="companyName"
                  value={exp.companyName}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Ex: Google"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  name="city"
                  value={exp.city}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Ex: Bengaluru"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  name="state"
                  value={exp.state}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Ex: Karnataka"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleChange(index, e)}
                  disabled={exp.currentlyWorking}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-200"
                />
              </div>

              {/* Currently Working */}
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={exp.currentlyWorking}
                  onChange={(e) => handleChange(index, e)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">Currently Working Here</label>
              </div>
            </div>

            {/* Work Summary */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Summary</label>
              <textarea
                name="workSummery"
                value={exp.workSummery}
                onChange={(e) => handleChange(index, e)}
                rows={4}
                placeholder="Describe your responsibilities and achievements..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex gap-3">
            <Button variant="outline" onClick={addNweExperience} className="flex items-center gap-2">
              <Plus size={16} /> Add Experience
            </Button>
            <Button
              variant="destructive"
              onClick={RemoveExperience}
              className="flex items-center gap-2"
              disabled={experience.length === 1}
            >
              <Minus size={16} /> Remove
            </Button>
          </div>

          <Button
            variant="default"
            type="button"
            onClick={onSave}
            disabled={loading}
            className="px-6"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save Experience"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience
