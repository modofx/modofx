import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Calendar, Building, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const contactMethods = [
  { icon: Mail, title: 'Email Us', value: 'support@modofx.com', desc: 'We respond within 4 business hours' },
  { icon: Phone, title: 'Call Us', value: '+91 97899 25678', desc: 'Mon–Fri, 9am–6pm IST' },
  { icon: MapPin, title: 'Office', value: 'Chennai, Tamil Nadu', desc: 'Redhills, 600067' },
];

const emptyForm = { name: '', email: '', company: '', phone: '', plan: '', message: '' };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: dbError } = await supabase.from('contact_leads').insert([form]);

    setLoading(false);
    if (dbError) {
      setError('Something went wrong. Please try again or email us directly.');
    } else {
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 mb-4">
            Get in Touch
          </div>
          <h1 className="section-heading text-5xl mb-6">Let's Talk About Your Accounting Needs</h1>
          <p className="section-subheading text-xl">
            Whether you want a demo, have questions about pricing, or are ready to get started — we are here.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map(method => (
              <div key={method.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <method.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-0.5">{method.title}</h3>
                  <p className="font-medium text-brand-600 dark:text-brand-400 text-sm">{method.value}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-accent-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                      Thanks for reaching out. Our team will get back to you within 4 business hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm(emptyForm); }}
                      className="btn-secondary text-sm"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Request a Demo</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
                      Fill out the form and we will schedule a personalized walkthrough for your team.
                    </p>

                    {error && (
                      <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text" name="name" required value={form.name} onChange={handleChange}
                            placeholder="Rajesh Kumar"
                            className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                            Work Email *
                          </label>
                          <input
                            type="email" name="email" required value={form.email} onChange={handleChange}
                            placeholder="rajesh@company.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Company Name</label>
                          <input
                            type="text" name="company" value={form.company} onChange={handleChange}
                            placeholder="Apex Industries Pvt Ltd"
                            className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Phone Number</label>
                          <input
                            type="tel" name="phone" value={form.phone} onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Interested Plan</label>
                        <select
                          name="plan" value={form.plan} onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                        >
                          <option value="">Select a plan</option>
                          <option value="starter">Starter</option>
                          <option value="professional">Professional</option>
                          <option value="enterprise">Enterprise</option>
                          <option value="unsure">Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Message</label>
                        <textarea
                          name="message" rows={4} value={form.message} onChange={handleChange}
                          placeholder="Tell us about your current accounting setup and what you would like to automate..."
                          className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all resize-none"
                        />
                      </div>
                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                        ) : (
                          <><Send className="w-4 h-4" /> Send Message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">What to Expect</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Our demo calls are personalized to your use case.</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    '30-minute personalized walkthrough',
                    'Live OCR extraction demo with your invoices',
                    'Tally integration setup preview',
                    'Pricing tailored to your volume',
                    'Q&A with a product specialist',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-accent-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Quick Response</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Average response time under 2 hours during business hours.</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Enterprise Inquiries</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      For enterprise or custom deployments, email{' '}
                      <a href="mailto:support@modofx.com" className="text-brand-600 dark:text-brand-400 hover:underline">
                        support@modofx.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
