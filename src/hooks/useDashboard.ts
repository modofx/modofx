import { useState, useCallback } from 'react';
import { Invoice, InvoiceStatus } from '../lib/supabase';

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'demo-1', company_id: 'demo', invoice_number: 'INV-2024-1142',
    vendor_name: 'Apex Supplies Ltd', amount: 245000, gst_amount: 44100,
    invoice_date: '2024-05-01', status: 'Completed', notes: 'Raw material procurement — May batch',
    tally_voucher_id: 'TLY-8821', created_at: '2024-05-01T08:10:00Z', updated_at: '2024-05-01T10:30:00Z',
  },
  {
    id: 'demo-2', company_id: 'demo', invoice_number: 'INV-2024-1141',
    vendor_name: 'Global Logistics Pvt', amount: 378500, gst_amount: 68130,
    invoice_date: '2024-04-30', status: 'Approved', notes: 'Intercity freight Q2 — April',
    tally_voucher_id: 'TLY-8810', created_at: '2024-04-30T14:00:00Z', updated_at: '2024-04-30T16:40:00Z',
  },
  {
    id: 'demo-3', company_id: 'demo', invoice_number: 'INV-2024-1140',
    vendor_name: 'CloudHost Enterprise', amount: 189999, gst_amount: 34200,
    invoice_date: '2024-04-30', status: 'Pending Review', notes: 'Annual infrastructure renewal',
    tally_voucher_id: '', created_at: '2024-04-30T11:00:00Z', updated_at: '2024-04-30T11:00:00Z',
  },
  {
    id: 'demo-4', company_id: 'demo', invoice_number: 'INV-2024-1139',
    vendor_name: 'Metro Electricals', amount: 134750, gst_amount: 24255,
    invoice_date: '2024-04-29', status: 'Completed', notes: 'Factory electrical upgrade phase 2',
    tally_voucher_id: 'TLY-8795', created_at: '2024-04-29T08:05:00Z', updated_at: '2024-04-29T16:00:00Z',
  },
  {
    id: 'demo-5', company_id: 'demo', invoice_number: 'INV-2024-1138',
    vendor_name: 'Vega Consulting', amount: 325000, gst_amount: 58500,
    invoice_date: '2024-04-29', status: 'Payment Ready', notes: 'Strategy & ERP consulting retainer',
    tally_voucher_id: 'TLY-8780', created_at: '2024-04-29T09:00:00Z', updated_at: '2024-04-29T17:00:00Z',
  },
  {
    id: 'demo-6', company_id: 'demo', invoice_number: 'INV-2024-1137',
    vendor_name: 'BizTech Software', amount: 210000, gst_amount: 37800,
    invoice_date: '2024-04-28', status: 'Syncing', notes: 'ERP module license Q2',
    tally_voucher_id: '', created_at: '2024-04-28T13:00:00Z', updated_at: '2024-04-28T13:01:00Z',
  },
  {
    id: 'demo-7', company_id: 'demo', invoice_number: 'INV-2024-1136',
    vendor_name: 'PrintPro Solutions', amount: 58400, gst_amount: 10512,
    invoice_date: '2024-04-28', status: 'Completed', notes: 'Brand collateral — 10k print run',
    tally_voucher_id: 'TLY-8765', created_at: '2024-04-28T10:20:00Z', updated_at: '2024-04-28T12:00:00Z',
  },
  {
    id: 'demo-8', company_id: 'demo', invoice_number: 'INV-2024-1135',
    vendor_name: 'Zeta Media Pvt Ltd', amount: 142000, gst_amount: 25560,
    invoice_date: '2024-04-27', status: 'Approved', notes: 'Digital marketing campaign April',
    tally_voucher_id: 'TLY-8752', created_at: '2024-04-27T12:00:00Z', updated_at: '2024-04-27T14:30:00Z',
  },
  {
    id: 'demo-9', company_id: 'demo', invoice_number: 'INV-2024-1134',
    vendor_name: 'FastFreight India', amount: 87000, gst_amount: 15660,
    invoice_date: '2024-04-27', status: 'Rejected', notes: 'Duplicate — matches INV-2024-1120',
    tally_voucher_id: '', created_at: '2024-04-27T07:30:00Z', updated_at: '2024-04-27T09:00:00Z',
  },
  {
    id: 'demo-10', company_id: 'demo', invoice_number: 'INV-2024-1133',
    vendor_name: 'Office Depot India', amount: 98600, gst_amount: 17748,
    invoice_date: '2024-04-26', status: 'Completed', notes: 'Furniture and workstation fitout',
    tally_voucher_id: 'TLY-8741', created_at: '2024-04-26T10:00:00Z', updated_at: '2024-04-26T14:00:00Z',
  },
  {
    id: 'demo-11', company_id: 'demo', invoice_number: 'INV-2024-1132',
    vendor_name: 'Reliance Infra Supplies', amount: 520000, gst_amount: 93600,
    invoice_date: '2024-04-25', status: 'Completed', notes: 'Construction materials Phase 3',
    tally_voucher_id: 'TLY-8730', created_at: '2024-04-25T09:00:00Z', updated_at: '2024-04-25T15:00:00Z',
  },
  {
    id: 'demo-12', company_id: 'demo', invoice_number: 'INV-2024-1131',
    vendor_name: 'Sharma & Sons Trading', amount: 163500, gst_amount: 29430,
    invoice_date: '2024-04-25', status: 'Approved', notes: 'Packaging materials bulk order',
    tally_voucher_id: 'TLY-8718', created_at: '2024-04-25T11:00:00Z', updated_at: '2024-04-25T13:00:00Z',
  },
  {
    id: 'demo-13', company_id: 'demo', invoice_number: 'INV-2024-1130',
    vendor_name: 'TechAxis Solutions', amount: 275000, gst_amount: 49500,
    invoice_date: '2024-04-24', status: 'Pending Review', notes: 'IT hardware procurement — 15 units',
    tally_voucher_id: '', created_at: '2024-04-24T10:00:00Z', updated_at: '2024-04-24T10:00:00Z',
  },
  {
    id: 'demo-14', company_id: 'demo', invoice_number: 'INV-2024-1129',
    vendor_name: 'Nirmaan Contractors', amount: 680000, gst_amount: 122400,
    invoice_date: '2024-04-23', status: 'Manual Review', notes: 'OCR confidence low — handwritten entries',
    tally_voucher_id: '', created_at: '2024-04-23T08:00:00Z', updated_at: '2024-04-23T08:05:00Z',
  },
  {
    id: 'demo-15', company_id: 'demo', invoice_number: 'INV-2024-1128',
    vendor_name: 'IndoAir Couriers', amount: 42500, gst_amount: 7650,
    invoice_date: '2024-04-22', status: 'Completed', notes: 'Express courier — regulatory documents',
    tally_voucher_id: 'TLY-8700', created_at: '2024-04-22T09:00:00Z', updated_at: '2024-04-22T11:00:00Z',
  },
  {
    id: 'demo-16', company_id: 'demo', invoice_number: 'INV-2024-1127',
    vendor_name: 'Greentek Industries', amount: 415000, gst_amount: 74700,
    invoice_date: '2024-04-21', status: 'Completed', notes: 'Solar panel installation Bay 4',
    tally_voucher_id: 'TLY-8685', created_at: '2024-04-21T10:00:00Z', updated_at: '2024-04-21T17:00:00Z',
  },
  {
    id: 'demo-17', company_id: 'demo', invoice_number: 'INV-2024-1126',
    vendor_name: 'AquaChem Pvt Ltd', amount: 92000, gst_amount: 16560,
    invoice_date: '2024-04-20', status: 'Extracting', notes: 'Chemical reagents — quality lab',
    tally_voucher_id: '', created_at: '2024-04-20T12:00:00Z', updated_at: '2024-04-20T12:02:00Z',
  },
  {
    id: 'demo-18', company_id: 'demo', invoice_number: 'INV-2024-1125',
    vendor_name: 'Delta Security Systems', amount: 175000, gst_amount: 31500,
    invoice_date: '2024-04-19', status: 'Approved', notes: 'CCTV and access control — HQ',
    tally_voucher_id: 'TLY-8670', created_at: '2024-04-19T09:00:00Z', updated_at: '2024-04-19T14:00:00Z',
  },
  {
    id: 'demo-19', company_id: 'demo', invoice_number: 'INV-2024-1124',
    vendor_name: 'Sunrise Catering', amount: 55000, gst_amount: 9900,
    invoice_date: '2024-04-18', status: 'Completed', notes: 'Quarterly all-hands event catering',
    tally_voucher_id: 'TLY-8658', created_at: '2024-04-18T10:00:00Z', updated_at: '2024-04-18T12:00:00Z',
  },
  {
    id: 'demo-20', company_id: 'demo', invoice_number: 'INV-2024-1123',
    vendor_name: 'Pioneer Pharma Dist', amount: 312000, gst_amount: 56160,
    invoice_date: '2024-04-17', status: 'Draft', notes: 'Awaiting vendor GST verification',
    tally_voucher_id: '', created_at: '2024-04-17T11:00:00Z', updated_at: '2024-04-17T11:00:00Z',
  },
  {
    id: 'demo-21', company_id: 'demo', invoice_number: 'INV-2024-1122',
    vendor_name: 'Prime Packaging Co', amount: 228000, gst_amount: 41040,
    invoice_date: '2024-04-16', status: 'Completed', notes: 'Corrugated box order — 5000 units',
    tally_voucher_id: 'TLY-8640', created_at: '2024-04-16T09:00:00Z', updated_at: '2024-04-16T15:00:00Z',
  },
  {
    id: 'demo-22', company_id: 'demo', invoice_number: 'INV-2024-1121',
    vendor_name: 'Skyline Architects', amount: 490000, gst_amount: 88200,
    invoice_date: '2024-04-15', status: 'Completed', notes: 'Office renovation phase 1 — final bill',
    tally_voucher_id: 'TLY-8625', created_at: '2024-04-15T08:00:00Z', updated_at: '2024-04-15T16:00:00Z',
  },
  {
    id: 'demo-23', company_id: 'demo', invoice_number: 'INV-2024-1120',
    vendor_name: 'FastFreight India', amount: 87000, gst_amount: 15660,
    invoice_date: '2024-04-14', status: 'Completed', notes: 'Inter-state freight batch April W2',
    tally_voucher_id: 'TLY-8610', created_at: '2024-04-14T10:00:00Z', updated_at: '2024-04-14T12:00:00Z',
  },
  {
    id: 'demo-24', company_id: 'demo', invoice_number: 'INV-2024-1119',
    vendor_name: 'NovaTech Hardware', amount: 145000, gst_amount: 26100,
    invoice_date: '2024-04-13', status: 'Approved', notes: 'Server rack and UPS units',
    tally_voucher_id: 'TLY-8600', created_at: '2024-04-13T11:00:00Z', updated_at: '2024-04-13T15:00:00Z',
  },
  {
    id: 'demo-25', company_id: 'demo', invoice_number: 'INV-2024-1118',
    vendor_name: 'Horizon Travels', amount: 68000, gst_amount: 12240,
    invoice_date: '2024-04-12', status: 'Pending Review', notes: 'Corporate travel Q1 reconciliation',
    tally_voucher_id: '', created_at: '2024-04-12T09:00:00Z', updated_at: '2024-04-12T09:00:00Z',
  },
];

