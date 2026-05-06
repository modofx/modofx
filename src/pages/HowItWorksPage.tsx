import { useState, useEffect, useRef } from 'react';
import { Upload, Scan, CheckCircle, RefreshCw, FileCheck, CreditCard, ArrowRight, Zap, Shield, Clock } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: string) => void;
}

const lifecycleSteps = [
  {
    id: 1, status: 'Draft',
    colorClass: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
    borderClass: 'border-neutral-300 dark:border-neutral-700',
    dotClass: 'bg-neutral-400',
    icon: Upload,
    title: 'Invoice Received',
    description: 'Invoice arrives via email, WhatsApp, or direct upload. System auto-creates a draft record.',
    actor: 'System / User', time: '< 1 sec',
  },
  {
    id: 2, status: 'Extracting',
    colorClass: 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400',
    borderClass: 'border-brand-300 dark:border-brand-700',
    dotClass: 'bg-brand-500',
    icon: Scan,
    title: 'AI OCR Extraction',
    description: 'AI extracts vendor, amount, GST, and line items. Maps to Tally ledger fields with 99.7% accuracy.',
    actor: 'AI Engine', time: '2–5 sec',
  },
  {
    id: 3, status: 'Pending Review',
    colorClass: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    borderClass: 'border-amber-300 dark:border-amber-700',
    dotClass: 'bg-amber-500',
    icon: Clock,
    title: 'Pending Review',
    description: 'Assigned approver receives notification. They review, edit if needed, and approve or reject.',
    actor: 'Finance Manager', time: 'Variable',
  },
  {
    id: 4, status: 'Approved',
    colorClass: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    borderClass: 'border-emerald-300 dark:border-emerald-700',
    dotClass: 'bg-emerald-500',
    icon: CheckCircle,
    title: 'Approved',
    description: 'Invoice locked after approval. Backend-controlled — status transitions are tamper-proof.',
    actor: 'Approver', time: 'Instant',
  },
  {
    id: 5, status: 'Syncing',
    colorClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    borderClass: 'border-blue-300 dark:border-blue-700',
    dotClass: 'bg-blue-500',
    icon: RefreshCw,
    title: 'Tally ERP Sync',
    description: 'Sync agent pushes the approved invoice to Tally as a purchase voucher with all ledger mappings.',
    actor: 'Sync Agent', time: '3–10 sec',
  },
  {
    id: 6, status: 'Payment Ready',
    colorClass: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400',
    borderClass: 'border-rose-300 dark:border-rose-700',
    dotClass: 'bg-rose-500',
    icon: CreditCard,
    title: 'Payment Scheduled',
    description: 'Finance team schedules payment. Confirmation updates both ModofX and Tally automatically.',
    actor: 'Finance Team', time: 'Per policy',
  },
  {
    id: 7, status: 'Completed',
    colorClass: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400',
    borderClass: 'border-teal-300 dark:border-teal-700',
    dotClass: 'bg-teal-500',
    icon: FileCheck,
    title: 'Completed & Archived',
    description: 'Invoice marked complete with full immutable audit trail stored for GST compliance.',
    actor: 'System', time: 'Instant',
  },
];

const processSteps = [
  { step: '01', title: 'Connect Your Sources', description: 'Link email inboxes, WhatsApp, Google Drive, and other invoice sources. ModofX monitors them 24/7.', icon: Zap },
  { step: '02', title: 'AI Processes Invoices', description: 'Our AI engine reads every document, extracts structured data, and flags anomalies automatically.', icon: Scan },
  { step: '03', title: 'Your Team Approves', description: 'Reviewers get notified. They approve, reject, or request changes with one click from any device.', icon: CheckCircle },
  { step: '04', title: 'Auto-Sync to Tally', description: 'Approved invoices flow into Tally ERP as vouchers, ready for payment and reconciliation.', icon: RefreshCw },
];

