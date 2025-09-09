import { Notebook, MoreVertical, Trash2, Edit3 } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const ResumeCardItems = ({ resume }) => {
  const navigate = useNavigate()

  // start closed
  const [alertOpen, setAlertOpen] = useState(false)

  const handleNavigation = () => {
    navigate(`/dashboard/resume/${resume.documentId}/edit`)
  }

  const onDelete=()=>{
    console.log("Deleted the data from the database")
  }

  return (
    <div className="relative">
      {/* Resume Card */}
      <NavLink
        to={`/dashboard/resume/${resume.documentId}/edit`}
        className="group cursor-pointer rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition duration-300 min-h-[180px] bg-white"
      >
        <Notebook className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
        <span className="font-medium text-center">{resume.Title}</span>
      </NavLink>

      {/* Three Dots Dropdown */}
      <div className="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-full hover:bg-gray-100 transition">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">

            {/* edit */}
            <DropdownMenuItem
              className="text-blue-600 focus:text-blue-700"
              onClick={handleNavigation}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* delete */}
            <DropdownMenuItem
              className="text-red-600 focus:text-red-700"
              onClick={() => setAlertOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

        {/* Alert Dialog */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                data and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlertOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDelete(resume.documentId) // call delete handler
                  setAlertOpen(false) // close dialog
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default ResumeCardItems
