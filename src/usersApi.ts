const BASE_URL =
  "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data";

export const getUsersList = async (): Promise<Response> => {
  return fetch(`${BASE_URL}/users.json`);
};

export const getUserInfo = async (id: number): Promise<Response> => {
  return fetch(`${BASE_URL}/${id}.json`);
};
