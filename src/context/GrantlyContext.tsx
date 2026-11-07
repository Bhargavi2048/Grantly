/**
 * Grantly Centralized Application Context
 * Decouples state management from UI view rendering.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { Scholarship, StudentProfile, VaultDocument, ScholarshipStatus } from '../types';
import { useScholarships } from '../hooks/useScholarships';
import { useStudentProfile } from '../hooks/useStudentProfile';
import { useDocumentVault } from '../hooks/useDocumentVault';
import { useDarkMode } from '../hooks/useDarkMode';

interface GrantlyContextType {
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  vaultDocuments: VaultDocument[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  updateScholarshipStatus: (id: string, status: ScholarshipStatus) => void;
  toggleScholarshipBookmark: (id: string) => void;
  toggleChecklistItem: (scholarshipId: string, itemId: string) => void;
  updateProfile: (profile: StudentProfile) => void;
  addVaultDocument: (doc: VaultDocument) => void;
  deleteVaultDocument: (id: string) => void;
  resetAllData: () => void;
}

const GrantlyContext = createContext<GrantlyContextType | undefined>(undefined);

export function GrantlyProvider({ children }: { children: ReactNode }): JSX.Element {
  const { scholarships, updateStatus, toggleBookmark, toggleItemCheck, resetScholarships } = useScholarships();
  const { profile, updateProfile, resetProfile } = useStudentProfile();
  const { documents, addDocument, deleteDocument, resetDocuments } = useDocumentVault();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const resetAllData = () => {
    resetScholarships();
    resetProfile();
    resetDocuments();
  };

  return (
    <GrantlyContext.Provider
      value={{
        scholarships,
        studentProfile: profile,
        vaultDocuments: documents,
        isDarkMode,
        toggleDarkMode,
        updateScholarshipStatus: updateStatus,
        toggleScholarshipBookmark: toggleBookmark,
        toggleChecklistItem: toggleItemCheck,
        updateProfile,
        addVaultDocument: addDocument,
        deleteVaultDocument: deleteDocument,
        resetAllData
      }}
    >
      {children}
    </GrantlyContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGrantly(): GrantlyContextType {
  const context = useContext(GrantlyContext);
  if (!context) {
    throw new Error('useGrantly must be used within a GrantlyProvider');
  }
  return context;
}
