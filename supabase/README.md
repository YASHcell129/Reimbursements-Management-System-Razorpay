# Supabase migration guide

## 1. Create a Supabase project
- Go to https://supabase.com and create a new project.
- Note your project URL and anon/service role keys.

## 2. Open the SQL Editor
- In Supabase dashboard, open SQL Editor.

## 3. Run the schema
- Copy the contents of [supabase/schema.sql](supabase/schema.sql) into the SQL Editor.
- Click Run.

## 4. Verify tables
Run this SQL in the SQL Editor:

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
```

You should see:
- users
- employee_manager
- reimbursements
- reimbursement_actions

## 5. Optional seed CFO user
You can insert a seed CFO manually:

```sql
insert into users (name, email, password_hash, role)
values ('CFO', 'cfo@org.com', '$2a$10$J8o8Qm3Q2sXwQY9Q6YpW9uA0f7Qv4Vw3Q1rN1Qf6Q8k2w7g2P8K7u', 'CFO')
on conflict (email) do nothing;
```

> Note: In a real project, use a proper hashed password generated from your backend.
