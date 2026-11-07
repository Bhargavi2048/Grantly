import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import GrantExplorer from './components/GrantExplorer';
import PipelineKanban from './components/PipelineKanban';
import GrantWriterStudio from './components/GrantWriterStudio';
import AidStackingCalculator from './components/AidStackingCalculator';
import DocumentVault from './components/DocumentVault';
import ScholarshipDetailModal from './components/ScholarshipDetailModal';
import StudentProfileModal from './components/StudentProfileModal';

import { SCHOLARSHIPS_DATA, calculateMatchScore } from './data/scholarships';
import { INITIAL_STUDENT_PROFILE, INITIAL_VAULT_DOCUMENTS } from './data/initialProfile';
import { GraduationCap, Sparkles, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('explorer');

  // LocalStorage-backed state
  const [scholarships, setScholarships] = useState(() => {
    const saved = localStorage.getItem('grantly_scholarships_v2');
    return saved ? JSON.parse(saved) : SCHOLARSHIPS_DATA;
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('grantly_student_profile_v2');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
  });

  const [vaultDocuments, setVaultDocuments] = useState(() => {
    const saved = localStorage.getItem('grantly_vault_docs_v2');
    return saved ? JSON.parse(saved) : INITIAL_VAULT_DOCUMENTS;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('grantly_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Modal states
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedEssayScholarshipId, setSelectedEssayScholarshipId] = useState('');

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('grantly_scholarships_v2', JSON.stringify(scholarships));
  }, [scholarships]);

  useEffect(() => {
    localStorage.setItem('grantly_student_profile_v2', JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem('grantly_vault_docs_v2', JSON.stringify(vaultDocuments));
  }, [vaultDocuments]);

  useEffect(() => {
    localStorage.setItem('grantly_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

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
  const handleUpdateStatus = (scholarshipId, newStatus) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        return { ...s, status: newStatus };
      }
      return s;
    }));

    if (selectedScholarship && selectedScholarship.id === scholarshipId) {
      setSelectedScholarship(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleToggleBookmark = (scholarshipId) => {
    setScholarships(prev => prev.map(s => {
      if (s.id === scholarshipId) {
        const nextStatus = s.status === 'bookmarked' ? 'unapplied' : 'bookmarked';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleToggleItemCheck = (scholarshipId, itemId) => {
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
      setSelectedScholarship(prev => ({
        ...prev,
        requiredItems: prev.requiredItems.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
      }));
    }
  };

  const handleOpenDetailModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailModalOpen(true);
  };

  const handleOpenInAIWriter = (scholarship) => {
    setSelectedEssayScholarshipId(scholarship.id);
    setActiveTab('essay');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveToVault = (newDoc) => {
    setVaultDocuments(prev => [newDoc, ...prev]);
  };

  const handleResetDemoData = () => {
    if (confirm("Reset all data back to the default demo state?")) {
      setScholarships(SCHOLARSHIPS_DATA);
      setStudentProfile(INITIAL_STUDENT_PROFILE);
      setVaultDocuments(INITIAL_VAULT_DOCUMENTS);
      localStorage.clear();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        stats={stats}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
          <GrantWriterStudio
            scholarships={scholarships}
            selectedScholarshipId={selectedEssayScholarshipId}
            studentProfile={studentProfile}
            onSaveToVault={handleSaveToVault}
          />
        )}

        {activeTab === 'calculator' && (
          <AidStackingCalculator
            studentProfile={studentProfile}
            scholarships={scholarships}
            onUpdateProfile={setStudentProfile}
          />
        )}

        {activeTab === 'vault' && (
          <DocumentVault
            documents={vaultDocuments}
            studentProfile={studentProfile}
            onAddDocument={handleSaveToVault}
            onDeleteDocument={(id) => setVaultDocuments(prev => prev.filter(d => d.id !== id))}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 mt-12 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              GRANTLY — Rethinking the Scholarship Experience
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetDemoData}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Reset Demo Sandbox
            </button>
            <span>·</span>
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
