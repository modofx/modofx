import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- Types ----

export type InvoiceStatus =
  | 'Draft'
  | 'Extracting'
  | 'Pending Review'
  | 'Manual Review'
  | 'Approved'
  | 'Rejected'
  | 'Syncing'
  | 'Payment Ready'
  | 'Completed';

export interface Company {
  id: string;
  user_id: string;
  name: string;
  gstin: string;
  tally_connected: boolean;
  plan: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  company_id: string;
  invoice_number: string;
  vendor_name: string;
  amount: number;
  gst_amount: number;
  invoice_date: string | null;
  status: InvoiceStatus;
  notes: string;
  tally_voucher_id: string;
  created_at: string;
  updated_at: string;
  company?: Company;
}

export interface AuditLog {
  id: string;
  invoice_id: string;
  from_status: string;
  to_status: string;
  actor_id: string | null;
  reason: string;
  created_at: string;
}

export interface ContactLead {
  name: string;
  email: string;
  company: string;
  phone: string;
  plan: string;
  message: string;
}
