let accessToken = "";

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const removeAccessToken = () => {
  accessToken = "";
};
