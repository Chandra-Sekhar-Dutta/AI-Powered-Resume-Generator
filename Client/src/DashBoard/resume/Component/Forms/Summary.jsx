import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalAPI from './../../../../../Service/GlobalAPI';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';


const Summary = ({ enableNext }) => {

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()

    const [summery, setSummery] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])

    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            data: {
                summery: summery
            }
        }

        console.log("Data to be saved: ", data)

        GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
            .then((res) => {
                enableNext(true)
                setLoading(false)
                toast("Details updated")

            })
            .catch((err) => {
                setLoading(false)
                console.error("Error updating resume details:", err)
            })

    }

    return (
        <div className="px-6 py-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
                Summary
            </h2>
            <p className="text-sm text-gray-600 mt-1 mb-4">
                Describe about yourself.
            </p>

            <div className="space-y-2">
                <form className="flex flex-col gap-2" onSubmit={onSave}>
                    <label className="text-sm font-medium text-gray-700">Add Summary</label>
                    <div className="flex items-start gap-3">
                        <textarea
                            placeholder="Write a brief summary..."
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            rows={4}
                            required
                            onSubmit={onSave}
                            defaultValue={summery ? summery : resumeInfo?.summery}

                            onChange={(e) => setSummery(e.target.value)}
                        />
                        <Button variant="outline" className="whitespace-nowrap" type="button">
                            Generate from AI
                        </Button>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : "Save"}</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Summary
