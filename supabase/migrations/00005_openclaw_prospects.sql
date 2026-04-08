-- OpenClaw: B2B prospecting engine
-- Stores outbound leads discovered via Google Places + website audits

CREATE TABLE IF NOT EXISTS prospects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  industry text NOT NULL,
  address text,
  city text,
  state text,
  phone text,
  website_url text,
  google_place_id text UNIQUE,
  google_rating numeric(2,1),
  google_review_count integer,
  status text DEFAULT 'new' CHECK (
    status IN ('new', 'crawled', 'qualified', 'contacted', 'converted', 'rejected')
  ),
  audit_score integer,
  audit_result_json jsonb,
  notes text,
  search_query text,
  crawled_at timestamptz,
  contacted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS prospects_industry_idx ON prospects(industry);
CREATE INDEX IF NOT EXISTS prospects_status_idx ON prospects(status);
CREATE INDEX IF NOT EXISTS prospects_audit_score_idx ON prospects(audit_score);
CREATE INDEX IF NOT EXISTS prospects_created_at_idx ON prospects(created_at DESC);

ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and team full access to prospects"
  ON prospects
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'team')
    )
  );
