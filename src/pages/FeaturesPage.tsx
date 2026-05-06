import { FileText, Brain, RefreshCw, Shield, Scan, Cpu, Database, Lock, Bell, Globe, CheckCircle, ArrowRight } from 'lucide-react';

interface FeaturesPageProps {
  onNavigate: (page: string) => void;
}

const featureGroups = [
  {
    category: 'Invoice Processing',
    icon: FileText,
    color: 'brand',
    features: [
      {
        icon: Scan,
        title: 'AI-Powered OCR Extraction',
        description: 'Automatically read and extract vendor name, invoice number, date, line items, GST breakdown, and total from any invoice — PDF, image, or email attachment.',
        bullets: ['Supports 50+ invoice formats', 'Multi-language recognition', 'Table extraction for line items', 'HSN/SAC code detection'],
      },
      {
        icon: Brain,
        title: 'Intelligent Field Mapping',
        description: 'AI learns your Tally ledger structure and automatically maps extracted fields to the correct accounts, cost centers, and tax categories.',
        bullets: ['Auto-learn from corrections', 'Custom mapping rules', 'GST input tax credit mapping', 'Multi-currency support'],
      },
    ],
  },
  {
    category: 'AI Document Generation',
    icon: Brain,
    color: 'emerald',
    features: [
      {
        icon: Cpu,
        title: 'Meeting-to-Document AI',
        description: 'Upload meeting recordings or transcripts and let ModofX AI generate purchase orders, expense reports, and approval requests automatically.',
        bullets: ['Audio & video transcription', 'Intent recognition', 'Structured document output', 'Approval workflow trigger'],
      },
      {
        icon: FileText,
        title: 'Smart Document Templates',
        description: 'Build reusable document templates that AI can fill in from any source — email, chat, or voice — to create consistent financial documents.',
        bullets: ['Drag-and-drop template builder', 'Variable field detection', 'Conditional logic support', 'E-signature ready'],
      },
    ],
  },
  {
    category: 'Tally ERP Integration',
    icon: RefreshCw,
    color: 'orange',
    features: [
      {
        icon: Database,
        title: 'Bi-Directional Tally Sync',
        description: 'Real-time sync agents connect ModofX with Tally ERP, pushing approved invoices as vouchers and pulling ledger data for reconciliation.',
        bullets: ['TDL-based sync agents', 'Voucher auto-creation', 'Ledger reconciliation', 'Error auto-correction'],
      },
      {
        icon: Globe,
        title: 'Multi-ERP Compatibility',
        description: 'Beyond Tally, connect with SAP, Zoho Books, QuickBooks, and other ERP systems through standardized API adapters.',
        bullets: ['REST API adapters', 'Webhook support', 'Custom connector SDK', 'ERP agnostic data model'],
      },
    ],
  },
  {
    category: 'Workflow & Compliance',
    icon: Shield,
    color: 'rose',
    features: [
      {
        icon: Lock,
        title: 'Audit-Safe Status Lifecycle',
        description: 'Backend-enforced status transitions (Draft → Submitted → Approved → Paid) with immutable audit logs that satisfy GST audit requirements.',
        bullets: ['Tamper-proof audit trail', 'Backend status control', 'Role-based transitions', 'GST audit compliance'],
      },
      {
        icon: Bell,
        title: 'Smart Notifications & Alerts',
        description: 'Configure threshold alerts for duplicate invoices, overdue payments, budget limits, and approval bottlenecks across all your entities.',
        bullets: ['Email & SMS alerts', 'In-app notifications', 'Escalation rules', 'Custom thresholds'],
      },
    ],
  },
];

const integrations = [
  'Tally ERP', 'Tally Prime', 'SAP B1', 'Zoho Books', 'QuickBooks', 'Google Drive',
  'Gmail', 'WhatsApp', 'Slack', 'Microsoft Teams', 'Dropbox', 'AWS S3',
];

export default function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  const colorMap: Record<string, string> = {
    brand: 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
  };
  const borderMap: Record<string, string> = {
    brand: 'border-brand-200 dark:border-brand-800',
    emerald: 'border-emerald-200 dark:border-emerald-800',
    orange: 'border-orange-200 dark:border-orange-800',
    rose: 'border-rose-200 dark:border-rose-800',
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 mb-4">
            Platform Features
          </div>
          <h1 className="section-heading text-5xl mb-6">
            Powerful Features for Modern Finance Teams
          </h1>
          <p className="section-subheading text-xl">
            ModofX combines AI, automation, and deep ERP integration to eliminate every manual step in your accounting workflow.
          </p>
        </div>
      </section>

      {/* Feature Groups */}
      {featureGroups.map(group => (
        <section key={group.category} className="py-20 odd:bg-white dark:odd:bg-neutral-900 even:bg-neutral-50 dark:even:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-12">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[group.color]}`}>
                <group.icon className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{group.category}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {group.features.map(feature => (
                <div key={feature.title} className={`card p-8 border-l-4 ${borderMap[group.color]} hover:shadow-lg transition-shadow`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${colorMap[group.color]}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-5">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="w-4 h-4 text-accent-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Integrations */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Connects With Your Existing Stack</h2>
            <p className="section-subheading">ModofX integrates seamlessly with the tools your finance team already uses.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map(name => (
              <div
                key={name}
                className="px-5 py-2.5 card text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600 dark:hover:text-brand-400 transition-all cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-heading mb-4">See All Features in Action</h2>
          <p className="section-subheading mb-8">
            Schedule a personalized demo and see how ModofX transforms your accounting operations.
          </p>
          <button onClick={() => onNavigate('contact')} className="btn-primary text-base px-8 py-4">
            Request a Demo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
