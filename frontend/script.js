const API = "http://16.171.155.103:5000/api";

if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("userId")) {
    window.location = "index.html";
  }
}

async function register() {
  await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      name: name.value,
      email: emailReg.value,
      password: passReg.value
    })
  });

  alert("Registered");

  document.getElementById("name").value = "";
  document.getElementById("emailReg").value = "";
  document.getElementById("passReg").value = "";
}

async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  // ❗ Handle errors properly
  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("userId", data.userId);
  window.location = "dashboard.html";
}

function logout() {
  localStorage.removeItem("userId");
  window.location = "index.html";
}

async function addTransaction() {
  await fetch(`${API}/transactions/add`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
      amount: amount.value,
      type: type.value,
      category: category.value
    })
  });

  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("type").value = "income";

  loadData();
}

async function loadData() {
  const res = await fetch(`${API}/transactions/${localStorage.getItem("userId")}`);
  const data = await res.json();

  let total = 0;
  list.innerHTML = "";

  data.forEach(t => {
    total += t.type === "income" ? t.amount : -t.amount;

    list.innerHTML += `
      <li>${t.type} - ₹${t.amount} (${t.category})
      <button onclick="deleteT('${t._id}')">X</button></li>
    `;
  });

  balance.innerText = "Balance: ₹" + total;
}

async function deleteT(id) {
  await fetch(`${API}/transactions/${id}`, { method: "DELETE" });
  loadData();
}

if (window.location.pathname.includes("dashboard")) {
  loadData();
}