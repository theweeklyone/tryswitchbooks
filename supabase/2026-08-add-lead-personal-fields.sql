-- Migration: add the extra personal / company fields captured by the review quiz.
-- Run this ONCE in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Safe to re-run: every statement uses IF NOT EXISTS.
--
-- Adds: date of birth, town, county, industry, and the list of limited-company
-- directorships (name + Companies House number) the quiz now collects.
-- last_name is included defensively in case an older table is missing it.

alter table public.leads add column if not exists last_name text;
alter table public.leads add column if not exists date_of_birth date;
alter table public.leads add column if not exists town text;
alter table public.leads add column if not exists county text;
alter table public.leads add column if not exists industry text;
alter table public.leads add column if not exists companies jsonb default '[]'::jsonb;
