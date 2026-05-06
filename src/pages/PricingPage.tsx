import { CheckCircle, X, ArrowRight, Zap, Shield, Users, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 2499,
    yearlyPrice: 1499,
    description: 'Perfect for small businesses taking their first step into invoice automation.',
    color: 'neutral',
    badge: 'Early Adoption',
    features: [
      { text: 'Up to 200 invoices/month', included: true },
      { text: '1 Tally ERP connection', included: true },
      { text: 'AI OCR extraction', included: true },
      { text: 'Basic approval workflow', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Audit trail (30 days)', included: true },
      { text: 'Multi-company dashboard', included: false },
      { text: 'Meeting-to-document AI', included: false },
      { text: 'Custom integrations', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Early Access',
    highlighted: false,
  },
  {
    name: 'Professional',
    monthlyPrice: 4999,
    yearlyPrice: 4999,
    description: 'For growing companies with multiple entities and complex workflows.',
    color: 'brand',
    badge: 'Most Popular',
    features: [
      { text: 'Up to 2,000 invoices/month', included: true },
      { text: 'Up to 5 Tally ERP connections', included: true },
      { text: 'AI OCR + intelligent mapping', included: true },
      { text: 'Multi-level approval workflow', included: true },
      { text: 'Email + Slack notifications', included: true },
      { text: 'Audit trail (1 year)', included: true },
      { text: 'Multi-company dashboard', included: true },
      { text: 'Meeting-to-document AI', included: true },
      { text: 'Custom integrations', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Early Access',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    yearlyPrice: null,
    description: 'Custom solutions for larger businesses with advanced compliance and multi-entity needs.',
    color: 'neutral',
    features: [
      { text: 'Unlimited invoices', included: true },
      { text: 'Unlimited ERP connections', included: true },
      { text: 'Advanced AI + custom models', included: true },
      { text: 'Custom approval workflows', included: true },
      { text: 'All notification channels', included: true },
      { text: 'Unlimited audit trail', included: true },
      { text: 'Multi-company dashboard', included: true },
      { text: 'Meeting-to-document AI', included: true },
      { text: 'Custom integrations + SDK', included: true },
      { text: 'Dedicated support + SLA', included: true },
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'What counts as an invoice?',
    answer: 'Any document processed through the OCR engine — purchase invoices, expense receipts, credit notes, or debit notes — counts as one invoice.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, downgrades apply at the next billing cycle.',
  },
  {
    question: 'Is Tally ERP setup included?',
    answer: 'Yes, we provide guided setup for Tally integration with our sync agents. Our team assists with the initial configuration at no extra charge.',
  },
  {
    question: 'What happens if I exceed my invoice limit?',
    answer: 'We will notify you when you approach your limit. Additional invoices are processed at a per-invoice overage rate, and you can upgrade anytime.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all plans include a 14-day free trial with no credit card required. You get full access to all features in your chosen plan.',
  },
  {
    question: 'How secure is my data?',
    answer: 'ModofX uses AES-256 encryption at rest and TLS 1.3 in transit. Your data is stored in ISO 27001 certified data centers in India.',
  },
];

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 mb-4">
            Pricing
          </div>
          <h1 className="section-heading text-5xl mb-6">Simple, Transparent Pricing</h1>
          <p className="section-subheading text-xl mb-10">
            Start free. Scale as you grow. No hidden fees, no long-term contracts required.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                billing === 'monthly'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billing === 'yearly'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              Annual
              <span className="px-2 py-0.5 bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-400 text-xs rounded-full font-semibold">
                Save 40%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tally note */}
          <div className="max-w-2xl mx-auto mb-10 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-center">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Note:</strong> All plans require an existing Tally ERP installation.{' '}
              <span className="text-amber-700 dark:text-amber-400">Don't have Tally yet?</span>{' '}
              <button
                onClick={() => onNavigate('contact')}
                className="underline font-semibold hover:no-underline"
              >
                We can set it up for you.
              </button>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-brand-600 text-white shadow-2xl shadow-brand-500/20 scale-[1.02]'
                    : 'card hover:shadow-lg'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-amber-400 text-amber-900 text-xs font-bold rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-brand-100' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {plan.description}
                </p>

                <div className="mb-8">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                          ₹{(billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice)?.toLocaleString()}
                        </span>
                        <span className={`text-sm ${plan.highlighted ? 'text-brand-200' : 'text-neutral-400'}`}>/mo</span>
                      </div>
                      {billing === 'yearly' && plan.monthlyPrice !== plan.yearlyPrice && (
                        <p className={`text-xs mt-1 ${plan.highlighted ? 'text-brand-200' : 'text-neutral-400'}`}>
                          Billed annually · Save ₹{((plan.monthlyPrice - plan.yearlyPrice!) * 12).toLocaleString()}/year
                        </p>
                      )}
                      {billing === 'yearly' && plan.monthlyPrice === plan.yearlyPrice && (
                        <p className={`text-xs mt-1 ${plan.highlighted ? 'text-brand-200' : 'text-neutral-400'}`}>
                          Early adoption rate
                        </p>
                      )}
                    </>
                  ) : (
                    <div className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                      Custom
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onNavigate('contact')}
                  className={`w-full py-3 rounded-xl font-semibold text-sm mb-8 transition-all active:scale-95 ${
                    plan.highlighted
                      ? 'bg-white text-brand-700 hover:bg-brand-50 shadow-lg'
                      : 'btn-primary justify-center'
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlighted ? 'text-brand-200' : 'text-accent-500'}`} />
                      ) : (
                        <X className={`w-4 h-4 shrink-0 ${plan.highlighted ? 'text-brand-400' : 'text-neutral-300 dark:text-neutral-600'}`} />
                      )}
                      <span className={`text-sm ${
                        !feature.included
                          ? plan.highlighted ? 'text-brand-300' : 'text-neutral-400 dark:text-neutral-600'
                          : plan.highlighted ? 'text-brand-50' : 'text-neutral-700 dark:text-neutral-300'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, title: 'Free Trial', desc: 'No credit card required' },
              { icon: Zap, title: 'Setup in 30 min', desc: 'Guided onboarding included' },
              { icon: Users, title: 'Early Beta', desc: 'Design partner spots open' },
              { icon: CheckCircle, title: 'Cancel anytime', desc: 'No lock-in contracts' },
            ].map(item => (
              <div key={item.title}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 mb-3">
                  <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">{item.title}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="card p-5 group cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-neutral-900 dark:text-white list-none">
                  <span>{faq.question}</span>
                  <HelpCircle className="w-4 h-4 text-neutral-400 shrink-0" />
                </summary>
                <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="section-heading mb-4">Not Sure Which Plan?</h2>
          <p className="section-subheading mb-8">Talk to our team and we will find the right fit for your business.</p>
          <button onClick={() => onNavigate('contact')} className="btn-primary text-base px-8 py-4">
            Talk to Sales
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
