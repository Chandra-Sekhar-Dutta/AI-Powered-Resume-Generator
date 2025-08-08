import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../../Service/GlobalAPI';
import { toast } from 'sonner'

const PersonalDetails = ({ enableNext }) => {

  const params = useParams()

  useEffect(() => {
    console.log("params: ", params)
  }, [])

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const [formdata, setFormData] = useState()
  const [loading, setLoading] = useState(false)

  const handleInputChaneg = (e) => {

    const { name, value } = e.target

    setFormData({
      ...formdata,
      [name]: value
    })

    setResumeInfo({
      ...resumeInfo, [name]: value
    })
    enableNext(false)
  }

  const onSave = (e) => {
    e.preventDefault()

    setLoading(true)

    const data = {
      data: formdata
    }

    GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
      .then((res) => {
        console.log("Resume details updated successfully:", res.data)
        enableNext(true)
        setLoading(false)
        toast("Detail updated.")

      })
      .catch((err) => {
        setLoading(false)
        console.error("Error updating resume details:", err)
      })

  }

  return (
    <div className="px-6 py-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">
        Personal Details
      </h2>
      <p className="text-sm text-gray-600 mt-1 mb-4">
        Get started with basic personal information that will be included in your resume.
      </p>

      <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            defaultValue={resumeInfo?.firstName}
            onChange={handleInputChaneg}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            name="lastName"
            type="text"
            required
            defaultValue={resumeInfo?.lastName}
            onChange={handleInputChaneg}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            required
            defaultValue={resumeInfo?.address}
            onChange={handleInputChaneg}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            required
            defaultValue={resumeInfo?.jobTitle}
            onChange={handleInputChaneg}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            pattern="[0-9]{10}"
            defaultValue={resumeInfo?.phone}
            onChange={handleInputChaneg}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            defaultValue={resumeInfo?.email}
            onChange={handleInputChaneg}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-end mt-2">
          <Button type="submit" disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetails
