import React, { useState } from 'react';
import { 
  FolderLock, 
  FileText, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  Plus, 
  Send, 
  UserCheck, 
  Download,
  ExternalLink,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';

export default function DocumentVault({ 
  documents, 
  studentProfile, 
  onAddDocument, 
  onDeleteDocument 
}) {
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);
  const [copiedDocId, setCopiedDocId] = useState(null);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [activeLor, setActiveLor] = useState(null);
  const [copiedReminder, setCopiedReminder] = useState(false);

  // New doc modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('essay');
  const [newDocContent, setNewDocContent] = useState('');

  const lorDocuments = documents.filter(d => d.type === 'lor');

  const handleCopy = (doc) => {
    if (doc.content) {
      navigator.clipboard.writeText(doc.content);
      setCopiedDocId(doc.id);
      setTimeout(() => setCopiedDocId(null), 2000);
    }
  };

  const handleOpenReminder = (lorDoc) => {
    setActiveLor(lorDoc);
    setReminderModalOpen(true);
  };

  const reminderEmailTemplate = activeLor ? `Dear ${activeLor.recommender || 'Professor'},

I hope your semester is going smoothly! 

I am writing to gently follow up regarding the academic recommendation letter for my upcoming fellowship application (${activeLor.name || 'Scholarship'}). The formal deadline is approaching on November 15, 2026.

I have attached my updated academic CV, unofficial transcripts, and a brief 1-page summary of my research roadmap for your convenience. Please let me know if there are any specific materials or details I can provide to support your letter.

Thank you so much for your mentorship and advocacy.

Warm regards,
${studentProfile.fullName}
${studentProfile.major} · ${studentProfile.institution}
${studentProfile.email}` : '';

  const handleCopyReminder = () => {
    navigator.clipboard.writeText(reminderEmailTemplate);
    setCopiedReminder(true);
    setTimeout(() => setCopiedReminder(false), 2500);
  };

  const handleCreateDocument = (e) => {
    e.preventDefault();
    if (!newDocName) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      type: newDocType,
      updatedAt: '2026-11-07',
      status: 'Ready',
      wordCount: newDocContent ? newDocContent.trim().split(/\s+/).length : undefined,
      content: newDocContent || 'Uploaded document placeholder.'
    };

    onAddDocument(newDoc);
    setSelectedDoc(newDoc);
    setIsAddModalOpen(false);
    setNewDocName('');
    setNewDocContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <FolderLock className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Application Locker & LOR Tracker
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Store verified transcripts, standardized resumes, personal statements, and track faculty recommendation letters.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Add New Asset</span>
        </button>
      </div>

      {/* Main 2-Col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Documents List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
              Reusable Assets ({documents.length})
            </h3>

            <div className="space-y-2">
              {documents.map(doc => {
                const isSelected = selectedDoc?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500/20'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <FileText className={`w-4 h-4 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {doc.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        doc.status.includes('Verified') || doc.status === 'Ready'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}>
                        {doc.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pl-6">
                      <span className="capitalize">{doc.type} · {doc.updatedAt}</span>
                      {doc.wordCount && <span>{doc.wordCount} words</span>}
                      {doc.fileSize && <span>{doc.fileSize}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Letter of Recommendation (LOR) Tracker Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                Faculty Recommendation (LOR) Tracker
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                1 Pending
              </span>
            </div>

            {lorDocuments.map(lor => (
              <div key={lor.id} className="p-3 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 text-xs space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{lor.recommender}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{lor.notes}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                    {lor.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">Target Deadline: Nov 15</span>
                  <button
                    onClick={() => handleOpenReminder(lor)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    <Mail className="w-3 h-3 text-emerald-500" />
                    <span>Polite Follow-up Email Script</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Selected Document Viewer (7 cols) */}
        <div className="lg:col-span-7">
          {selectedDoc ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {selectedDoc.type}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {selectedDoc.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Last modified on {selectedDoc.updatedAt} · Status: {selectedDoc.status}
                  </p>
                </div>

                {selectedDoc.content && (
                  <button
                    onClick={() => handleCopy(selectedDoc)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedDocId === selectedDoc.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDocId === selectedDoc.id ? 'Copied' : 'Copy Text'}</span>
                  </button>
                )}
              </div>

              {selectedDoc.content ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                  {selectedDoc.content}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <ShieldCheck className="w-12 h-12 mx-auto text-emerald-500 opacity-80" />
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    Verified Digital Academic Asset
                  </p>
                  <p className="text-xs max-w-sm mx-auto">
                    {selectedDoc.notes || 'This document is authenticated and ready to be attached to scholarship submissions.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Select a document to preview or manage
            </div>
          )}
        </div>
      </div>

      {/* LOR Reminder Follow-up Modal */}
      {reminderModalOpen && activeLor && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                Polite Faculty Follow-up Template
              </h3>
              <button 
                onClick={() => setReminderModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Faculty receive hundreds of emails. A friendly, professional reminder 7-10 days before the deadline ensures your letter is submitted on time:
            </p>

            <pre className="text-xs font-mono p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-60 overflow-y-auto">
              {reminderEmailTemplate}
            </pre>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setReminderModalOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleCopyReminder}
                className="px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {copiedReminder ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReminder ? 'Copied to Clipboard' : 'Copy Template'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Add New Document to Vault
            </h3>

            <form onSubmit={handleCreateDocument} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leadership Statement, Community Service Log"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document Category
                </label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="essay">Essay / Statement of Purpose</option>
                  <option value="transcript">Academic Transcript</option>
                  <option value="resume">Resume / CV</option>
                  <option value="financial">Financial Aid / FAFSA</option>
                  <option value="lor">Recommendation Letter Record</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Text Content / Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste essay text or notes about this file..."
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
