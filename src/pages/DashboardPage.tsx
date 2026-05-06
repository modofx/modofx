import { useState } from 'react';
import {
  LayoutDashboard, FileText, RefreshCw, Settings, Bell, Search, ChevronDown,
  CheckCircle, Clock,
  BarChart3, Upload, Eye, Building2,
  ArrowUpRight, Users, CreditCard, Activity, Loader2, TrendingUp, TrendingDown,
} from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useDashboard } from '../hooks/useDashboard';
import InvoiceUploadModal from '../components/InvoiceUploadModal';
import InvoiceDetailPanel from '../components/InvoiceDetailPanel';
import { Invoice, InvoiceStatus } from '../lib/supabase';

interface DashboardPageProps {
  onNavigate: (_page: string) => void;
}

const statusColors: Record<string, string> = {
  'Draft':          'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
  'Extracting':     'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  'Pending Review': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  'Manual Review':  'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  'Approved':       'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  'Rejected':       'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  'Syncing':        'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400',
  'Payment Ready':  'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
  'Completed':      'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
};

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Invoices' },
  { icon: RefreshCw, label: 'Tally Sync' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Building2, label: 'Companies' },
  { icon: Users, label: 'Team' },
  { icon: Settings, label: 'Settings' },
];

interface CompanyData {
  id: string;
  name: string;
  plan: string;
  color: string;
  invoices: number;
  processed: number;
  pending: number;
  totalValue: number;
  trend: number;
  tallySync: string;
  chartData: { day: string; received: number; processed: number }[];
  statusBreakdown: { label: string; count: number; color: string }[];
}

