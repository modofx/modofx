import { ArrowRight, Zap, FileText, Brain, BarChart3, Shield, RefreshCw, CheckCircle, TrendingUp, Users, Clock, Sparkles, Handshake, Rocket } from 'lucide-react';
import NewsletterSignup from '../components/NewsletterSignup';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: 'OCR Accuracy Rate', value: '99.7%', icon: TrendingUp },
  { label: 'Avg. Extraction Time', value: '< 5 sec', icon: Clock },
  { label: 'Invoice Fields Read', value: '20+', icon: FileText },
  { label: 'ERP Integrations', value: 'Tally+', icon: Users },
];

const features = [
  {
    icon: FileText,
    title: 'Invoice OCR Extraction',
    description: 'Automatically extract vendor, amount, GST, and line items from any invoice format using AI-powered OCR.',
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  },
  {
    icon: Brain,
    title: 'AI Document Generation',
    description: 'Turn meeting recordings and notes into structured financial documents and purchase orders instantly.',
    color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: RefreshCw,
    title: 'Tally ERP Sync',
    description: 'Bi-directional sync with Tally ERP via intelligent agents — no manual data entry ever again.',
    color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  },
  {
    icon: BarChart3,
    title: 'Real-time Tracking',
    description: 'Monitor every invoice across its lifecycle with live status updates, approvals, and audit trails.',
    color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
  },
  {
    icon: Shield,
    title: 'Audit-Safe Workflow',
    description: 'Backend-controlled status transitions ensure tamper-proof workflows with full audit logs.',
    color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  },
  {
    icon: Users,
    title: 'Multi-Company Dashboard',
    description: 'Manage multiple companies and entities from a single unified dashboard with role-based access.',
    color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
  },
];

const earlyAdopterPerks = [
  {
    icon: Sparkles,
    title: 'Shape the Product',
    desc: 'Your feedback directly influences what we build next. Early partners get a direct line to the founding team.',
  },
  {
    icon: Handshake,
    title: 'Founding Partner Pricing',
    desc: 'Lock in our lowest-ever pricing, permanently. Early adopters will never pay full price.',
  },
  {
    icon: Rocket,
    title: 'Priority Onboarding',
    desc: 'White-glove setup, including Tally configuration, handled personally by our team for every early partner.',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.1),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/30 dark:bg-brand-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-700 dark:text-brand-400 text-sm font-medium mb-8">
                <Zap className="w-3.5 h-3.5" />
                AI-Powered Accounting Automation
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white leading-tight tracking-tight mb-6 text-balance">
                Automate Your{' '}
                <span className="gradient-text">Tally ERP</span>{' '}
                Accounting with AI
              </h1>

              <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10 max-w-lg">
                ModofX extracts invoices, generates documents from meetings, tracks approval workflows, and syncs with Tally ERP — all on autopilot.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button onClick={() => handleNav('contact')} className="btn-primary text-base px-8 py-3.5">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => handleNav('how-it-works')} className="btn-secondary text-base px-8 py-3.5">
                  See How It Works
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
                {['No credit card required', 'Free 14-day trial', 'Tally ERP compatible'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative animate-fade-in hidden lg:block">
              <div className="relative card p-4 shadow-2xl shadow-brand-500/10">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">modofx — invoice-processor</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-400 shrink-0">01</span>
                    <span className="text-brand-500">const</span>
                    <span className="text-neutral-700 dark:text-neutral-300"> invoice = await </span>
                    <span className="text-accent-600 dark:text-accent-400">OCR.extract</span>
                    <span className="text-neutral-500">(file)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-accent-500 shrink-0" />
                    <span className="text-accent-700 dark:text-accent-400 text-xs">Extracted: INV-2024-0891 · ₹45,200 · GST 18%</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <RefreshCw className="w-4 h-4 text-brand-500 shrink-0 animate-spin" />
                    <span className="text-brand-700 dark:text-brand-400 text-xs">Syncing to Tally ERP...</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[
                      { label: 'Vendor', value: 'Apex Supplies' },
                      { label: 'Amount', value: '₹45,200' },
                      { label: 'Status', value: 'Approved' },
                    ].map(item => (
                      <div key={item.label} className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div className="text-xs text-neutral-400 mb-0.5">{item.label}</div>
                        <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 card px-3 py-2 shadow-lg animate-float">
                <div className="flex items-center gap-2 text-xs">
                  <Brain className="w-4 h-4 text-brand-500" />
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">AI Processing</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 card px-3 py-2 shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2 text-xs">
                  <Shield className="w-4 h-4 text-accent-500" />
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">Audit Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 mb-3">
                  <stat.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 mb-4">
              Core Features
            </div>
            <h2 className="section-heading mb-4">
              Everything You Need to Automate Accounting
            </h2>
            <p className="section-subheading">
              From invoice extraction to Tally sync, ModofX handles the entire accounting workflow end-to-end.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <div
                key={feature.title}
                className="card p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => handleNav('features')}
              className="btn-primary"
            >
              Explore All Features
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4">
                AI Automation
              </div>
              <h2 className="section-heading mb-6">
                AI That Understands Your Accounting Context
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                ModofX uses large language models fine-tuned on accounting workflows to intelligently extract, classify, and process financial documents with human-level accuracy.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Context-Aware OCR', desc: 'Understands invoice layouts across vendors, languages, and formats' },
                  { title: 'Smart Field Mapping', desc: 'Automatically maps extracted fields to your Tally ledger structure' },
                  { title: 'Anomaly Detection', desc: 'Flags duplicate invoices, unusual amounts, and missing fields' },
                  { title: 'Meeting Summaries', desc: 'Converts meeting transcripts into purchase orders and expense reports' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-900 dark:text-white">{item.title}: </span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="AI Processing Dashboard"
                className="rounded-2xl shadow-2xl shadow-neutral-900/10 w-full"
              />
              <div className="absolute -bottom-6 -left-6 card p-4 shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-accent-600" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">AI Confidence</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2 mb-2">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: '97%' }} />
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">97% extraction accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Adopters */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 mb-4">
              Early Access
            </div>
            <h2 className="section-heading mb-4">
              Join Our Early Design Partners
            </h2>
            <p className="section-subheading">
              We are currently working with early design partners to build the future of AI-powered accounting. Be one of the first to shape what ModofX becomes.
            </p>
          </div>

          {/* Quote banner */}
          <div className="card p-8 md:p-12 text-center border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50/60 to-accent-50/40 dark:from-brand-900/20 dark:to-accent-900/10 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <blockquote className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-white leading-relaxed max-w-3xl mx-auto mb-4">
              "We are shaping the future of AI accounting alongside our early adopters — and there is room for you."
            </blockquote>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              — Vijaya Rekha D S, CEO & Co-Founder, ModofX
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {earlyAdopterPerks.map(perk => (
              <div key={perk.title} className="card p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 mb-4">
                  <perk.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => handleNav('contact')} className="btn-primary px-8 py-4 text-base">
              Apply for Early Access
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-neutral-400 mt-3">Limited spots available for beta partners.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-600 dark:bg-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Automate Your Accounting?
          </h2>
          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
            Join our early adopters shaping the future of AI-powered accounting. We are onboarding design partners now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNav('contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNav('pricing')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all active:scale-95"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
