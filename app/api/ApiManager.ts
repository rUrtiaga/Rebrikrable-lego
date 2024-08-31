import { PartPost } from "./apiTypes";

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

  static postToken(_data: { username: string; password: string }) {
    const data = new URLSearchParams();
    data.append("username", _data.username);
    data.append("password", _data.password);

    return fetch("https://rebrickable.com/api/v3/users/_token/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
      },
      body: data.toString(),
    });
  }

  static getPartLists = async (session_token: string) => {
    return fetch(
      `https://rebrickable.com/api/v3/users/${session_token}/partlists/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
        },
      }
    );
  };

  static postnewPartList = async (
    session_token: string,
    _data: { name: string; description?: string }
  ) => {
    const data = new URLSearchParams();
    data.append("name", _data.name);
    data.append("description", _data.description || "");

    return fetch(
      `https://rebrickable.com/api/v3/users/${session_token}/partlists/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
        },
        body: data.toString(),
      }
    );
  };

  static postPartsToPartList = async (
    session_token: string,
    _data: { list_id: string; listPart: PartPost[] }
  ) => {
    const fetchMethod = (part: PartPost) => {
      const data = new URLSearchParams();
      data.append("part_num", part.part_num);
      data.append("color_id", String(part.color_id));
      data.append("quantity", String(part.quantity));

      fetch(
        `https://rebrickable.com/api/v3/users/${session_token}/partlists/${_data.list_id}/parts/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
          },
          body: data.toString(),
        }
      );
    };

    //Due to the API is not working with JSON LIST FORMAT
    const promisesList = _data.listPart.map(fetchMethod);

    return Promise.all(promisesList);
  };

  static getPartListsDetail = async (session_token: string, id_partlist: string) => {
    return fetch(
      `https://rebrickable.com/api/v3/users/${session_token}/partlists/${id_partlist}/parts`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`,
        },
      }
    );
  };
}
