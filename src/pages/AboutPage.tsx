import { Target, Users, TrendingUp, ArrowRight, Shield, Briefcase } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const team = [
  {
    name: 'Vijaya Rekha D S',
    role: 'CEO & Co-Founder',
    avatar: '/rekha_pic.jpeg',
    bgWhite: true,
    bio: 'Vijaya Rekha exemplifies visionary leadership, committed to revolutionizing the accounting industry through technology and innovation. With over a decade of experience in IT solutions across ERP, retail, investment banking, and supply chain management, she brings a distinctive perspective to address critical accounting challenges — emphasizing accessibility, precision, and client-centric solutions.',
  },
  {
    name: 'Sarabjeet K',
    role: 'Chief Technology Officer',
    avatar: '/image.png',
    bgWhite: true,
    bio: 'Sarabjeet leads the development of AI-driven solutions for automating accounting workflows at ModofX. With a background in Computer Engineering (B.Tech) and deep expertise in software development and system architecture, she designs the intelligent systems that integrate AI, automation, and Tally ERP — making financial operations faster, smarter, and more reliable.',
  },
];

const milestones = [
  {
    year: '2025',
    period: 'Dec',
    title: 'Started the Journey',
    desc: 'ModofX was founded with a clear mission — simplify invoice processing using AI and eliminate the burden of manual accounting work for businesses across India.',
    current: false,
  },
  {
    year: '2026',
    period: 'Jan – Feb',
    title: 'Product Development',
    desc: 'Built the first version of our AI-powered invoice automation platform, incorporating OCR extraction, intelligent field mapping, and Tally ERP integration from the ground up.',
    current: false,
  },
  {
    year: '2026',
    period: 'Mar',
    title: 'Early Testing',
    desc: 'Tested the platform with real-world accounting scenarios across multiple industries, refining extraction accuracy, approval workflows, and Tally sync reliability.',
    current: false,
  },
  {
    year: '2026',
    period: 'Apr',
    title: 'Beta Launch',
    desc: 'Opened the product to early users and design partners, gathering hands-on feedback to sharpen usability, improve edge-case handling, and harden the audit trail.',
    current: false,
  },
  {
    year: '2026',
    period: 'Now',
    title: 'Growing & Improving',
    desc: 'Continuously enhancing AI capabilities, automation workflows, and integrations based on real user feedback. Building the future of accounting automation alongside our early adopters.',
    current: true,
  },
];

const values = [
  {
    icon: Target,
    title: 'Accuracy First',
    desc: 'We obsess over extraction accuracy because errors in accounting have real consequences for businesses.',
  },
  {
    icon: Shield,
    title: 'Built for Compliance',
    desc: 'Every feature is designed with Indian GST compliance and audit requirements at the core.',
  },
  {
    icon: Users,
    title: 'Customer Obsessed',
    desc: 'We embed ourselves in finance teams to deeply understand their workflows before building solutions.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Learning',
    desc: 'Our AI models improve with every invoice processed, getting smarter the more you use ModofX.',
  },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 mb-4">
            About ModofX
          </div>
          <h1 className="section-heading text-5xl mb-6">
            Building the Future of AI-Powered Accounting
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-3xl mx-auto">
            We started ModofX with one conviction — that accountants deserve better tools. Not another spreadsheet, not another manual process, but a genuinely intelligent platform that handles the repetitive work so finance teams can focus on what matters.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-heading mb-6">The Problem We Are Solving</h2>
              <div className="space-y-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <p>
                  Every day, thousands of Indian businesses manually type invoice data into Tally. Accountants spend 4–6 hours daily on data entry — hours that should be spent on analysis, compliance, and strategy.
                </p>
                <p>
                  Mistakes happen. Duplicates slip through. GST mismatches cause audit headaches. And when auditors arrive, nobody can reconstruct the full approval history.
                </p>
                <p>
                  <strong className="text-neutral-800 dark:text-neutral-200">ModofX eliminates all of this.</strong> Our AI reads invoices, maps them to Tally, enforces approval workflows, and maintains an immutable audit trail — automatically.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Team working"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">What We Believe In</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 mb-4">
                  <v.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Our Journey</h2>
            <p className="section-subheading">From a bold idea to a working platform — here is how ModofX came to life.</p>
          </div>
          <div className="relative">
            <div className="absolute left-20 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.title} className="flex gap-6">
                  <div className="w-20 shrink-0 text-right pt-4">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 block">{m.year}</span>
                    <span className="text-xs text-neutral-400">{m.period}</span>
                  </div>
                  <div className="relative flex-1">
                    <div className={`absolute -left-[1.35rem] top-5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-neutral-900 ${m.current ? 'bg-accent-500 shadow-lg shadow-accent-500/40' : 'bg-brand-600'}`} />
                    <div className={`card p-5 ml-4 hover:shadow-md transition-shadow ${m.current ? 'border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-neutral-900 dark:text-white">{m.title}</h3>
                        {m.current && (
                          <span className="badge bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse inline-block" />
                            Present
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-4">Meet the Founders</h2>
            <p className="section-subheading">The people driving ModofX's mission to transform accounting through AI.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map(member => (
              <div key={member.name} className="card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Photo area — white background as requested */}
                <div className="bg-white flex items-center justify-center pt-8 pb-6 px-8">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 rounded-2xl object-cover object-top shadow-md border-4 border-white"
                  />
                </div>
                {/* Info */}
                <div className="p-6 pt-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-0.5">{member.name}</h3>
                  <div className="text-sm font-semibold text-brand-600 dark:text-brand-400 mb-4">{member.role}</div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-brand-600 dark:bg-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Early Stage, Big Ambitions</h2>
            <p className="text-brand-200 text-sm mt-2">We are at the beginning of something significant.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 'Dec 2025', label: 'Founded' },
              { value: 'Beta', label: 'Current Stage' },
              { value: 'Chennai', label: 'Headquartered' },
              { value: '99.7%', label: 'OCR Accuracy' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-brand-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-5">
            <Briefcase className="w-7 h-7 text-neutral-400 dark:text-neutral-500" />
          </div>
          <h2 className="section-heading mb-3">Careers at ModofX</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
            No positions are listed at this time. We are a small, focused founding team building in stealth mode. If you are genuinely passionate about AI and accounting automation, we would still love to hear from you.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="btn-secondary px-8 py-3"
          >
            Send us a note
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="section-heading mb-4">Want to Shape the Future With Us?</h2>
          <p className="section-subheading mb-8">
            We are actively working with early design partners. Join us and help define what AI accounting looks like.
          </p>
          <button onClick={() => onNavigate('contact')} className="btn-primary px-8 py-4">
            Become an Early Partner
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
