// SuperAdmin default account (always exists)
const superAdminAccount = { username: "super1", password: "pass123", baseRole: "superadmin" };

// Define role permissions
const roleAccess = {
  superadmin: ["superadmin", "admin", "user"],
  admin: ["admin"],
  user: ["user"]
};

function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const selectedRole = document.getElementById("role").value;

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  if (!accounts.some(acc => acc.username === superAdminAccount.username)) {
    accounts.push(superAdminAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts)); // make sure it's saved
  }

  const account = accounts.find(acc =>
    acc.username === username &&
    acc.password === password
  );

  if (!account) {
    alert("Invalid username or password.");
    return;
  }

  if (!roleAccess[account.baseRole].includes(selectedRole)) {
    alert(`You are not allowed to log in as ${selectedRole}.`);
    return;
  }
  
  localStorage.setItem("loggedInUser", account.username);
  localStorage.setItem("loggedInRole", selectedRole);



  if (selectedRole === "superadmin") {
    window.location.href = "superadmin_dashboard.html";
  } else if (selectedRole === "admin") {
    window.location.href = "admin_dashboard.html";
  } else if (selectedRole === "user") {
    window.location.href = "user_dashboard.html";
  }
}
