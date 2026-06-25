-- Supabase schema migration for reimbursements management system

create table if not exists public.users (
  id bigserial primary key,
  name varchar(255) not null,
  email varchar(255) not null unique,
  password_hash varchar(255) not null,
  role varchar(20) not null default 'EMP' check (role in ('EMP', 'RM', 'APE', 'CFO')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.employee_manager (
  id bigserial primary key,
  employee_id bigint not null references public.users(id) on delete cascade,
  manager_id bigint not null references public.users(id) on delete restrict,
  assigned_at timestamptz default now(),
  unique (employee_id)
);

create table if not exists public.reimbursements (
  id bigserial primary key,
  employee_id bigint not null references public.users(id) on delete cascade,
  title varchar(255) not null,
  description text not null,
  amount numeric(12,2) not null check (amount > 0),
  final_status varchar(20) not null default 'PENDING' check (final_status in ('PENDING', 'RM_APPROVED', 'APPROVED', 'REJECTED')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reimbursement_actions (
  id bigserial primary key,
  reimbursement_id bigint not null references public.reimbursements(id) on delete cascade,
  approver_id bigint not null references public.users(id) on delete restrict,
  approver_role varchar(20) not null check (approver_role in ('RM', 'APE')),
  status varchar(20) not null check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  remarks text,
  action_date timestamptz default now()
);

create index if not exists idx_employee_manager_manager_id on public.employee_manager(manager_id);
create index if not exists idx_reimbursements_employee_id on public.reimbursements(employee_id);
create index if not exists idx_reimbursement_actions_reimbursement_id on public.reimbursement_actions(reimbursement_id);

select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
