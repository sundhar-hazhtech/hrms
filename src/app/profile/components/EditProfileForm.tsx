'use client';
import React, { useState } from 'react';

interface EditProfileFormProps {
  education10th: string;
  education12th: string;
  college: string;
  skills: string[];
  location: string;
  onCancel: () => void;
}

export default function EditProfileForm({
  education10th,
  education12th,
  college,
  skills,
  location,
  onCancel,
}: EditProfileFormProps) {
  const [formData, setFormData] = useState({
    education10th,
    education12th,
    college,
    skills: skills.join(', '),
    location,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          education10th: formData.education10th,
          education12th: formData.education12th,
          college: formData.college,
          skills: formData.skills
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
          location: formData.location,
        }),
      });

      if (!res.ok) throw new Error('Update failed');
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white text-purple-600 p-4 rounded shadow">
      <div>
        <label htmlFor="education10th" className="block font-semibold mb-1">
          10th Education
        </label>
        <input
          id="education10th"
          name="education10th"
          type="text"
          value={formData.education10th}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 text-purple-600"
          required
        />
      </div>
      <div>
        <label htmlFor="education12th" className="block font-semibold mb-1">
          12th Education
        </label>
        <input
          id="education12th"
          name="education12th"
          type="text"
          value={formData.education12th}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 text-purple-600"
          required
        />
      </div>
      <div>
        <label htmlFor="college" className="block font-semibold mb-1">
          College
        </label>
        <input
          id="college"
          name="college"
          type="text"
          value={formData.college}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 text-purple-600"
          required
        />
      </div>
      <div>
        <label htmlFor="skills" className="block font-semibold mb-1">
          Skills (comma separated)
        </label>
        <input
          id="skills"
          name="skills"
          type="text"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 text-purple-600"
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block font-semibold mb-1">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 text-purple-600"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
