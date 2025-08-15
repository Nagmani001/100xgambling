import bs58 from "bs58";
import { Keypair, PublicKey } from "@solana/web3.js";

export const PLATFORM_PUBLIC_KEY = new PublicKey("FfS6HXPCMU1NsVQciD66x7Q37gUdwZVviEdggZozES7a");
// const PLATFORM_PRIVATE_KEY = new PublicKey("BVpN4sMhVnRyNhG7F6soDHFBDQdJxFt3EqNoZz5X2eeeCrzwXNDD6xZH5foKuBDmhPuCWU1GwL7vxWVvkPP2G1v");

const uint8array = bs58.decode("BVpN4sMhVnRyNhG7F6soDHFBDQdJxFt3EqNoZz5X2eeeCrzwXNDD6xZH5foKuBDmhPuCWU1GwL7vxWVvkPP2G1v");


export const PLATFORM_KEY_PAIR = Keypair.fromSecretKey(uint8array);

