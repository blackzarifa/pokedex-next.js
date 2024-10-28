'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VolumeContextType {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

interface VolumeProviderProps {
  children: ReactNode;
}

export function VolumeProvider({ children }: VolumeProviderProps) {
  const [volume, setVolume] = useState<number>(0.5);

  return <VolumeContext.Provider value={{ volume, setVolume }}>{children}</VolumeContext.Provider>;
}

export function useVolume(): VolumeContextType {
  const context = useContext(VolumeContext);
  if (context === undefined) {
    throw new Error('useVolume must be used within a VolumeProvider');
  }
  return context;
}
