import { useState } from 'react';
import { Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('newsletter_signups').insert([{ email, source: 'homepage' }]);

    if (error) {
      if (error.code === '23505') {
        setStatus('success'); // Already subscribed — treat as success
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    } else {
      setStatus('success');
    }
  };

  return (
    <section className="py-20 bg-neutral-900 dark:bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-600/20 mb-5">
          <Mail className="w-6 h-6 text-brand-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Stay in the Loop</h2>
        <p className="text-neutral-400 text-sm mb-8">
          Get product updates, accounting automation tips, and Tally ERP insights — once a month, no spam.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-accent-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">You are on the list! We will be in touch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary py-3 px-6 whitespace-nowrap disabled:opacity-60"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 mt-3 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errorMsg}
          </div>
        )}
      </div>
    </section>
  );
}
