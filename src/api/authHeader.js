const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo && userInfo.token) {
    return { Authorization: `Bearer ${userInfo.token}` };
  }

  return {};
};

export default getAuthHeader;
