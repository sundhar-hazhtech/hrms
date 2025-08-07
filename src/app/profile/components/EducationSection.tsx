'use client';
import React, { ChangeEvent } from 'react';
import { EditOutlined } from '@ant-design/icons';

interface Education {
  course: string;
  organization: string;
  startTime: string;
  endTime: string;
  score: string;
}

interface EducationSectionProps {
  education: Education[];
  showEditEducation: boolean;
  setShowEditEducation: (value: boolean) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  editingIndex: number | null;
  setEditingIndex: (value: number | null) => void;
  currentEducation: Education;
  setCurrentEducation: (value: Education) => void;
  handleEditEducationChange: (e: ChangeEvent<HTMLInputElement>) => void;
  saveEducation: () => void;
}

export default function EducationSection({
  education,
  showEditEducation,
  setShowEditEducation,
  editMode,
  setEditMode,
  editingIndex,
  setEditingIndex,
  currentEducation,
  setCurrentEducation,
  handleEditEducationChange,
  saveEducation,
}: EducationSectionProps) {
  return (
    <div className="text-black bg-white p-6 rounded shadow mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Education</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setCurrentEducation({
                course: '',
                organization: '',
                startTime: '',
                endTime: '',
                score: '',
              });
              setShowEditEducation(true);
              setEditMode(false);
              setEditingIndex(null);
            }}
            className="text-purple-600 font-semibold hover:underline"
          >
            Add
          </button>
          <button
            onClick={() => {
              setEditMode(!editMode);
              setShowEditEducation(false);
              setEditingIndex(null);
            }}
            className={`text-purple-600 font-semibold hover:underline ${editMode ? 'underline' : ''}`}
          >
            Edit
          </button>
        </div>
      </div>
      {education.length === 0 && <p>No education records found.</p>}
      <ul>
        {education
          .slice()
          .sort((a: Education, b: Education) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())
          .map((edu: Education, idx: number) => {
            const start = new Date(edu.startTime);
            const end = new Date(edu.endTime);
            const formatDate = (date: Date) => date.toLocaleString('default', { month: 'short', year: 'numeric' });
            return (
              <li key={idx} className="mb-4 border-b border-gray-200 pb-2 relative">
                <p className="font-semibold">{edu.course}</p>
                <p className="text-gray-600">{edu.organization}</p>
                <p className="text-black text-sm">
                  {formatDate(start)} - {formatDate(end)} ({edu.score}%)
                </p>
                {editMode && (
                  <div className="absolute top-0 right-0 flex space-x-2 p-1">
                    <button
                      aria-label="Edit education"
                      onClick={() => {
                        setCurrentEducation(edu);
                        setShowEditEducation(true);
                        setEditingIndex(idx);
                      }}
                      className="text-purple-600 hover:text-blue-800"
                    >
                      <EditOutlined className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Delete education"
                      onClick={() => {
                        setCurrentEducation(edu);
                        setShowEditEducation(true);
                        setEditingIndex(idx);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
      {showEditEducation && (
        <div className="mt-4 p-4 border border-gray-300 rounded space-y-4">
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={currentEducation.course || ''}
            onChange={handleEditEducationChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={currentEducation.organization || ''}
            onChange={handleEditEducationChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
          <input
            type="month"
            name="startTime"
            placeholder="Start Time"
            value={currentEducation.startTime || ''}
            onChange={handleEditEducationChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
          <input
            type="month"
            name="endTime"
            placeholder="End Time"
            value={currentEducation.endTime || ''}
            onChange={handleEditEducationChange}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
          />
          <input
            type="text"
            name="score"
            placeholder="Score %"
            value={currentEducation.score || ''}
            onChange={handleEditEducationChange}
            className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
          />
          <div className="flex space-x-2">
            <button
              onClick={saveEducation}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save Education
            </button>
            <button
              onClick={() => {
                setShowEditEducation(false);
                setEditMode(false);
                setEditingIndex(null);
                setCurrentEducation({
                  course: '',
                  organization: '',
                  startTime: '',
                  endTime: '',
                  score: '',
                });
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
