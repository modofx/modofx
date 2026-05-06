/*
  # Fix Security Issues

  ## Changes

  ### 1. Fix Mutable Search Path on `update_updated_at`
  Recreates the trigger function with `SET search_path = public` to prevent
  search_path hijacking attacks.

  ### 2. Tighten `contact_leads` INSERT Policy
  Replaces the always-true WITH CHECK with a constraint that validates the
  required fields (`name`, `email`) are non-empty strings and that `email`
  contains a basic email structure. This is still open to anon users (website
  form) but rejects empty or malformed submissions.

  ### 3. Tighten `newsletter_signups` INSERT Policy
  Replaces the always-true WITH CHECK with a constraint that validates the
  `email` column is non-empty and contains an `@` character (basic format
  guard). The row-level guard is enforced by the DB, not just the frontend.
*/

-- 1. Fix mutable search_path on trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Tighten contact_leads INSERT policy
DROP POLICY IF EXISTS "Anyone can submit a contact lead" ON contact_leads;

CREATE POLICY "Anon can insert contact lead with valid name and email"
  ON contact_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name))  > 0
    AND length(trim(email)) > 0
    AND email LIKE '%@%'
  );

-- 3. Tighten newsletter_signups INSERT policy
DROP POLICY IF EXISTS "Anyone can sign up for newsletter" ON newsletter_signups;

CREATE POLICY "Anon can insert newsletter signup with valid email"
  ON newsletter_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(email)) > 0
    AND email LIKE '%@%'
  );
