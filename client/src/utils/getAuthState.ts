export const getAuthState = () => {
  const data = localStorage.getItem('auth');
  const auth = data? JSON.parse(data) : [];

  return {
    auth,
  }
}