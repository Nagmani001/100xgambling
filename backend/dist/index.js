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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("./config/utils");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const connection = new web3_js_1.Connection("https://api.devnet.solana.com");
app.post("/flip", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: what if i send the signature many times , i still make a bet for them 
    const signature = req.body.singnature;
    try {
        const ans = yield axios_1.default.post("https://api.devnet.solana.com", {
            jsonrpc: "2.0",
            id: 1,
            method: "getTransaction",
            params: [
                signature,
                {
                    commitment: "confirmed",
                    maxSupportedTransactionVersion: 0,
                    encoding: "json"
                }
            ]
        });
        const accounts = yield ans.data.result.transaction.message.accountKeys;
        const senderPublicKey = accounts[0];
        const receiverPublicKey = accounts[1];
        const preBalance = ans.data.result.meta.preBalances[1];
        const postBalance = ans.data.result.meta.postBalances[1];
        const amount = (postBalance - preBalance) / web3_js_1.LAMPORTS_PER_SOL;
        if (receiverPublicKey != utils_1.PLATFORM_PUBLIC_KEY || amount < 0.1 || !ans.data.result) {
            res.json({
                msg: "transaction failed ",
            });
            return;
        }
        const { blockhash } = yield connection.getLatestBlockhash();
        const winOrLoose = Math.random() < 0.5;
        console.log(winOrLoose);
        if (winOrLoose) {
            //TODO: what if this request to transfer solana to user fails 
            const transaction = new web3_js_1.Transaction({
                feePayer: utils_1.PLATFORM_PUBLIC_KEY,
                recentBlockhash: blockhash,
            });
            transaction.add(web3_js_1.SystemProgram.transfer({
                fromPubkey: utils_1.PLATFORM_PUBLIC_KEY,
                toPubkey: senderPublicKey,
                lamports: (amount * web3_js_1.LAMPORTS_PER_SOL) * 2
            }));
            yield connection.sendTransaction(transaction, [utils_1.PLATFORM_KEYPAIR]);
            console.log("you won");
            res.json({
                won: true,
                msg: "you won",
            });
        }
        else {
            console.log("you lost ");
            res.json({
                won: false,
                msg: "you lost"
            });
        }
    }
    catch (err) {
        console.log("error occured while sending rpc request", err);
    }
}));
app.post("/roulette", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const signature = req.body.signature;
    console.log("actual signature", signature);
    const selectedNumber = req.body.selectedNumber;
    try {
        const ans = yield axios_1.default.post("https://api.devnet.solana.com", {
            jsonrpc: "2.0",
            id: 1,
            method: "getTransaction",
            params: [
                signature,
                {
                    commitment: "confirmed",
                    maxSupportedTransactionVersion: 0,
                    encoding: "json"
                }
            ]
        });
        console.log(ans.data);
        const accounts = yield ans.data.result.transaction.message.accountKeys;
        const senderPublicKey = accounts[0];
        const receiverPublicKey = accounts[1];
        const preBalance = ans.data.result.meta.preBalances[1];
        const postBalance = ans.data.result.meta.postBalances[1];
        const amount = (postBalance - preBalance) / web3_js_1.LAMPORTS_PER_SOL;
        if (receiverPublicKey != utils_1.PLATFORM_PUBLIC_KEY || amount < 0.1 || !ans.data.result) {
            res.json({
                msg: "transaction failed ",
            });
            return;
        }
        const { blockhash } = yield connection.getLatestBlockhash();
        const randomNumber = Math.floor(Math.random() * 37);
        if (selectedNumber == randomNumber) {
            const transaction = new web3_js_1.Transaction();
            transaction.add(web3_js_1.SystemProgram.transfer({
                fromPubkey: utils_1.PLATFORM_PUBLIC_KEY,
                toPubkey: senderPublicKey,
                lamports: 10 * (amount / web3_js_1.LAMPORTS_PER_SOL),
            }));
            yield connection.sendTransaction(transaction, [utils_1.PLATFORM_KEYPAIR]);
            console.log("JACKPOT");
            res.json({
                number: randomNumber,
                msg: "won"
            });
        }
        else {
            console.log("you lost");
            res.json({
                number: randomNumber,
                msg: "lost"
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
