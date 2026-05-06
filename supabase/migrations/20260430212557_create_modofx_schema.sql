/*
  # ModofX Initial Schema

  ## Tables Created

  ### 1. `contact_leads`
  Stores demo requests and contact form submissions from the website.
  - `id` (uuid, primary key)
  - `name`, `email`, `company`, `phone`, `plan`, `message`
  - `created_at`

  ### 2. `companies`
  Multi-company entities managed by users.
  - `id`, `name`, `gstin`, `tally_connected`, `plan`

  ### 3. `invoices`
  Core invoice records with lifecycle status tracking.
  - Full metadata: vendor, amount, gst, date
  - `status` enforced as an enum
  - `company_id` foreign key

  ## Security
  - RLS enabled on all tables
  - `contact_leads`: public INSERT allowed (website form), no SELECT for anon
  - `companies` and `invoices`: only authenticated users can access their own data
*/

-- Contact leads (website form submissions)
CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  company text DEFAULT '',
  phone text DEFAULT '',
  plan text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact lead"
  ON contact_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Newsletter / waitlist signups
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'website',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for newsletter"
  ON newsletter_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Companies
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  gstin text DEFAULT '',
  tally_connected boolean DEFAULT false,
  plan text DEFAULT 'starter',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own companies"
  ON companies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own companies"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own companies"
  ON companies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  invoice_number text NOT NULL DEFAULT '',
  vendor_name text NOT NULL DEFAULT '',
  amount numeric(14,2) DEFAULT 0,
  gst_amount numeric(14,2) DEFAULT 0,
  invoice_date date,
  status text NOT NULL DEFAULT 'Draft'
    CHECK (status IN ('Draft','Extracting','Pending Review','Manual Review','Approved','Rejected','Syncing','Payment Ready','Completed')),
  notes text DEFAULT '',
  tally_voucher_id text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view invoices for their companies"
  ON invoices FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = invoices.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert invoices for their companies"
  ON invoices FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = invoices.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update invoices for their companies"
  ON invoices FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = invoices.company_id
      AND companies.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = invoices.company_id
      AND companies.user_id = auth.uid()
    )
  );

-- Audit log for invoice status transitions
CREATE TABLE IF NOT EXISTS invoice_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  from_status text DEFAULT '',
  to_status text NOT NULL DEFAULT '',
  actor_id uuid REFERENCES auth.users(id),
  reason text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE invoice_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view audit logs for their invoices"
  ON invoice_audit_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM invoices
      JOIN companies ON companies.id = invoices.company_id
      WHERE invoices.id = invoice_audit_log.invoice_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert audit logs for their invoices"
  ON invoice_audit_log FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM invoices
      JOIN companies ON companies.id = invoices.company_id
      WHERE invoices.id = invoice_audit_log.invoice_id
      AND companies.user_id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_invoices_company_id ON invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_invoice_id ON invoice_audit_log(invoice_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
