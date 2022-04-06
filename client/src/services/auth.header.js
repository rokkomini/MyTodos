// Retrieving token
//Test of token, else looka over x-access-token

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}