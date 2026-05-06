import { X, ChevronRight, CheckCircle, XCircle, RefreshCw, Clock, FileText, Calendar, Hash, Building2, DollarSign, AlertCircle } from 'lucide-react';
import { Invoice, InvoiceStatus } from '../lib/supabase';

interface Props {
  invoice: Invoice;
  onClose: () => void;
  onStatusChange: (id: string, status: InvoiceStatus) => Promise<void>;
}

const statusConfig: Record<InvoiceStatus, { color: string; bg: string; next: InvoiceStatus[]; icon: React.ElementType }> = {
  Draft:          { color: 'text-neutral-600 dark:text-neutral-400', bg: 'bg-neutral-100 dark:bg-neutral-800', next: ['Extracting'], icon: FileText },
  Extracting:     { color: 'text-blue-700 dark:text-blue-400',       bg: 'bg-blue-100 dark:bg-blue-900/30',    next: ['Pending Review', 'Manual Review'], icon: RefreshCw },
  'Pending Review': { color: 'text-amber-700 dark:text-amber-400',   bg: 'bg-amber-100 dark:bg-amber-900/30', next: ['Approved', 'Rejected'], icon: Clock },
  'Manual Review':  { color: 'text-orange-700 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30', next: ['Pending Review', 'Rejected'], icon: AlertCircle },
  Approved:       { color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30', next: ['Syncing'], icon: CheckCircle },
  Rejected:       { color: 'text-red-700 dark:text-red-400',         bg: 'bg-red-100 dark:bg-red-900/30',     next: ['Draft'], icon: XCircle },
  Syncing:        { color: 'text-brand-700 dark:text-brand-400',     bg: 'bg-brand-100 dark:bg-brand-900/30', next: ['Payment Ready'], icon: RefreshCw },
  'Payment Ready':{ color: 'text-cyan-700 dark:text-cyan-400',       bg: 'bg-cyan-100 dark:bg-cyan-900/30',   next: ['Completed'], icon: DollarSign },
  Completed:      { color: 'text-teal-700 dark:text-teal-400',       bg: 'bg-teal-100 dark:bg-teal-900/30',   next: [], icon: CheckCircle },
};

const lifecycle: InvoiceStatus[] = ['Draft', 'Extracting', 'Pending Review', 'Approved', 'Syncing', 'Payment Ready', 'Completed'];

function statusIndex(s: InvoiceStatus) {
  const i = lifecycle.indexOf(s);
  return i === -1 ? 0 : i;
}

export default function InvoiceDetailPanel({ invoice, onClose, onStatusChange }: Props) {
  const cfg = statusConfig[invoice.status] ?? statusConfig['Draft'];
  const Icon = cfg.icon;
  const currentIdx = statusIndex(invoice.status);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-neutral-900 w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <div>
            <h2 className="font-bold text-neutral-900 dark:text-white">{invoice.invoice_number}</h2>
            <p className="text-xs text-neutral-400 mt-0.5">{invoice.vendor_name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className={`badge ${cfg.bg} ${cfg.color} font-semibold`}>
              <Icon className="w-3.5 h-3.5" />
              {invoice.status}
            </span>
            <span className="text-xs text-neutral-400">
              {new Date(invoice.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          {/* Lifecycle progress */}
          <div className="card p-4">
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">Lifecycle Progress</p>
            <div className="relative">
              <div className="absolute left-3 top-3.5 bottom-3.5 w-0.5 bg-neutral-200 dark:bg-neutral-700" />
              <div className="space-y-2">
                {lifecycle.map((step, i) => {
                  const done = i < currentIdx;
                  const active = i === currentIdx;
                  return (
                    <div key={step} className="flex items-center gap-3 relative">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        active ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' :
                        done ? 'bg-accent-500 text-white' :
                        'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                      }`}>
                        {done ? <CheckCircle className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                      </div>
                      <span className={`text-sm ${
                        active ? 'font-semibold text-neutral-900 dark:text-white' :
                        done ? 'text-neutral-600 dark:text-neutral-300' :
                        'text-neutral-400 dark:text-neutral-600'
                      }`}>
                        {step}
                      </span>
                      {active && <div className="ml-auto w-2 h-2 rounded-full bg-brand-500 animate-pulse" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="card p-4 space-y-3">
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">Invoice Details</p>
            {[
              { icon: Hash, label: 'Invoice No.', value: invoice.invoice_number },
              { icon: Building2, label: 'Vendor', value: invoice.vendor_name },
              { icon: DollarSign, label: 'Amount', value: `₹${Number(invoice.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` },
              { icon: DollarSign, label: 'GST', value: `₹${Number(invoice.gst_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` },
              { icon: Calendar, label: 'Invoice Date', value: invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—' },
              { icon: Calendar, label: 'Created', value: new Date(invoice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
            ].map(row => (
              <div key={row.label} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  <row.icon className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <div className="flex-1 flex justify-between gap-2">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{row.label}</span>
                  <span className="text-xs font-medium text-neutral-900 dark:text-white text-right">{row.value}</span>
                </div>
              </div>
            ))}
            {invoice.notes && (
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Notes</p>
                <p className="text-xs text-neutral-700 dark:text-neutral-300">{invoice.notes}</p>
              </div>
            )}
          </div>

          {/* Status Actions */}
          {cfg.next.length > 0 && (
            <div className="card p-4">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">Transition Status</p>
              <div className="space-y-2">
                {cfg.next.map(next => {
                  const nextCfg = statusConfig[next];
                  const NextIcon = nextCfg.icon;
                  return (
                    <button
                      key={next}
                      onClick={() => onStatusChange(invoice.id, next)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all hover:shadow-sm active:scale-[0.98] ${
                        next === 'Rejected'
                          ? 'border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400'
                          : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <NextIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Move to {next}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {invoice.status === 'Completed' && (
            <div className="flex items-center gap-2 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
              <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
              <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                Invoice fully processed and archived.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