export default function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % lifecycleSteps.length);
    }, 1800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const handleStepClick = (i: number) => {
    setActiveStep(i);
    setRunning(false);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 mb-4">How It Works</div>
          <h1 className="section-heading text-5xl mb-6">From Invoice to Tally in Minutes, Not Days</h1>
          <p className="section-subheading text-xl">
            A fully automated, audit-safe pipeline that handles every step of invoice processing — from receipt to reconciliation.
          </p>
        </div>
      </section>

      {/* Process overview */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-neutral-200 dark:bg-neutral-700" />
                )}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 text-white mb-4 shadow-lg shadow-brand-500/20">
                    <step.icon className="w-7 h-7" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 border-2 border-brand-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-brand-600">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Lifecycle Diagram */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Interactive Invoice Lifecycle</h2>
            <p className="section-subheading">
              Click any stage to explore it. Or watch the automated pipeline run live.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => setRunning(r => !r)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  running
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    : 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                }`}
              >
                {running ? '⏸ Pause Animation' : '▶ Play Animation'}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Step selector — vertical list */}
            <div className="space-y-2">
              {lifecycleSteps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    activeStep === i
                      ? `${step.borderClass} ${step.colorClass} shadow-md scale-[1.01]`
                      : 'border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    activeStep === i ? 'bg-white/70 dark:bg-neutral-900/50' : 'bg-neutral-100 dark:bg-neutral-800'
                  }`}>
                    <step.icon className={`w-4 h-4 ${activeStep === i ? '' : 'text-neutral-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold opacity-60">Step {step.id}</span>
                      <span className={`badge text-xs ${step.colorClass} ${activeStep === i ? '' : 'opacity-0'}`}>
                        {step.status}
                      </span>
                    </div>
                    <span className="font-semibold text-sm">{step.title}</span>
                  </div>
                  {activeStep === i && (
                    <div className={`w-2 h-2 rounded-full ${step.dotClass} animate-pulse shrink-0`} />
                  )}
                </button>
              ))}
            </div>

            {/* Active step detail card */}
            <div className="lg:sticky lg:top-24">
              {(() => {
                const step = lifecycleSteps[activeStep];
                return (
                  <div key={step.id} className={`card p-8 border-2 ${step.borderClass} transition-all duration-300`}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${step.colorClass}`}>
                        <step.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className={`badge text-sm font-semibold mb-2 ${step.colorClass}`}>{step.status}</span>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                        <div className="text-xs text-neutral-400 mb-1">Actor</div>
                        <div className="text-sm font-semibold text-neutral-900 dark:text-white">{step.actor}</div>
                      </div>
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                        <div className="text-xs text-neutral-400 mb-1">Duration</div>
                        <div className="text-sm font-semibold text-neutral-900 dark:text-white">{step.time}</div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-neutral-400 mb-2">
                        <span>Pipeline Progress</span>
                        <span>{step.id} / {lifecycleSteps.length}</span>
                      </div>
                      <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${step.dotClass} transition-all duration-500`}
                          style={{ width: `${(step.id / lifecycleSteps.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                        className="btn-secondary text-sm py-2 flex-1 justify-center disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handleStepClick(Math.min(lifecycleSteps.length - 1, activeStep + 1))}
                        disabled={activeStep === lifecycleSteps.length - 1}
                        className="btn-primary text-sm py-2 flex-1 justify-center disabled:opacity-40"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Status Transition Table */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Backend-Controlled Status Transitions</h2>
            <p className="section-subheading">
              ModofX enforces strict rules. Users can only trigger transitions they are authorized for — the backend validates every change.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  {['From Status', 'To Status', 'Allowed By', 'Condition'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-neutral-500 dark:text-neutral-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {[
                  { from: 'Draft', to: 'Extracting', by: 'System', cond: 'Invoice file received' },
                  { from: 'Extracting', to: 'Pending Review', by: 'AI Engine', cond: 'Confidence > 90%' },
                  { from: 'Extracting', to: 'Manual Review', by: 'AI Engine', cond: 'Confidence < 90%' },
                  { from: 'Pending Review', to: 'Approved', by: 'Finance Manager', cond: 'All fields validated' },
                  { from: 'Pending Review', to: 'Rejected', by: 'Finance Manager', cond: 'Invalid or duplicate' },
                  { from: 'Approved', to: 'Syncing', by: 'Sync Agent', cond: 'Tally connection active' },
                  { from: 'Syncing', to: 'Payment Ready', by: 'System', cond: 'Tally voucher created' },
                  { from: 'Payment Ready', to: 'Completed', by: 'Finance Team', cond: 'Payment confirmed' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-3 px-4"><span className="px-2 py-1 rounded text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">{row.from}</span></td>
                    <td className="py-3 px-4"><span className="px-2 py-1 rounded text-xs font-medium bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">{row.to}</span></td>
                    <td className="py-3 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">{row.by}</td>
                    <td className="py-3 px-4 text-sm text-neutral-500 dark:text-neutral-400">{row.cond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Audit safety callout */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 border-l-4 border-accent-500 bg-accent-50/50 dark:bg-accent-900/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Audit-Safe by Design</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Every status change is recorded with a timestamp, actor identity, IP address, and reason. Records are immutable — even administrators cannot modify audit logs. Full compliance with GST audit requirements.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Immutable audit logs', 'GST compliance', 'SOC 2 aligned', 'Role-based access'].map(tag => (
                    <span key={tag} className="badge bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-neutral-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-heading mb-4">Ready to Set Up Your Pipeline?</h2>
          <p className="section-subheading mb-8">Connect your invoice sources and go live in under 30 minutes.</p>
          <button onClick={() => onNavigate('contact')} className="btn-primary text-base px-8 py-4">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
