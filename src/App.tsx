import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import GrantExplorer from './components/GrantExplorer';
import PipelineKanban from './components/PipelineKanban';
import ScholarshipDetailModal from './components/ScholarshipDetailModal';
import StudentProfileModal from './components/StudentProfileModal';

// Code-split heavier modules to optimize First Contentful Paint (FCP) and bundle efficiency
const GrantWriterStudio = lazy(() => import('./components/GrantWriterStudio'));
const AidStackingCalculator = lazy(() => import('./components/AidStackingCalculator'));
const DocumentVault = lazy(() => import('./components/DocumentVault'));
const LoginPage = lazy(() => import('./components/LoginPage'));

import { SCHOLARSHIPS_DATA, calculateMatchScore } from './data/scholarships';
import { INITIAL_STUDENT_PROFILE, INITIAL_VAULT_DOCUMENTS } from './data/initialProfile';
import { Scholarship, StudentProfile, VaultDocument, AuthUser, TabType, ScholarshipStatus } from './types';
import { safeStorage } from './utils/security';
import { GraduationCap, Sparkles } from 'lucide-react';

export default function App(): JSX.Element {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('explorer');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    return safeStorage.getItem<AuthUser | null>('grantly_user_v2', null);
  });

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // LocalStorage-backed state with safeStorage error protection
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    return safeStorage.getItem<Scholarship[]>('grantly_scholarships_v2', SCHOLARSHIPS_DATA);
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    return safeStorage.getItem<StudentProfile>('grantly_student_profile_v2', INITIAL_STUDENT_PROFILE);
  });

  const [vaultDocuments, setVaultDocuments] = useState<VaultDocument[]>(() => {
    return safeStorage.getItem<VaultDocument[]>('grantly_vault_docs_v2', INITIAL_VAULT_DOCUMENTS);
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return safeStorage.getItem<boolean>('grantly_dark_mode', false);
  });

  // Modal states
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedEssayScholarshipId, setSelectedEssayScholarshipId] = useState<string>('');

  // Persist to safe storage
  useEffect(() => {
    if (currentUser) {
      safeStorage.setItem('grantly_user_v2', currentUser);
    } else {
      safeStorage.removeItem('grantly_user_v2');
    }
  }, [currentUser]);

  useEffect(() => {
    safeStorage.setItem('grantly_scholarships_v2', scholarships);
  }, [scholarships]);

  useEffect(() => {
    safeStorage.setItem('grantly_student_profile_v2', studentProfile);
  }, [studentProfile]);

  useEffect(() => {
    safeStorage.setItem('grantly_vault_docs_v2', vaultDocuments);
  }, [vaultDocuments]);

  useEffect(() => {
    safeStorage.setItem('grantly_dark_mode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Auth Handlers
  const handleLogin = (userProfile: StudentProfile) => {
    setCurrentUser({
      name: userProfile.fullName,
      email: userProfile.email,
      institution: userProfile.institution
    });
    setStudentProfile(userProfile);
    setShowLoginModal(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setShowLoginModal(true);
  };

  const handleGuestAccess = () => {
    setShowLoginModal(false);
  };

  // Global platform statistics
  const stats = useMemo(() => {
    const awardedTotal = scholarships
      .filter(s => s.status === 'awarded')
      .reduce((acc, s) => acc + s.amount, 0);

    const activeCount = scholarships
      .filter(s => ['bookmarked', 'in_progress', 'ready_to_submit', 'submitted'].includes(s.status))
      .length;

    const pendingLORS = vaultDocuments.filter(d => d.type === 'lor' && d.status === 'Requested').length;

    const topMatchesCount = scholarships.filter(s => {
      const match = calculateMatchScore(s, studentProfile);
      return match.score >= 80;
    }).length;

    return {
      awardedTotal,
      activeCount,
      pendingLORS,
      topMatchesCount
    };
  }, [scholarships, vaultDocuments, studentProfile]);

  // Scholarship action handlers
  const handleUpdateStatus = (scholarshipId: string, newStatus: ScholarshipStatus) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        return { ...s, status: newStatus };
      }
      return s;
    }));

    if (selectedScholarship && selectedScholarship.id === scholarshipId) {
      setSelectedScholarship(prev => prev ? ({ ...prev, status: newStatus }) : null);
    }
  };

  const handleToggleBookmark = (scholarshipId: string) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        const nextStatus: ScholarshipStatus = s.status === 'bookmarked' ? 'unapplied' : 'bookmarked';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleToggleItemCheck = (scholarshipId: string, itemId: string) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        const updatedItems = s.requiredItems.map(item => {
          if (item.id === itemId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
        return { ...s, requiredItems: updatedItems };
      }
      return s;
    }));

    if (selectedScholarship && selectedScholarship.id === scholarshipId) {
      setSelectedScholarship(prev => prev ? ({
        ...prev,
        requiredItems: prev.requiredItems.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
      }) : null);
    }
  };

  const handleOpenDetailModal = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailModalOpen(true);
  };

  const handleOpenInAIWriter = (scholarship: Scholarship) => {
    setSelectedEssayScholarshipId(scholarship.id);
    setActiveTab('essay');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveToVault = (newDoc: VaultDocument) => {
    setVaultDocuments(prev => [newDoc, ...prev]);
  };

  const handleResetDemoData = () => {
    if (confirm("Reset all data back to the default verified demo state?")) {
      setScholarships(SCHOLARSHIPS_DATA);
      setStudentProfile(INITIAL_STUDENT_PROFILE);
      setVaultDocuments(INITIAL_VAULT_DOCUMENTS);
      setCurrentUser(null);
      safeStorage.clear();
    }
  };

  // If user is not logged in and login screen is requested
  if (!currentUser && showLoginModal) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500" role="status">
          <span className="sr-only">Loading authentication...</span>
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <LoginPage 
          onLogin={handleLogin}
          onGuestAccess={handleGuestAccess}
          currentProfile={studentProfile}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Skip to Main Content Link for Keyboard Accessibility (a11y) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        stats={stats}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      {/* Guest Mode Banner if not logged in */}
      {!currentUser && (
        <aside 
          aria-label="Guest Mode Notification"
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-xs flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>You are browsing Grantly in <strong>Guest Mode</strong>. Sign in to save your personal scholarship applications.</span>
          </div>
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="px-3 py-1 bg-white text-emerald-900 rounded-lg font-bold hover:bg-emerald-50 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Sign In / Register
          </button>
        </aside>
      )}

      {/* Main Content Area */}
      <main id="main-content" role="main" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'explorer' && (
          <GrantExplorer
            scholarships={scholarships}
            studentProfile={studentProfile}
            onSelectScholarship={handleOpenDetailModal}
            onToggleBookmark={handleToggleBookmark}
            onQuickMove={handleUpdateStatus}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'pipeline' && (
          <PipelineKanban
            scholarships={scholarships}
            studentProfile={studentProfile}
            onUpdateStatus={handleUpdateStatus}
            onToggleItemCheck={handleToggleItemCheck}
            onSelectScholarship={handleOpenDetailModal}
            onOpenInAIWriter={handleOpenInAIWriter}
          />
        )}

        {activeTab === 'essay' && (
          <Suspense fallback={
            <div className="py-20 text-center text-slate-400" role="status">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs">Loading GrantWriter AI Studio...</p>
            </div>
          }>
            <GrantWriterStudio
              scholarships={scholarships}
              selectedScholarshipId={selectedEssayScholarshipId}
              studentProfile={studentProfile}
              onSaveToVault={handleSaveToVault}
            />
          </Suspense>
        )}

        {activeTab === 'calculator' && (
          <Suspense fallback={
            <div className="py-20 text-center text-slate-400" role="status">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs">Loading TrueCost Simulator...</p>
            </div>
          }>
            <AidStackingCalculator
              studentProfile={studentProfile}
              scholarships={scholarships}
              onUpdateProfile={setStudentProfile}
            />
          </Suspense>
        )}

        {activeTab === 'vault' && (
          <Suspense fallback={
            <div className="py-20 text-center text-slate-400" role="status">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs">Loading Document Vault...</p>
            </div>
          }>
            <DocumentVault
              documents={vaultDocuments}
              studentProfile={studentProfile}
              onAddDocument={handleSaveToVault}
              onDeleteDocument={(id) => setVaultDocuments(prev => prev.filter(d => d.id !== id))}
            />
          </Suspense>
        )}
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 mt-12 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold" aria-hidden="true">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              GRANTLY — Rethinking the Scholarship Experience
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleResetDemoData}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none rounded"
            >
              Reset Demo Sandbox
            </button>
            <span aria-hidden="true">·</span>
            <span>Empowering Debt-Free Higher Education</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        studentProfile={studentProfile}
        onUpdateStatus={handleUpdateStatus}
        onOpenInAIWriter={handleOpenInAIWriter}
      />

      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={studentProfile}
        onSaveProfile={setStudentProfile}
      />
    </div>
  );
}
