'use client';
import React, { ChangeEvent } from 'react';
import { EditOutlined, UserOutlined } from '@ant-design/icons';

interface ProfileHeaderProps {
  profile: any;
  editingName: boolean;
  setEditingName: (value: boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNameSave: () => void;
  setProfile: (profile: any) => void;
  saveProfile: () => void;
}

export default function ProfileHeader({
  profile,
  editingName,
  setEditingName,
  handleChange,
  handleNameSave,
  setProfile,
  saveProfile,
}: ProfileHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center gap-4 flex-wrap mb-8 mt-5 md:mt-10 w-full`}
    >
      <div className="flex items-center space-x-4">
        <div className="md:items-center relative w-32 h-32 rounded-full border-4 border-purple-700 overflow-hidden cursor-pointer">
          {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-full text-gray-600 text-6xl">
                <UserOutlined className="h-16 w-16" />
              </div>
              )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profilePhotoInput"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfile((prev: any) => ({ ...prev, photoUrl: reader.result as string }));
                  saveProfile();
                };
                reader.readAsDataURL(file);
              }}
            />
            <label
              htmlFor="profilePhotoInput"
              className="absolute bottom-0 right-0 text-white bg-purple-600 rounded-full p-1 cursor-pointer hover:bg-gray-100 hover:text-purple-600  shadow-lg"
              style={{ width: '36px', height: '36px', transform: 'translate(-10%, -15%)' }}
              title="Add profile photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            {profile.photoUrl && (
              <button
                onClick={() => {
                  setProfile((prev: any) => ({ ...prev, photoUrl: '' }));
                  saveProfile();
                }}
                className="absolute -top-3 -right-3 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100 shadow-lg"
                title="Remove profile photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div>
          {editingName ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={profile.name}
                onChange={handleChange}
                name="name"
                className="border border-gray-300 rounded px-2 py-1"
              />
              <button
                onClick={() => {
                  handleNameSave();
                  setEditingName(false);
                }}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          ) : (
            <h2 className="text-black text-3xl font-bold flex  space-x-2">
              <span>{profile.name || 'Your Name'}</span>
              <button
                onClick={() => setEditingName(true)}
                aria-label="Edit name"
                className="text-black"
              >
                <EditOutlined className="soft-glow-hover" />
              </button>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
