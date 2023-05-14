import {useState} from 'react';

// Hooks used for user authentication with Tokens
function useToken() {

  function getToken() {
    const userToken = sessionStorage.getItem('token');
    return userToken && userToken;
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }
  return {
    setToken: saveToken,
    token,
    removeToken
  };
}

export default useToken;