"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM_KEY_PAIR = exports.PLATFORM_PUBLIC_KEY = void 0;
const bs58_1 = __importDefault(require("bs58"));
const web3_js_1 = require("@solana/web3.js");
exports.PLATFORM_PUBLIC_KEY = new web3_js_1.PublicKey("FfS6HXPCMU1NsVQciD66x7Q37gUdwZVviEdggZozES7a");
// const PLATFORM_PRIVATE_KEY = new PublicKey("BVpN4sMhVnRyNhG7F6soDHFBDQdJxFt3EqNoZz5X2eeeCrzwXNDD6xZH5foKuBDmhPuCWU1GwL7vxWVvkPP2G1v");
const uint8array = bs58_1.default.decode("BVpN4sMhVnRyNhG7F6soDHFBDQdJxFt3EqNoZz5X2eeeCrzwXNDD6xZH5foKuBDmhPuCWU1GwL7vxWVvkPP2G1v");
exports.PLATFORM_KEY_PAIR = web3_js_1.Keypair.fromSecretKey(uint8array);
