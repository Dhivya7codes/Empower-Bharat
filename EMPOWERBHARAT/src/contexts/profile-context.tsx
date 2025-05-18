
"use client";

import type React from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ProfileSchema } from '@/lib/schema';

interface ProfileContextType {
  profile: ProfileSchema | null;
  setProfile: (profile: ProfileSchema | null) => void;
  updateProfile: (updates: Partial<ProfileSchema>) => void; // Add an update function
  isProfileComplete: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default points and score if needed
  const [profile, setProfileState] = useState<ProfileSchema | null>(null);

  const setProfile = useCallback((newProfile: ProfileSchema | null) => {
     // Ensure default values for points/score if profile exists but they are missing
     if (newProfile && newProfile.points === undefined) {
        newProfile.points = 0;
     }
      if (newProfile && newProfile.confidenceScore === undefined) {
        newProfile.confidenceScore = 0; // Or some other default
     }
    setProfileState(newProfile);
  }, []);

  const updateProfile = useCallback((updates: Partial<ProfileSchema>) => {
    setProfileState((prevProfile) => {
      if (!prevProfile) return null; // Or handle case where profile doesn't exist yet
      const updatedProfile = { ...prevProfile, ...updates };
       // Ensure default values after update
       if (updatedProfile.points === undefined) updatedProfile.points = 0;
       if (updatedProfile.confidenceScore === undefined) updatedProfile.confidenceScore = 0;
      return updatedProfile;
    });
  }, []);


  const isProfileComplete = useMemo(() => {
    // Define what constitutes a "complete" profile for triggering AI features
    return !!profile &&
           !!profile.name &&
           !!profile.age &&
           !!profile.location &&
           !!profile.graduationStatus &&
           profile.skills.length > 0 &&
           profile.languages.length > 0;
           // Add other mandatory fields as needed
  }, [profile]);

  const value = useMemo(() => ({ profile, setProfile, updateProfile, isProfileComplete }), [profile, setProfile, updateProfile, isProfileComplete]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
