"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM_KEYPAIR = exports.PLATFORM_PUBLIC_KEY = exports.PLATFORM_FEE = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
exports.PLATFORM_FEE = 3;
exports.PLATFORM_PUBLIC_KEY = new web3_js_1.PublicKey("FfS6HXPCMU1NsVQciD66x7Q37gUdwZVviEdggZozES7a");
const decoded = bs58_1.default.decode("BVpN4sMhVnRyNhG7F6soDHFBDQdJxFt3EqNoZz5X2eeeCrzwXNDD6xZH5foKuBDmhPuCWU1GwL7vxWVvkPP2G1v");
exports.PLATFORM_KEYPAIR = web3_js_1.Keypair.fromSecretKey(decoded);
