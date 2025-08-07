'use client';
import React from 'react';

interface SkillsSectionProps {
  skills: string[];
  newSkill: string;
  setNewSkill: (value: string) => void;
  handleAddSkill: () => void;
  handleRemoveSkill: (skill: string) => void;
}

export default function SkillsSection({
  skills,
  newSkill,
  setNewSkill,
  handleAddSkill,
  handleRemoveSkill,
}: SkillsSectionProps) {
  return (
    <div className="text-black bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Key Skills</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.length === 0 && <p>No skills added.</p>}
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
          >
            <span>{skill}</span>
            <button
              className="text-red-500 font-bold hover:text-red-700"
              onClick={() => handleRemoveSkill(skill)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={handleAddSkill}
          className="text-purple-600 font-semibold hover:underline"
        >
          Add
        </button>
      </div>
    </div>
  );
}
