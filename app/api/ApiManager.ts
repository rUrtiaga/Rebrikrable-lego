export class ApiManager {
    static getSets = async () =>{
      console.log(process.env);
        return fetch('https://rebrickable.com/api/v3/lego/sets/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `key ${process.env.EXPO_PUBLIC_TEST_API_REBRICKABLE}`
            }
          });
    }
}