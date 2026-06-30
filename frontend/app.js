const API_BASE = 'http://localhost:3000';
const output = document.getElementById('output');

function showResult(message) {
  output.textContent = JSON.stringify(message, null, 2);
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());
  try {
    const result = await request('/rest/onboardings/register', { method: 'POST', body: JSON.stringify(payload) });
    showResult(result);
  } catch (error) {
    showResult({ error: error.message });
  }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());
  try {
    const result = await request('/rest/onboardings/login', { method: 'POST', body: JSON.stringify(payload) });
    showResult(result);
  } catch (error) {
    showResult({ error: error.message });
  }
});

document.getElementById('reimbursementForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());
  payload.amount = Number(payload.amount);
  try {
    const result = await request('/rest/reimbursements', { method: 'POST', body: JSON.stringify(payload) });
    showResult(result);
  } catch (error) {
    showResult({ error: error.message });
  }
});

document.getElementById('healthBtn').addEventListener('click', async () => {
  try {
    const result = await request('/health');
    showResult(result);
  } catch (error) {
    showResult({ error: error.message });
  }
});

document.getElementById('reimbursementsBtn').addEventListener('click', async () => {
  try {
    const result = await request('/rest/reimbursements');
    showResult(result);
  } catch (error) {
    showResult({ error: error.message });
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  try {
    const result = await request('/rest/onboardings/logout', { method: 'POST' });
    showResult(result);
  } catch (error) {
    showResult({ error: error.message });
  }
});
