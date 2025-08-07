'use client';
import React, { useState, useEffect } from 'react';
import { EnvironmentOutlined, GiftOutlined, MailOutlined, PhoneOutlined, ManOutlined, WomanOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

interface ProfileDetailsProps {
  location: string;
  dob: string;
  phone: string;
  email: string;
  gender: string;
  onSave: (updatedProfile: {
    location: string;
    dob: string;
    phone: string;
    email: string;
    gender: string;
  }) => void;
  onChange: (field: string, value: string) => void;
}

export default function ProfileDetails({ location, dob, phone, email, gender, onSave, onChange }: ProfileDetailsProps) {
  const [editing, setEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState({
    location,
    dob,
    phone,
    email,
    gender,
  });

  useEffect(() => {
    setLocalProfile({
      location,
      dob,
      phone,
      email,
      gender,
    });
  }, [location, dob, phone, email, gender]);

  const genderIcon = localProfile.gender?.toLowerCase() === 'male' ? <ManOutlined /> : <WomanOutlined />;

  const handleChange = (field: string, value: string) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
    onChange(field, value);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="text-gray-700">
      <div className="flex justify-end mb-2">
        {editing ? (
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-800"
            title="Save"
          >
            <SaveOutlined />
            <span>Save</span>
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-800"
            title="Edit"
          >
            <EditOutlined />
            <span>Edit</span>
          </button>
        )}
      </div>
      {editing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-2">
            <EnvironmentOutlined className="text-gray-500" />
            <input
              type="text"
              value={localProfile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Enter address"
              className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />
          </div>
          <div className="flex items-center space-x-2">
            {genderIcon}
            <select
              value={localProfile.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneOutlined className="text-gray-500" />
            <input
              type="text"
              value={localProfile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Enter phone number"
              className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />
          </div>
          <div className="flex items-center space-x-2">
            <MailOutlined className="text-gray-500" />
            <input
              type="email"
              value={localProfile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email"
              className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />
          </div>
          <div className="flex items-center space-x-2">
            <GiftOutlined className="text-gray-500" />
            <input
              type="date"
              value={localProfile.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-2">
            <EnvironmentOutlined className="text-gray-500" />
            <span>{location || 'Address not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            {genderIcon}
            <span>{gender || 'Gender not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneOutlined className="text-gray-500" />
            <span>{phone || 'Phone not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MailOutlined className="text-gray-500" />
            <span>{email || 'Email not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <GiftOutlined className="text-gray-500" />
            <span>{dob || 'DOB not provided'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
