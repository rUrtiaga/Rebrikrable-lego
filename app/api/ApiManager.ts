export class ApiManager {
    static getSetParts(set_num: string | string[]) {
        return fetch(`https://rebrickable.com/api/v3/lego/sets/${set_num}/parts`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`
            }
          });
    }
    static getSets = async () =>{
        return fetch('https://rebrickable.com/api/v3/lego/sets/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`
            }
          });
    }
}