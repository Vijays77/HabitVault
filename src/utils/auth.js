export const loginWithToken = (token) => {
  localStorage.setItem("token", token);
};
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth";
};
export const isAuthed = () => !!localStorage.getItem("token");
