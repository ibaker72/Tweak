-- GBP / Facebook / LinkedIn post drafts produced by the weekly GBP cron.
-- Stored as drafts for human review/publish from the admin UI.

CREATE TABLE IF NOT EXISTS gbp_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN (
    'seo-tip',
    'website-tip',
    'ai-automation-tip',
    'lead-generation-tip',
    'client-showcase'
  )),
  focus_city text,
  gbp_body text NOT NULL,
  facebook_body text NOT NULL,
  linkedin_body text NOT NULL,
  cta_button text CHECK (cta_button IN ('BOOK','LEARN_MORE','SIGN_UP','CALL','ORDER')),
  cta_url text,
  hashtags text[],
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','approved','published','archived')),
  published_at timestamptz,
  published_gbp_url text,
  published_facebook_url text,
  published_linkedin_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gbp_posts_status_idx ON gbp_posts(status);
CREATE INDEX IF NOT EXISTS gbp_posts_category_idx ON gbp_posts(category);
CREATE INDEX IF NOT EXISTS gbp_posts_created_idx ON gbp_posts(created_at DESC);

ALTER TABLE gbp_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin and team full access to gbp_posts"
  ON gbp_posts FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','team'))
  );
