import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';

export const PLATFORM_FEE = 3;
export const PLATFORM_PUBLIC_KEY = new PublicKey("FfS6HXPCMU1NsVQciD66x7Q37gUdwZVviEdggZozES7a");
const decoded = bs58.decode("BVpN4sMhVnRyNhG7F6soDHFBDQdJxFt3EqNoZz5X2eeeCrzwXNDD6xZH5foKuBDmhPuCWU1GwL7vxWVvkPP2G1v");
export const PLATFORM_KEYPAIR = Keypair.fromSecretKey(decoded);
