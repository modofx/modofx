import { useState, useRef, DragEvent } from 'react';
import { X, Upload, FileText, Loader2, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Invoice } from '../lib/supabase';

interface Props {
  onClose: () => void;
  onSave: (data: Partial<Invoice>) => Promise<Invoice | null>;
}

const emptyForm = {
  invoice_number: '',
  vendor_name: '',
  amount: '',
  gst_amount: '',
  invoice_date: '',
  notes: '',
};

export default function InvoiceUploadModal({ onClose, onSave }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleFile = (f: File) => {
    setFile(f);
    setExtracted(false);
    setExtracting(true);
    setError('');
    // Simulate AI OCR extraction (1.5s)
    setTimeout(() => {
      const randomAmount = (Math.random() * 100000 + 5000).toFixed(2);
      const gst = (parseFloat(randomAmount) * 0.18).toFixed(2);
      setForm({
        invoice_number: `INV-2024-${Math.floor(Math.random() * 9000 + 1000)}`,
        vendor_name: ['Apex Supplies Ltd', 'Metro Electricals', 'BizTech Software', 'FastFreight India'][Math.floor(Math.random() * 4)],
        amount: randomAmount,
        gst_amount: gst,
        invoice_date: new Date().toISOString().slice(0, 10),
        notes: '',
      });
      setExtracting(false);
      setExtracted(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const result = await onSave({
      invoice_number: form.invoice_number,
      vendor_name: form.vendor_name,
      amount: parseFloat(form.amount) || 0,
      gst_amount: parseFloat(form.gst_amount) || 0,
      invoice_date: form.invoice_date || null,
      notes: form.notes,
    });
    setSaving(false);
    if (result) {
      setSavedOk(true);
      setTimeout(onClose, 1200);
    } else {
      setError('Failed to save invoice. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Upload Invoice</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {savedOk ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-7 h-7 text-accent-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Invoice Saved!</h3>
              <p className="text-sm text-neutral-400">It will appear in your dashboard momentarily.</p>
            </div>
          ) : (
            <>
              {/* Drop zone */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                  dragOver
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : file
                    ? 'border-accent-400 bg-accent-50 dark:bg-accent-900/10'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-brand-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                {extracting ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                    <p className="text-sm font-medium text-brand-600 dark:text-brand-400">AI is extracting data...</p>
                    <p className="text-xs text-neutral-400">Reading invoice fields with OCR</p>
                  </div>
                ) : file ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{file.name}</p>
                      <p className="text-xs text-neutral-400">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); setFile(null); setExtracted(false); setForm(emptyForm); }}
                      className="ml-auto p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Drop invoice here or click to browse</p>
                    <p className="text-xs text-neutral-400">PDF, JPG, PNG supported</p>
                  </div>
                )}
              </div>

              {/* Extracted / manual form */}
              {(extracted || !file) && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {extracted && (
                    <div className="flex items-center gap-2 p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-accent-500 shrink-0" />
                      <span className="text-xs font-medium text-accent-700 dark:text-accent-400">
                        AI extracted the fields below. Review and save.
                      </span>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Invoice Number *</label>
                      <input name="invoice_number" required value={form.invoice_number} onChange={handleChange}
                        placeholder="INV-2024-0001"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Invoice Date</label>
                      <input type="date" name="invoice_date" value={form.invoice_date} onChange={handleChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Vendor Name *</label>
                    <input name="vendor_name" required value={form.vendor_name} onChange={handleChange}
                      placeholder="Vendor Company Name"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Amount (₹) *</label>
                      <input type="number" name="amount" required min="0" step="0.01" value={form.amount} onChange={handleChange}
                        placeholder="0.00"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">GST Amount (₹)</label>
                      <input type="number" name="gst_amount" min="0" step="0.01" value={form.gst_amount} onChange={handleChange}
                        placeholder="0.00"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Notes</label>
                    <textarea name="notes" rows={2} value={form.notes} onChange={handleChange}
                      placeholder="Any notes about this invoice..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center py-2.5 text-sm">
                      Cancel
                    </button>
                    <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 text-sm disabled:opacity-60">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Invoice'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