const COMPANIES: CompanyData[] = [
  {
    id: 'techventures',
    name: 'TechVentures India',
    plan: 'Pro Plan',
    color: 'bg-brand-600',
    invoices: 25,
    processed: 17,
    pending: 4,
    totalValue: 5620000,
    trend: +12,
    tallySync: 'Live',
    chartData: [
      { day: 'Apr 22', received: 8,  processed: 5  },
      { day: 'Apr 23', received: 12, processed: 9  },
      { day: 'Apr 24', received: 7,  processed: 6  },
      { day: 'Apr 25', received: 15, processed: 11 },
      { day: 'Apr 26', received: 10, processed: 8  },
      { day: 'Apr 27', received: 18, processed: 14 },
      { day: 'Apr 28', received: 13, processed: 10 },
      { day: 'Apr 29', received: 20, processed: 16 },
      { day: 'Apr 30', received: 16, processed: 13 },
      { day: 'May 1',  received: 22, processed: 18 },
      { day: 'May 2',  received: 14, processed: 11 },
      { day: 'May 3',  received: 25, processed: 20 },
      { day: 'May 4',  received: 19, processed: 15 },
      { day: 'May 5',  received: 23, processed: 17 },
    ],
    statusBreakdown: [
      { label: 'Completed',     count: 11, color: 'bg-teal-500' },
      { label: 'Approved',      count: 5,  color: 'bg-emerald-500' },
      { label: 'Payment Ready', count: 1,  color: 'bg-cyan-500' },
      { label: 'Pending',       count: 4,  color: 'bg-amber-500' },
      { label: 'In Progress',   count: 2,  color: 'bg-blue-500' },
      { label: 'Draft',         count: 1,  color: 'bg-neutral-400' },
      { label: 'Rejected',      count: 1,  color: 'bg-red-500' },
    ],
  },
  {
    id: 'apexgroup',
    name: 'Apex Group',
    plan: 'Business Plan',
    color: 'bg-emerald-600',
    invoices: 18,
    processed: 13,
    pending: 3,
    totalValue: 3840000,
    trend: +8,
    tallySync: 'Live',
    chartData: [
      { day: 'Apr 22', received: 5,  processed: 3  },
      { day: 'Apr 23', received: 8,  processed: 6  },
      { day: 'Apr 24', received: 4,  processed: 3  },
      { day: 'Apr 25', received: 10, processed: 7  },
      { day: 'Apr 26', received: 7,  processed: 5  },
      { day: 'Apr 27', received: 12, processed: 9  },
      { day: 'Apr 28', received: 9,  processed: 7  },
      { day: 'Apr 29', received: 14, processed: 11 },
      { day: 'Apr 30', received: 11, processed: 8  },
      { day: 'May 1',  received: 15, processed: 12 },
      { day: 'May 2',  received: 9,  processed: 7  },
      { day: 'May 3',  received: 17, processed: 13 },
      { day: 'May 4',  received: 13, processed: 10 },
      { day: 'May 5',  received: 16, processed: 12 },
    ],
    statusBreakdown: [
      { label: 'Completed',     count: 8,  color: 'bg-teal-500' },
      { label: 'Approved',      count: 3,  color: 'bg-emerald-500' },
      { label: 'Payment Ready', count: 2,  color: 'bg-cyan-500' },
      { label: 'Pending',       count: 3,  color: 'bg-amber-500' },
      { label: 'In Progress',   count: 1,  color: 'bg-blue-500' },
      { label: 'Draft',         count: 1,  color: 'bg-neutral-400' },
      { label: 'Rejected',      count: 0,  color: 'bg-red-500' },
    ],
  },
  {
    id: 'srienterprise',
    name: 'Sri Enterprise',
    plan: 'Starter Plan',
    color: 'bg-amber-600',
    invoices: 9,
    processed: 5,
    pending: 2,
    totalValue: 980000,
    trend: -3,
    tallySync: 'Syncing',
    chartData: [
      { day: 'Apr 22', received: 2, processed: 1 },
      { day: 'Apr 23', received: 3, processed: 2 },
      { day: 'Apr 24', received: 1, processed: 1 },
      { day: 'Apr 25', received: 4, processed: 2 },
      { day: 'Apr 26', received: 3, processed: 2 },
      { day: 'Apr 27', received: 5, processed: 3 },
      { day: 'Apr 28', received: 2, processed: 1 },
      { day: 'Apr 29', received: 6, processed: 4 },
      { day: 'Apr 30', received: 4, processed: 3 },
      { day: 'May 1',  received: 7, processed: 4 },
      { day: 'May 2',  received: 3, processed: 2 },
      { day: 'May 3',  received: 8, processed: 5 },
      { day: 'May 4',  received: 5, processed: 3 },
      { day: 'May 5',  received: 6, processed: 4 },
    ],
    statusBreakdown: [
      { label: 'Completed',     count: 3, color: 'bg-teal-500' },
      { label: 'Approved',      count: 2, color: 'bg-emerald-500' },
      { label: 'Payment Ready', count: 0, color: 'bg-cyan-500' },
      { label: 'Pending',       count: 2, color: 'bg-amber-500' },
      { label: 'In Progress',   count: 1, color: 'bg-blue-500' },
      { label: 'Draft',         count: 1, color: 'bg-neutral-400' },
      { label: 'Rejected',      count: 0, color: 'bg-red-500' },
    ],
  },
];

interface ChartPoint { day: string; received: number; processed: number; }

