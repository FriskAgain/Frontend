const BASE_URL = "https://localhost:8081";

function getToken() {
  return localStorage.getItem("token");
}

async function request(endpoint, method = "GET", body = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}/api${endpoint}`, options);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  if (response.status === 204) return null;

  return response.json();
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/api/Account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.text();
}

export async function createModel(model) {
  return await request("/Models", "POST", model);
}

export async function getJobs() {
  return await request("/jobs");
}

export async function addExpense(jobId, amount, description) {
  return await request(`/jobs/${jobId}/expenses`, "POST", {
    amount,
    description,
  });
}

export async function createExpense(expenseDetails) {
  return await request(`/Expenses`, "POST", expenseDetails);
}

export async function getModelJobs(modelId) {
  return await request(`/Models/${modelId}/jobs`);
}