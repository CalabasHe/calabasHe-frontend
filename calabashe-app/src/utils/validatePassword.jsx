export const validatePassword = (password) => {
  const minLength = /.{8,}/;
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const symbol = /[!@#$%^&*(),.?":{}|<>]/;

  if (!minLength.test(password)) {
    return "Password must be at least 8 characters long.";
  }
  if (!uppercase.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!lowercase.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!symbol.test(password)) {
    return "Password must contain at least one symbol.";
  }
  return "";
};