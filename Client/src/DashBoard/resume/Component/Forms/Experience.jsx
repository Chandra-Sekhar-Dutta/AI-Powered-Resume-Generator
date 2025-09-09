import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import GlobalAPI from './../../../../../Service/GlobalAPI';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const Experience = ({ enableNext }) => {
  const params = useParams();

  const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    workSummery: ""
  };

  const [experience, setExperience] = useState([formField]);
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo && setExperience(resumeInfo.experience || [formField]);
  }, []);

  const handleChange = (index, e) => {
    const newEntries = [...experience];
    const { name, value, type, checked } = e.target;
    newEntries[index][name] = type === "checkbox" ? checked : value;
    setExperience(newEntries);
    enableNext(false); // disable next when editing
  };

  const addNewExperience = () => {
    setExperience([...experience, { ...formField }]);
    enableNext(false);
  };

  const removeExperience = (index) => {
    if (experience.length > 1) {
      const updated = experience.filter((_, i) => i !== index);
      setExperience(updated);
      enableNext(false);
    }
  };

  const onSave = (index) => {
    setLoading(true);

    // validation
    const exp = experience[index];
    const isIncomplete =
      !exp.title.trim() ||
      !exp.companyName.trim() ||
      !exp.city.trim() ||
      !exp.state.trim() ||
      !exp.startDate.trim() ||
      (!exp.currentlyWorking && (!exp.endDate || !exp.endDate.trim())) ||
      !exp.workSummery.trim();


    if (isIncomplete) {
      setLoading(false);
      toast.error("⚠️ Please fill all experience details before saving.");
      enableNext(false);
      return;
    }

    const data = { data: { experience } };

    GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
      .then((res) => {
        enableNext(true);
        setLoading(false);
        toast.success("Experience updated successfully 🎉");
        console.log("Experience updated successfully", res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("❌ Error updating experience");
        console.error("Error updating experience:", err);
      });
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience });
  }, [experience]);

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

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-3">
                <Button variant="outline" onClick={addNewExperience}>
                  + Add Experience
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => removeExperience(index)}
                  disabled={experience.length === 1}
                >
                  - Delete
                </Button>
              </div>
              <Button
                variant="default"
                type="button"
                onClick={() => onSave(index)}
                disabled={loading}
                className="px-6"
              >
                {loading ? <LoaderCircle className="animate-spin" /> : "Save Experience"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