export interface DashboardStats {
  total: number;
  pending: number;
  processed: number;
  totalValue: number;
}

function computeStats(invoices: Invoice[]): DashboardStats {
  return {
    total: invoices.length,
    pending: invoices.filter(i => ['Pending Review', 'Manual Review'].includes(i.status)).length,
    processed: invoices.filter(i => ['Completed', 'Approved', 'Payment Ready'].includes(i.status)).length,
    totalValue: invoices.reduce((sum, i) => sum + Number(i.amount), 0),
  };
}

export function useDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [stats, setStats] = useState<DashboardStats>(computeStats(MOCK_INVOICES));

  const updateStatus = useCallback(async (invoiceId: string, newStatus: InvoiceStatus) => {
    setInvoices(prev => {
      const next = prev.map(i =>
        i.id === invoiceId ? { ...i, status: newStatus, updated_at: new Date().toISOString() } : i
      );
      setStats(computeStats(next));
      return next;
    });
  }, []);

  const addInvoice = useCallback(async (data: Partial<Invoice>) => {
    const newInvoice: Invoice = {
      id: `demo-${Date.now()}`,
      company_id: 'demo',
      invoice_number: data.invoice_number ?? `INV-${Date.now()}`,
      vendor_name: data.vendor_name ?? '',
      amount: data.amount ?? 0,
      gst_amount: data.gst_amount ?? 0,
      invoice_date: data.invoice_date ?? null,
      status: 'Draft',
      notes: data.notes ?? '',
      tally_voucher_id: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setInvoices(prev => {
      const next = [newInvoice, ...prev];
      setStats(computeStats(next));
      return next;
    });
    return newInvoice;
  }, []);

  return {
    invoices,
    stats,
    loading: false,
    refresh: async () => {},
    updateStatus,
    addInvoice,
    companyId: 'demo',
  };
}