function InvoiceVolumeChart({ data }: { data: ChartPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxVal = Math.max(...data.map(d => d.received));
  const scale = Math.ceil(maxVal / 5) * 5 || 5;
  const gridLines = [0, 5, 10, 15, 20, 25].filter(v => v <= scale);
  const chartH = 140;

  return (
    <div className="relative select-none">
      <div className="flex">
        <div className="flex flex-col justify-between items-end pr-2 text-xs text-neutral-400" style={{ height: chartH + 'px', minWidth: 24 }}>
          {[...gridLines].reverse().map(v => (
            <span key={v}>{v}</span>
          ))}
        </div>
        <div className="flex-1 relative" style={{ height: chartH + 'px' }}>
          {gridLines.map(v => (
            <div
              key={v}
              className="absolute left-0 right-0 border-t border-neutral-100 dark:border-neutral-800"
              style={{ bottom: `${(v / scale) * 100}%` }}
            />
          ))}
          <div className="absolute inset-0 flex items-end gap-1 px-0.5">
            {data.map((d, i) => {
              const recH = (d.received / scale) * 100;
              const isHovered = hovered === i;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end group relative h-full"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isHovered && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 bg-neutral-900 dark:bg-neutral-700 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg pointer-events-none">
                      <div className="font-semibold mb-0.5">{d.day}</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-200 inline-block" /> {d.received} rcvd</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-500 inline-block" /> {d.processed} proc</div>
                    </div>
                  )}
                  <div className="relative w-full flex flex-col items-center justify-end gap-px" style={{ height: `${recH}%` }}>
                    <div
                      className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-200 ${isHovered ? 'bg-brand-300 dark:bg-brand-700' : 'bg-brand-100 dark:bg-brand-900/40'}`}
                      style={{ height: '100%' }}
                    />
                    <div
                      className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-200 ${isHovered ? 'bg-brand-600' : 'bg-brand-500'}`}
                      style={{ height: `${(d.processed / d.received) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex mt-1.5 pl-8">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center">
            {i % 2 === 0 && (
              <span className="text-xs text-neutral-400 leading-none">{d.day.split(' ')[1]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage({ onNavigate: _onNavigate }: DashboardPageProps) {
  const { theme, toggleTheme } = useTheme();
  const { invoices, loading, updateStatus, addInvoice } = useDashboard();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [activeCompanyId, setActiveCompanyId] = useState('techventures');
  const [companyDropOpen, setCompanyDropOpen] = useState(false);

  const activeCompany = COMPANIES.find(c => c.id === activeCompanyId) ?? COMPANIES[0];
  const isTechVentures = activeCompanyId === 'techventures';

  // Stats: use live data for TechVentures, mock data for others
  const displayStats = isTechVentures
    ? {
        total: invoices.length,
        pending: invoices.filter(i => i.status === 'Pending Review' || i.status === 'Manual Review').length,
        processed: invoices.filter(i => i.status === 'Approved' || i.status === 'Completed' || i.status === 'Payment Ready').length,
        totalValue: invoices.reduce((s, i) => s + Number(i.amount), 0),
      }
    : {
        total: activeCompany.invoices,
        pending: activeCompany.pending,
        processed: activeCompany.processed,
        totalValue: activeCompany.totalValue,
      };

  // Status breakdown: live for TechVentures, mock for others
  const displayStatusBreakdown = isTechVentures
    ? [
        { label: 'Completed',     count: invoices.filter(i => i.status === 'Completed').length,                                      color: 'bg-teal-500' },
        { label: 'Approved',      count: invoices.filter(i => i.status === 'Approved').length,                                       color: 'bg-emerald-500' },
        { label: 'Payment Ready', count: invoices.filter(i => i.status === 'Payment Ready').length,                                  color: 'bg-cyan-500' },
        { label: 'Pending',       count: invoices.filter(i => i.status === 'Pending Review' || i.status === 'Manual Review').length, color: 'bg-amber-500' },
        { label: 'In Progress',   count: invoices.filter(i => i.status === 'Syncing' || i.status === 'Extracting').length,           color: 'bg-blue-500' },
        { label: 'Draft',         count: invoices.filter(i => i.status === 'Draft').length,                                          color: 'bg-neutral-400' },
        { label: 'Rejected',      count: invoices.filter(i => i.status === 'Rejected').length,                                      color: 'bg-red-500' },
      ]
    : activeCompany.statusBreakdown;

  const statusTotal = displayStatusBreakdown.reduce((s, i) => s + i.count, 0) || 1;
  const chartData = activeCompany.chartData;

  const filtered = invoices.filter(inv => {
    const matchSearch =
      inv.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      inv.vendor_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || inv.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id: string, status: InvoiceStatus) => {
    await updateStatus(id, status);
    setSelectedInvoice(prev => prev ? { ...prev, status } : null);
  };

  const handleSelectCompany = (id: string) => {
    setActiveCompanyId(id);
    setCompanyDropOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex pt-16">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 fixed top-16 bottom-0 left-0 z-40">
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 relative">
          <button
            onClick={() => setCompanyDropOpen(v => !v)}
            className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg ${activeCompany.color} flex items-center justify-center shrink-0`}>
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{activeCompany.name}</div>
              <div className="text-xs text-neutral-400">{activeCompany.plan} · Demo</div>
            </div>
            <ChevronDown className={`w-3 h-3 text-neutral-400 shrink-0 transition-transform duration-200 ${companyDropOpen ? 'rotate-180' : ''}`} />
          </button>
          {companyDropOpen && (
            <div className="absolute left-3 right-3 top-full mt-1 z-50 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-xl overflow-hidden">
              {COMPANIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCompany(c.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    c.id === activeCompanyId
                      ? 'bg-brand-50 dark:bg-brand-900/30'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-700'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg ${c.color} flex items-center justify-center shrink-0`}>
                    <Building2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{c.name}</div>
                    <div className="text-xs text-neutral-400">{c.plan}</div>
                  </div>
                  {c.id === activeCompanyId && (
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarItems.map(item => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <img
              src="/rekha_pic.jpeg"
              className="w-8 h-8 rounded-full object-cover"
              alt="Vijaya Rekha D S"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-neutral-900 dark:text-white">Vijaya Rekha D S</div>
              <div className="text-xs text-neutral-400">Finance Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-60 min-w-0">
        {/* Topbar */}
        <div className="sticky top-16 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-neutral-900 dark:text-white">Dashboard</h1>
              <div className={`w-2 h-2 rounded-full ${activeCompany.color} opacity-80`} />
              <span className="text-sm text-neutral-400 hidden sm:block">{activeCompany.name}</span>
              {loading && isTechVentures && <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 w-48"
                />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Bell className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-neutral-400" /> : <Moon className="w-4 h-4 text-neutral-500" />}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { title: 'Total Invoices',    value: (loading && isTechVentures) ? '—' : displayStats.total.toString(),                                          icon: FileText,    color: 'brand',   sub: 'all time' },
              { title: 'Pending Approval',  value: (loading && isTechVentures) ? '—' : displayStats.pending.toString(),                                        icon: Clock,       color: 'amber',   sub: 'need review' },
              { title: 'Processed',         value: (loading && isTechVentures) ? '—' : displayStats.processed.toString(),                                      icon: CheckCircle, color: 'emerald', sub: 'approved + done' },
              { title: 'Total Value',       value: (loading && isTechVentures) ? '—' : `₹${(displayStats.totalValue / 100000).toFixed(1)}L`,                  icon: CreditCard,  color: 'blue',    sub: 'all invoices' },
            ].map(card => (
              <div key={card.title} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{card.title}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    card.color === 'brand'   ? 'bg-brand-50 dark:bg-brand-900/30'   :
                    card.color === 'amber'   ? 'bg-amber-50 dark:bg-amber-900/20'   :
                    card.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
                    'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <card.icon className={`w-4 h-4 ${
                      card.color === 'brand'   ? 'text-brand-600 dark:text-brand-400'   :
                      card.color === 'amber'   ? 'text-amber-600 dark:text-amber-400'   :
                      card.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{card.value}</div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                  {card.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Companies Overview */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Companies Overview</h3>
                <p className="text-xs text-neutral-400 mt-0.5">All entities under your account · click to switch</p>
              </div>
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2.5 py-1 rounded-lg">
                {COMPANIES.length} entities
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COMPANIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveCompanyId(c.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    c.id === activeCompanyId
                      ? 'border-brand-400 dark:border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center shrink-0`}>
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{c.name}</div>
                      <div className="text-xs text-neutral-400">{c.plan}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <div className="text-xs text-neutral-400 mb-0.5">Invoices</div>
                      <div className="text-sm font-bold text-neutral-900 dark:text-white">{c.invoices}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 mb-0.5">Processed</div>
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{c.processed}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 mb-0.5">Pending</div>
                      <div className="text-sm font-bold text-amber-600 dark:text-amber-400">{c.pending}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-400 mb-0.5">Total Value</div>
                      <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        ₹{(c.totalValue / 100000).toFixed(1)}L
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {c.trend >= 0
                        ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        : <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
                      <span className={`text-xs font-medium ${c.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {c.trend >= 0 ? '+' : ''}{c.trend}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.tallySync === 'Live' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                    <span className={`text-xs ${c.tallySync === 'Live' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      Tally {c.tallySync}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-0.5">Combined Invoices</div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white">{COMPANIES.reduce((s, c) => s + c.invoices, 0)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-0.5">Total Processed</div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{COMPANIES.reduce((s, c) => s + c.processed, 0)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-0.5">Combined Value</div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white">₹{(COMPANIES.reduce((s, c) => s + c.totalValue, 0) / 100000).toFixed(1)}L</div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">Invoice Processing Volume</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{activeCompany.name} · Daily invoices received vs processed</p>
                </div>
                <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">Last 14 days</span>
              </div>
              <InvoiceVolumeChart data={chartData} />
              <div className="flex items-center gap-5 mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-brand-200 dark:bg-brand-800 inline-block" />
                  Received
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-brand-500 inline-block" />
                  Processed
                </div>
                <div className="ml-auto font-medium text-neutral-700 dark:text-neutral-300">
                  Total: {chartData.reduce((s, d) => s + d.processed, 0)} processed
                </div>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Status Breakdown</h3>
                <span className="text-xs text-neutral-400 truncate max-w-[100px]">{activeCompany.name}</span>
              </div>
              {loading && isTechVentures ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
                </div>
              ) : (
                <div className="space-y-3">
                  {displayStatusBreakdown.map(item => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-neutral-600 dark:text-neutral-400">{item.label}</span>
                        <span className="font-medium text-neutral-900 dark:text-white">{item.count}</span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color} transition-all duration-500`} style={{ width: `${(item.count / statusTotal) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 pt-5 border-t border-neutral-100 dark:border-neutral-800">
                <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">Tally Sync</h4>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${activeCompany.tallySync === 'Live' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-amber-50 dark:bg-amber-900/20'}`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${activeCompany.tallySync === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className={`text-xs font-medium ${activeCompany.tallySync === 'Live' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                    {activeCompany.tallySync === 'Live' ? 'Connected · Live' : 'Syncing in progress…'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Invoices</h3>
                {!isTechVentures && (
                  <p className="text-xs text-neutral-400 mt-0.5">Showing TechVentures India data in demo mode</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  {['All', 'Pending Review', 'Approved', 'Syncing', 'Completed', 'Rejected'].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        filterStatus === s
                          ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                          : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowUpload(true)} className="btn-primary text-sm py-1.5 px-3">
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-10 h-10 text-neutral-200 dark:text-neutral-700 mx-auto mb-3" />
                <p className="text-sm text-neutral-400">No invoices found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      {['Invoice ID', 'Vendor', 'Amount', 'GST', 'Date', 'Status', ''].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800/50">
                    {filtered.map(inv => (
                      <tr
                        key={inv.id}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors group"
                      >
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs font-medium text-brand-600 dark:text-brand-400">{inv.invoice_number}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{inv.vendor_name}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                            ₹{Number(inv.amount).toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            ₹{Number(inv.gst_amount).toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs text-neutral-400">
                            {inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`badge text-xs ${statusColors[inv.status] ?? ''}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900 dark:text-white">Live Activity</h3>
              <Activity className="w-4 h-4 text-neutral-400" />
            </div>
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading activity...
              </div>
            ) : invoices.length === 0 ? (
              <p className="text-sm text-neutral-400">No activity yet.</p>
            ) : (
              <div className="space-y-3">
                {invoices.slice(0, 6).map(inv => (
                  <div key={inv.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      inv.status === 'Completed' || inv.status === 'Approved' ? 'bg-emerald-500' :
                      inv.status === 'Rejected' ? 'bg-red-500' :
                      inv.status === 'Pending Review' ? 'bg-amber-500' : 'bg-brand-500'
                    }`} />
                    <div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        <span className="font-mono text-xs text-brand-600 dark:text-brand-400">{inv.invoice_number}</span>
                        {' '}— {inv.vendor_name} · <span className={`badge text-xs ${statusColors[inv.status] ?? ''}`}>{inv.status}</span>
                      </p>
                      <span className="text-xs text-neutral-400">
                        {new Date(inv.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showUpload && (
        <InvoiceUploadModal
          onClose={() => setShowUpload(false)}
          onSave={addInvoice}
        />
      )}

      {selectedInvoice && (
        <InvoiceDetailPanel
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
