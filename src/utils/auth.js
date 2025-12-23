// Save a new user to localStorage
export const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

// Login user by matching credentials
export const loginUser = (email, password) => {
  const users = getUsers();
  const match = users.find(u => u.email === email && u.password === password);
  if (match) {
    localStorage.setItem("loggedInUser", JSON.stringify(match));
    return true;
  }
  return false;
};

// Get the currently logged in user
export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("loggedInUser");
};
