'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import Sidebar from '@/app/profile/components/Sidebar';
import ProfileHeader from '@/app/profile/components/ProfileHeader';
import EducationSection from '@/app/profile/components/EducationSection';
import SkillsSection from '@/app/profile/components/SkillsSection';
import ProfileDetails from '@/app/profile/components/ProfileDetails';
import LoadingOverlay from '@/app/components/LoadingOverlay';

interface Education {
  course: string;
  organization: string;
  startTime: string;
  endTime: string;
  score: string;
}

export default function MyProfilePage() {
  const [profile, setProfile] = useState<any>({
    name: '',
    email: '',
    dob: '',
    gender: '',
    location: '',
    phone: '',
    skills: [] as string[],
    education: [] as Education[],
    progress: 0, 
    photoUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    course: '',
    organization: '',
    startTime: '',
    endTime: '',
    score: '',
  });
  const [showEditEducation, setShowEditEducation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        if (data) {
          const mergedData = {
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            gender: data.gender || '',
            dob: data.dob || '',
            location: data.location || '',
            skills: data.skills || [],
            education: data.education || [],
            photoUrl: data.image || 'https://via.placeholder.com/150',
            progress: calculateProgress(data),
          };
          setProfile(mergedData);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function calculateProgress(data: any) {
    let total = 6;
    let filled = 0;
    if (data.name) filled++;
    if (data.email) filled++;
    if (data.dob) filled++;
    if (data.gender) filled++;
    if (data.location) filled++;
    if (data.phone) filled++;
    return Math.round((filled / total) * 100);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    if (profile.skills.includes(newSkill.trim())) return;
    const updatedSkills = [...profile.skills, newSkill.trim()];
    setProfile((prev: any) => ({ ...prev, skills: updatedSkills }));
    setNewSkill('');
    saveProfile();
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = profile.skills.filter((skill: string) => skill !== skillToRemove);
    setProfile((prev: any) => ({ ...prev, skills: updatedSkills }));
    saveProfile();
  };

  const handleNameSave = () => {
    setEditingName(false);
    saveProfile();
  };

  const handleEditEducationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentEducation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveEducation = () => {
    setProfile((prev: any) => ({
      ...prev,
      education: [...prev.education, currentEducation],
    }));
    setShowEditEducation(false);
    setCurrentEducation({
      course: '',
      organization: '',
      startTime: '',
      endTime: '',
      score: '',
    });
    saveProfile();
  };

  const saveProfile = async () => {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(profile),
    });
    const updated = await res.json();
    setProfile(updated);
  };

  if (loading) return <LoadingOverlay loading={loading} message="Loading profile..." />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
      <main className="flex-1 p-6 sm:p-10 md:ml-64 transition-all duration-300">
         <img src="/assets/Hashtag-Logo.png" alt="Logo" className="mb-2 w-65 h-12" />
        <ProfileHeader
          profile={profile}
          editingName={editingName}
          setEditingName={setEditingName}
          handleChange={handleChange}
          handleNameSave={handleNameSave}
          setProfile={setProfile}
          saveProfile={saveProfile}
        />
        <div className="my-6">
          <ProfileDetails
            location={profile.location}
            dob={profile.dob}
            phone={profile.phone}
            email={profile.email}
            gender={profile.gender}
            onSave={(updatedProfile) => {
              setProfile((prev: any) => ({ ...prev, ...updatedProfile }));
              saveProfile();
            }}
            onChange={(field, value) => {
              setProfile((prev: any) => ({ ...prev, [field]: value }));
              saveProfile();
            }}
          />
        </div>
        <EducationSection
          education={profile.education}
          showEditEducation={showEditEducation}
          setShowEditEducation={setShowEditEducation}
          editMode={editMode}
          setEditMode={setEditMode}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          currentEducation={currentEducation}
          setCurrentEducation={setCurrentEducation}
          handleEditEducationChange={handleEditEducationChange}
          saveEducation={saveEducation}
        />
        <SkillsSection
          skills={profile.skills}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
        />
      </main>
    </div>
  );
}
