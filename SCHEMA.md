# Reimbursements Management System Schema

## Overview
This schema supports user authentication, role-based access, employee-manager assignments, reimbursement requests, and approval history.

## Tables

### users
Stores all system users.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | SERIAL | PRIMARY KEY | Unique user identifier |
| name | VARCHAR(255) | NOT NULL | Full name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Login identifier; must end with @org.com |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| role | VARCHAR(20) | NOT NULL, CHECK | One of EMP, RM, APE, CFO |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Last update time |

### employee_manager
Maps each employee to exactly one reporting manager.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | SERIAL | PRIMARY KEY | Unique assignment identifier |
| employee_id | INTEGER | NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE | Employee reference |
| manager_id | INTEGER | NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE RESTRICT | Reporting manager reference |
| assigned_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Assignment timestamp |
| UNIQUE (employee_id) | | | Ensures one manager per employee |

### reimbursements
Stores reimbursement requests submitted by employees.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | SERIAL | PRIMARY KEY | Unique reimbursement identifier |
| employee_id | INTEGER | NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE | Requesting employee |
| title | VARCHAR(255) | NOT NULL | Short reimbursement title |
| description | TEXT | NOT NULL | Detailed description |
| amount | NUMERIC(12, 2) | NOT NULL, CHECK (amount > 0) | Requested amount |
| final_status | VARCHAR(20) | NOT NULL, CHECK | One of PENDING, RM_APPROVED, APPROVED, REJECTED |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Request created time |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Last update time |

### reimbursement_actions
Tracks every approval or rejection action taken on a reimbursement.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | SERIAL | PRIMARY KEY | Unique action identifier |
| reimbursement_id | INTEGER | NOT NULL, FOREIGN KEY REFERENCES reimbursements(id) ON DELETE CASCADE | The reimbursement being acted upon |
| approver_id | INTEGER | NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE RESTRICT | Person taking the action |
| approver_role | VARCHAR(20) | NOT NULL, CHECK | Approver role: RM or APE |
| status | VARCHAR(20) | NOT NULL, CHECK | One of PENDING, APPROVED, REJECTED |
| remarks | TEXT | | Optional comments from the approver |
| action_date | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Action timestamp |

## Notes
- New users register as EMP by default.
- CFO is seeded and cannot register through the public API.
- A reimbursement becomes APPROVED only after both RM and APE approve it.
- Each employee must report to exactly one RM.
