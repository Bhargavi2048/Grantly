import React from 'react';
import { 
  Compass, 
  Kanban, 
  Sparkles, 
  Calculator, 
  FolderLock, 
  Moon, 
  Sun, 
  GraduationCap, 
  UserCheck, 
  DollarSign, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  LogOut,
  LogIn
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  studentProfile, 
  onOpenProfile, 
  isDarkMode, 
  toggleDarkMode,
  stats,
  currentUser,
  onSignOut,
  onOpenLogin
}) {
  const navItems = [
    { id: 'explorer', label: 'Discover Grants', icon: Compass, badge: null },
    { id: 'pipeline', label: 'Application Pipeline', icon: Kanban, badge: stats.activeCount > 0 ? stats.activeCount : null },
    { id: 'essay', label: 'GrantWriter AI', icon: Sparkles, badge: 'AI' },
    { id: 'calculator', label: 'Aid & TrueCost', icon: Calculator, badge: null },
    { id: 'vault', label: 'Locker & LORs', icon: FolderLock, badge: stats.pendingLORS > 0 ? `${stats.pendingLORS} pending` : null },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('explorer')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  GRANTLY
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Democratizing Educational Financial Assistance
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      item.badge === 'AI'
                        ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                        : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Quick funding summary badge */}
            <div 
              onClick={() => setActiveTab('calculator')}
              className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-emerald-400 transition-colors"
              title="Click to view TrueCost and Aid Stacking Simulator"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-xs">
                <span className="text-slate-500 dark:text-slate-400">Awarded: </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ${stats.awardedTotal.toLocaleString()}
                </span>
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-slate-500 dark:text-slate-400">Target: </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  ${studentProfile.totalFundingGoal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Auth / Profile Section */}
            {currentUser ? (
              <div className="flex items-center space-x-1.5">
                {/* Student Profile Trigger Button */}
                <button
                  onClick={onOpenProfile}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all shadow-sm group"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/20">
                    {studentProfile.fullName.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {studentProfile.fullName.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                      {studentProfile.gpa.toFixed(2)} GPA · {studentProfile.major.slice(0, 10)}
                    </p>
                  </div>
                  <span className="text-slate-400 text-xs">▼</span>
                </button>

                {/* Sign Out Button */}
                <button
                  onClick={onSignOut}
                  className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-200 dark:border-slate-800 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
