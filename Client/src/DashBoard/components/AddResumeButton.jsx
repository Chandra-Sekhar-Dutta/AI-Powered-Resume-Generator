import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import GlobalAPI from './../../../Service/GlobalAPI';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AddResumeButton = () => {
    const [openDialog, setOpenDialog] = useState(false)

    // adding a new resume
    const [resumeTitle, setResumeTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser()

    const navigate=useNavigate()

    const onCreate = () => {
        setLoading(true);
        const uuid = uuidv4()
        const data = {
            data: {
                Title: resumeTitle,
                ResumeID: uuid,
                UserEmail: user?.primaryEmailAddress?.emailAddress || ""
            }
        };

        console.log("Creating resume with data:", data);
        GlobalAPI.CreateNewResume(data)
            .then(res => {
                console.log("Resume created successfully", res)
                if (res) {
                    setLoading(false)
                    setOpenDialog(false)
                    setResumeTitle("")
                    navigate('/dashboard/resume/' + res.data.data.documentId + "/edit")
                }
            })
            .catch(err => {
                console.error("Error creating resume:", err);
                setLoading(false);
            });
    }

    return (
        <>
            {/* Resume Card */}
            <div
                onClick={() => setOpenDialog(true)}
                className="group cursor-pointer rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition duration-300 min-h-[180px] bg-white"
            >
                <PlusSquare className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-center">Add New Resume</span>
            </div>

            {/* Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Let's Get Started</DialogTitle>
                        <DialogDescription className="text-gray-600 mt-1">
                            <strong>Add Title</strong>
                            <Input placeholder="Resume Title"
                                onChange={(e) => setResumeTitle(e.target.value)} />

                        </DialogDescription>
                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setOpenDialog(false)}
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={onCreate} disabled={resumeTitle.trim() === "" || loading}>
                                {loading ?
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    : 'Create'}
                            </Button>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddResumeButton
