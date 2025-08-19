import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../../Service/GlobalAPI';
import { toast } from 'sonner'

const Education = ({ enableNext }) => {

    const params = useParams()

    const formField = {
        id: "",
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
        major: "",
        description: ""
    }
    const [loading, setLoading] = useState(false)
    const [education, setEducation] = useState([formField])

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    const handleChange = (index, e) => {
        const newEducation = [...education]
        const { name, value } = e.target
        newEducation[index][name] = value
        setEducation(newEducation)
    }

    const addNewEducation = () => setEducation([...education, { ...formField }])

    const removeEducation = () => education.length > 1 && setEducation(education.slice(0, -1))

    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)

        const isIncomplete = education.some(edu =>
            !edu.universityName.trim() ||
            !edu.degree.trim() ||
            !edu.major.trim() ||
            !edu.startDate.trim() ||
            !edu.description.trim()
        )

        if (isIncomplete) {
            setLoading(false);
            toast("Please fill all experience details");
            enableNext(true);
            return;
        }

        const data = {
            data: { education }
        }
        GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
            .then((res) => {
                enableNext(true)
                setLoading(false)
                toast.success("Experience updated successfully 🎉")
                console.log("Experience updated successfully", res.data);
            })
            .catch((err) => {
                setLoading(false)
                toast.error("Error updating experience")
                console.error("Error updating experience:", err)
            })
    }

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, education })
    }, [education]);


    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Educational Details</h2>
            <p className="text-gray-600 mb-6">Add your educational details here</p>

            <div className="space-y-8">
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="p-6 border border-gray-200 rounded-xl shadow-sm bg-gray-50"
                    >
                        <h3 className="text-lg font-medium text-gray-700 mb-4">
                            Education {index + 1}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* University Name */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">University Name</label>
                                <input
                                    name="universityName"
                                    value={edu.universityName}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Ex: MIT University"
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* Start Date */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={edu.startDate}
                                    onChange={(e) => handleChange(index, e)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* End Date */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={edu.endDate}
                                    onChange={(e) => handleChange(index, e)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* Degree */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Degree</label>
                                <select
                                    name="degree"
                                    value={edu.degree}
                                    onChange={(e) => handleChange(index, e)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select Degree</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="B.Sc">B.Sc</option>
                                    <option value="B.Com">B.Com</option>
                                    <option value="B.A">B.A</option>
                                    <option value="M.Tech">M.Tech</option>
                                    <option value="M.Sc">M.Sc</option>
                                    <option value="M.A">M.A</option>
                                    <option value="M.Com">M.Com</option>
                                    <option value="Ph.D">Ph.D</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>


                            {/* Major */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Major</label>
                                <input
                                    name="major"
                                    value={edu.major}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Computer Science"
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col md:col-span-2">
                                <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input
                                    name="description"
                                    value={edu.description}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Computer Science with specialization in AIML."
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center mt-6">
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={addNewEducation}>+ Add Education</Button>
                                <Button variant="destructive" onClick={removeEducation}>- Delete</Button>
                            </div>
                            <Button variant="default"
                                type="button"
                                onClick={onSave}
                                disabled={loading}
                                className="px-6">
                                {loading ? <LoaderCircle className="animate-spin" /> : "Save Experience"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Education
