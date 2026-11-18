-- FactoryOps AI v1.0 schema. Run in Supabase SQL Editor as project owner.
create extension if not exists pgcrypto;
create table if not exists public.companies (
 id uuid primary key default gen_random_uuid(),
 name text not null check (char_length(name) between 2 and 120),
 created_at timestamptz not null default now()
);
create table if not exists public.company_members (
 company_id uuid not null references public.companies(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 role text not null default 'admin' check (role in ('admin','manager','operator','viewer')),
 created_at timestamptz not null default now(),
 primary key(company_id,user_id)
);
create table if not exists public.records (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 module text not null check (module in ('bom','production','quality','cost','maintenance')),
 title text not null check (char_length(title) between 1 and 240),
 status text not null default 'Open',
 record_date date not null default current_date,
 value numeric not null default 0,
 notes text not null default '',
 details jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists records_company_module_date_idx on public.records(company_id,module,record_date desc);
create index if not exists members_user_idx on public.company_members(user_id);
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.records enable row level security;
create or replace function public.is_company_member(cid uuid)
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.company_members m where m.company_id=cid and m.user_id=auth.uid()) $$;
create or replace function public.is_company_admin(cid uuid)
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.company_members m where m.company_id=cid and m.user_id=auth.uid() and m.role='admin') $$;
create or replace function public.create_company(company_name text)
returns uuid language plpgsql security definer set search_path=public
as $$ declare new_id uuid; begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 if char_length(trim(company_name))<2 or char_length(trim(company_name))>120 then raise exception 'Company name must be 2-120 characters'; end if;
 insert into public.companies(name) values(trim(company_name)) returning id into new_id;
 insert into public.company_members(company_id,user_id,role) values(new_id,auth.uid(),'admin');
 return new_id;
end $$;
grant execute on function public.create_company(text) to authenticated;
grant execute on function public.is_company_member(uuid) to authenticated;
create policy "Members can view their companies" on public.companies for select to authenticated using(public.is_company_member(id));
create policy "Members can view memberships in their companies" on public.company_members for select to authenticated using(public.is_company_member(company_id));
create policy "Admins can add members" on public.company_members for insert to authenticated with check(public.is_company_admin(company_id));
create policy "Members can read company records" on public.records for select to authenticated using(public.is_company_member(company_id));
create policy "Members can create company records" on public.records for insert to authenticated with check(public.is_company_member(company_id));
create policy "Members can update company records" on public.records for update to authenticated using(public.is_company_member(company_id)) with check(public.is_company_member(company_id));
create policy "Admins and managers can delete records" on public.records for delete to authenticated using(exists(select 1 from public.company_members m where m.company_id=records.company_id and m.user_id=auth.uid() and m.role in ('admin','manager')));
