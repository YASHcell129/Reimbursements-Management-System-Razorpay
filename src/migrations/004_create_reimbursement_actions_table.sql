CREATE TABLE IF NOT EXISTS reimbursement_actions (
  id SERIAL PRIMARY KEY,
  reimbursement_id INTEGER NOT NULL REFERENCES reimbursements(id) ON DELETE CASCADE,
  approver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  approver_role VARCHAR(20) NOT NULL CHECK (approver_role IN ('RM', 'APE')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  remarks TEXT,
  action_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
