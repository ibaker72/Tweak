-- OpenClaw automation: outreach, deal pipeline, cron logs, unsubscribes
-- Extends 00005 prospects table with contact + pipeline fields

ALTER TABLE prospects ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS contact_name text;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS deal_stage text DEFAULT 'lead'
  CHECK (deal_stage IN ('lead','engaged','meeting','proposal','won','lost'));
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS deal_value_cents integer;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS last_outreach_at timestamptz;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS outreach_count integer DEFAULT 0;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS auto_enrolled boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS prospects_deal_stage_idx ON prospects(deal_stage);
CREATE INDEX IF NOT EXISTS prospects_last_outreach_idx ON prospects(last_outreach_at);
CREATE INDEX IF NOT EXISTS prospects_email_idx ON prospects(email);

-- Outreach log: each row is one send attempt
CREATE TABLE IF NOT EXISTS outreach (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  sequence_step integer NOT NULL DEFAULT 1,
  kind text NOT NULL CHECK (kind IN ('email_initial','email_followup_1','email_followup_2','manual_email','manual_note')),
  to_email text,
  subject text,
  body_text text,
  body_html text,
  resend_id text,
  status text NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued','sent','opened','clicked','replied','bounced','complained','unsubscribed','failed','skipped')),
  error text,
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  replied_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS outreach_prospect_idx ON outreach(prospect_id);
CREATE INDEX IF NOT EXISTS outreach_status_idx ON outreach(status);
CREATE INDEX IF NOT EXISTS outreach_created_idx ON outreach(created_at DESC);
CREATE INDEX IF NOT EXISTS outreach_resend_idx ON outreach(resend_id);

-- Unsubscribe list (global, by email)
CREATE TABLE IF NOT EXISTS outreach_unsubscribes (
  email text PRIMARY KEY,
  unsubscribed_at timestamptz DEFAULT now(),
  source text
);

-- Cron run log
CREATE TABLE IF NOT EXISTS cron_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job text NOT NULL,
  status text NOT NULL CHECK (status IN ('running','success','error')),
  stats jsonb,
  error text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE INDEX IF NOT EXISTS cron_runs_job_started_idx ON cron_runs(job, started_at DESC);

-- GEO landing page cache (programmatic SEO for city × industry pages)
CREATE TABLE IF NOT EXISTS geo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  state text NOT NULL,
  industry text NOT NULL,
  slug text NOT NULL UNIQUE,
  content jsonb NOT NULL,
  generated_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS geo_pages_slug_idx ON geo_pages(slug);
CREATE INDEX IF NOT EXISTS geo_pages_industry_idx ON geo_pages(industry);

-- RLS: admin/team only (same pattern as prospects)
ALTER TABLE outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_unsubscribes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cron_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo_pages ENABLE ROW LEVEL SECURITY;

-- geo_pages: public read (rendered on public landing pages), admin/team write
CREATE POLICY "Public read geo_pages"
  ON geo_pages FOR SELECT USING (true);

CREATE POLICY "Admin and team write geo_pages"
  ON geo_pages FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','team'))
  );

CREATE POLICY "Admin and team full access to outreach"
  ON outreach FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','team'))
  );

CREATE POLICY "Admin and team full access to unsubscribes"
  ON outreach_unsubscribes FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','team'))
  );

CREATE POLICY "Admin and team read cron_runs"
  ON cron_runs FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','team'))
  );
