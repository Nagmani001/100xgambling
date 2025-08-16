"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM_KEYPAIR = exports.PLATFORM_PUBLIC_KEY = exports.PLATFORM_FEE = void 0;
require('dotenv').config();
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
exports.PLATFORM_FEE = 3;
exports.PLATFORM_PUBLIC_KEY = new web3_js_1.PublicKey(process.env.PLATFORM_PUBLIC_KEY || "");
const decoded = bs58_1.default.decode(process.env.PLATFORM_PRIVATE_KEY || "");
exports.PLATFORM_KEYPAIR = web3_js_1.Keypair.fromSecretKey(decoded);
