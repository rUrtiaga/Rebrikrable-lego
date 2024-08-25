export class ApiManager {
  static getParts() {
    return fetch(`https://rebrickable.com/api/v3/lego/parts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
      },
    });
  }
  static getSetParts = async (set_num: string | string[]) => {
    return fetch(`https://rebrickable.com/api/v3/lego/sets/${set_num}/parts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
      },
    });
  };
  static getSets = async () => {
    return fetch("https://rebrickable.com/api/v3/lego/sets/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
      },
    });
  };

  static postToken = async (_data: { username: string; password: string }) => {
    const data = new URLSearchParams();
    data.append("username", _data.username);
    data.append("password", _data.password);

    return fetch("https://rebrickable.com/api/v3/users/_token/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
      },
      body: data,
    });
  };

  static getPartLists = async (session_token: string) => {
    return fetch(`https://rebrickable.com/api/v3/users/${session_token}/partlists/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
      },
    });
  };
}
