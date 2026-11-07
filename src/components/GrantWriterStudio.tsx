import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  Save, 
  Wand2, 
  Lightbulb, 
  TrendingUp
} from 'lucide-react';
import { Scholarship, StudentProfile, VaultDocument } from '../types';
import { sanitizeText } from '../utils/security';

interface GrantWriterStudioProps {
  scholarships: Scholarship[];
  selectedScholarshipId: string;
  studentProfile: StudentProfile;
  onSaveToVault: (doc: VaultDocument) => void;
}

interface OutlineBeat {
  phase: string;
  tip: string;
}

export default function GrantWriterStudio({ 
  scholarships, 
  selectedScholarshipId, 
  studentProfile,
  onSaveToVault 
}: GrantWriterStudioProps): JSX.Element {
  // Find scholarships with essay prompts
  const essayScholarships = scholarships.filter(s => s.essayPrompts && s.essayPrompts.length > 0);
  const initialScholarship = essayScholarships.find(s => s.id === selectedScholarshipId) || essayScholarships[0];

  const [activeSchId, setActiveSchId] = useState<string>(initialScholarship ? initialScholarship.id : '');
  const activeScholarship = scholarships.find(s => s.id === activeSchId) || essayScholarships[0];
  const activePrompt = activeScholarship?.essayPrompts?.[0] || {
    id: 'ep-general',
    title: 'General Personal Statement',
    prompt: 'Describe your personal background, challenges overcome, academic trajectory, and how educational financial aid will empower your community contributions.',
    wordLimit: 600,
    keyThemes: ['Resilience', 'Academic Drive', 'Community Impact', 'Vision']
  };

  // Draft state
  const [essayContent, setEssayContent] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState<boolean>(false);
  const [outline, setOutline] = useState<OutlineBeat[] | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Initialize draft when active scholarship changes
  useEffect(() => {
    if (activeScholarship) {
      if (activeScholarship.id === 'sch-amazon-future-engineer') {
        setEssayContent(`Growing up in a household where neither parent had the opportunity to complete high school, higher education was both an elusive summit and an unspoken obligation. My father worked twelve-hour shifts at a distribution warehouse, while my mother managed residential sanitation. Every evening around our kitchen table, they reminded me that education is the one asset economic volatility can never confiscate.

When I first stepped onto campus as a Computer Science major, imposter syndrome was palpable. Yet, I soon recognized that resilience is an engineering virtue: debugging complex algorithmic code requires the exact patience and iterative grit that watching my parents rebuild their lives taught me.

Today, I channel this heritage into community leadership. As a student mentor for Girls Who Code, I facilitate weekly workshops for high schoolers from underserved districts across our county, demonstrating that computational technology should reflect the diversity of the world it claims to serve.`);
      } else if (activeScholarship.id === 'sch-generation-google') {
        setEssayContent(`As artificial intelligence models become deeply embedded in healthcare diagnostics, credit scoring, and public resource allocation, algorithmic bias is no longer a theoretical debate—it is an urgent civil rights challenge. My research roadmap focuses on interpretable neural architectures that allow clinicians and patients to understand why algorithmic recommendations are generated, particularly in under-resourced community health clinics.

Through our university's computational biology lab, I spearheaded a pilot project evaluating predictive diagnostic accuracy across ethnically diverse clinical datasets. This fellowship will allow me to dedicate 20 hours weekly to open-source verification pipelines, accelerating humane technology that puts ethical accountability first.`);
      } else {
        setEssayContent('');
      }
      setOutline(null);
    }
  }, [activeSchId, activeScholarship]);

  // Compute metrics
  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const wordLimit = activePrompt.wordLimit;
  const progressPercent = Math.min(100, Math.round((wordCount / wordLimit) * 100));
  const isOverLimit = wordCount > wordLimit;

  // Real-time theme alignment detector
  const themeAlignment = activePrompt.keyThemes.map(theme => {
    const keyword = theme.split(' ')[0] || '';
    const regex = new RegExp(keyword, 'i');
    const isDetected = regex.test(essayContent);
    return {
      theme,
      isDetected
    };
  });

  const handleGenerateOutline = () => {
    setIsGeneratingOutline(true);
    setTimeout(() => {
      setOutline([
        {
          phase: 'Beat 1: The Inciting Spark & Hook',
          tip: `Open with a sensory, specific scene depicting your background as a ${studentProfile.major} student facing structural challenges, avoiding generic quotes.`
        },
        {
          phase: 'Beat 2: The Crucible & Growth',
          tip: `Detail how handling collegiate coursework alongside financial commitments honed your problem-solving resilience.`
        },
        {
          phase: 'Beat 3: Community Multiplier Effect',
          tip: `Demonstrate leadership: highlight your involvement in ${studentProfile.communityInvolvement} to prove you invest in others.`
        },
        {
          phase: 'Beat 4: The Vision with this Fellowship',
          tip: `Connect the ${activeScholarship ? activeScholarship.title : 'Scholarship'} directly to your milestone: ${studentProfile.careerGoal}.`
        }
      ]);
      setIsGeneratingOutline(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(essayContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveVault = () => {
    onSaveToVault({
      id: `doc-${Date.now()}`,
      name: `${activeScholarship ? activeScholarship.title.slice(0, 32) : 'Essay'} - Draft`,
      type: 'essay',
      wordCount: wordCount,
      updatedAt: '2026-11-07',
      status: 'Ready',
      content: sanitizeText(essayContent)
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <section 
        aria-labelledby="studio-heading"
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400" aria-hidden="true">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 id="studio-heading" className="text-xl font-bold text-slate-900 dark:text-white">
              GrantWriter AI & Narrative Studio
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Craft authentic, rubric-aligned scholarship essays with real-time prompt guidance and narrative architecture.
          </p>
        </div>

        {/* Opportunity Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="target-grant-select" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Target Grant:
          </label>
          <select
            id="target-grant-select"
            value={activeSchId}
            onChange={(e) => setActiveSchId(e.target.value)}
            className="text-xs font-bold py-2 px-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500"
          >
            {essayScholarships.map(s => (
              <option key={s.id} value={s.id}>
                {s.title} (${s.amount.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Main Workspace: 2-Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Writing Editor (8 cols) */}
        <section aria-label="Essay Editor" className="lg:col-span-8 space-y-4">
          {/* Prompt card */}
          <div className="p-4 rounded-2xl border border-purple-200/80 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
                Prompt: {activePrompt.title}
              </span>
              <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300">
                Limit: {activePrompt.wordLimit} words
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "{activePrompt.prompt}"
            </p>
          </div>

          {/* Text Editor Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col space-y-3">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center space-x-3" aria-live="polite">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Words: <strong className={isOverLimit ? 'text-rose-500 font-bold' : 'text-slate-900 dark:text-white'}>{wordCount}</strong> / {wordLimit}
                </span>
                <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
                <span className="text-slate-500">
                  {wordLimit - wordCount >= 0 ? `${wordLimit - wordCount} words remaining` : `${Math.abs(wordLimit - wordCount)} words over limit!`}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md font-medium transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
                  aria-label="Copy essay draft to clipboard"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveVault}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold transition-all flex items-center gap-1 shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                >
                  <Save className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{saveSuccess ? 'Saved in Vault!' : 'Save to Vault'}</span>
                </button>
              </div>
            </div>

            {/* Word Progress Bar */}
            <div 
              className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Word count limit: ${wordCount} of ${wordLimit} words`}
            >
              <div 
                className={`h-full transition-all duration-300 ${
                  isOverLimit ? 'bg-rose-500' : progressPercent >= 80 ? 'bg-emerald-500' : 'bg-purple-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Textarea */}
            <label htmlFor="essay-draft-editor" className="sr-only">
              Scholarship essay narrative draft
            </label>
            <textarea
              id="essay-draft-editor"
              rows={16}
              value={essayContent}
              onChange={(e) => setEssayContent(e.target.value)}
              placeholder="Start drafting your scholarship narrative here. Write about your defining moments, academic pursuits, and long-term community impact..."
              className="w-full p-3 text-sm rounded-xl border-none focus:outline-none bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 leading-relaxed resize-y font-sans"
            />
          </div>
        </section>

        {/* Right Side: AI Assistant & Rubric Themes (4 cols) */}
        <section aria-label="AI Rubric and Narrative Guidance" className="lg:col-span-4 space-y-4">
          {/* Rubric Theme Alignment Meter */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              Prompt Theme Alignment
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Scholarship selection committees score applicants against specific values. We scan your draft for them:
            </p>

            <div className="space-y-2" role="list">
              {themeAlignment.map(({ theme, isDetected }) => (
                <div 
                  key={theme}
                  role="listitem"
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                    isDetected
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="font-semibold">{theme}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDetected ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {isDetected ? '✓ Detected' : 'Missing'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Narrative Architecture Generator */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-purple-500" aria-hidden="true" />
                Narrative Outline
              </h2>
              <button
                type="button"
                onClick={handleGenerateOutline}
                disabled={isGeneratingOutline}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 transition-colors focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
              >
                {isGeneratingOutline ? 'Generating...' : outline ? 'Regenerate' : 'Generate Outline'}
              </button>
            </div>

            {outline ? (
              <div className="space-y-2.5" role="list">
                {outline.map((item, idx) => (
                  <div key={idx} role="listitem" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-xs border border-slate-100 dark:border-slate-700/60">
                    <p className="font-bold text-purple-700 dark:text-purple-300 mb-0.5">{item.phase}</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">{item.tip}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                <Lightbulb className="w-6 h-6 mx-auto mb-1.5 text-amber-400 opacity-80" aria-hidden="true" />
                <p>Click "Generate Outline" to synthesize a 4-beat structure tailored to {studentProfile.fullName.split(' ')[0]}'s background.</p>
              </div>
            )}
          </div>

          {/* Winning Essay Tips */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-1.5">
            <p className="font-bold flex items-center gap-1 text-amber-800 dark:text-amber-200">
              💡 Review Committee Pro-Tip:
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Show, don't tell: Rather than stating "I am hardworking", depict the exact 6 AM warehouse shifts or troubleshooting late hours at the computer lab. Specificity wins scholarships.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
