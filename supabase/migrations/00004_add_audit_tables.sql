create table if not exists audit_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  url text not null,
  normalized_domain text not null,
  email text,
  business_name text,
  business_type text,
  city text,
  status text default 'pending' check (status in ('pending', 'scanning', 'complete', 'error')),
  email_captured boolean default false,
  error_message text
);

create table if not exists audit_results (
  id uuid default gen_random_uuid() primary key,
  audit_request_id uuid references audit_requests(id) on delete cascade,
  created_at timestamptz default now(),
  overall_score integer,
  performance_score integer,
  seo_score integer,
  conversion_score integer,
  trust_score integer,
  mobile_score integer,
  accessibility_score integer,
  categories_json jsonb,
  strengths_json jsonb,
  issues_json jsonb,
  quick_wins_json jsonb,
  recommendations_json jsonb,
  biggest_opportunity text,
  fastest_win text,
  raw_meta_json jsonb
);

create table if not exists audit_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  audit_request_id uuid references audit_requests(id),
  email text not null,
  business_name text,
  phone text,
  message text,
  source text default 'audit_gate',
  status text default 'new'
);

create index if not exists idx_audit_requests_domain on audit_requests(normalized_domain);
create index if not exists idx_audit_results_request on audit_results(audit_request_id);
create index if not exists idx_audit_leads_email on audit_leads(email);

-- Enable RLS
alter table audit_requests enable row level security;
alter table audit_results enable row level security;
alter table audit_leads enable row level security;

-- Public access policies (no auth needed for V1)
create policy "public_read_audit_requests" on audit_requests for select using (true);
create policy "public_insert_audit_requests" on audit_requests for insert with check (true);
create policy "public_read_audit_results" on audit_results for select using (true);
create policy "public_insert_audit_leads" on audit_leads for insert with check (true);
