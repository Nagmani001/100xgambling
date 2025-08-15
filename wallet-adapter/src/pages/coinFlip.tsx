//TODO: i can play a video of a person flipping the coin and based on heads or tails ,respective video plays 

import { useState } from "react";
import toast from "react-hot-toast";
import { Coins as Coin, PinOff as CoinOff } from 'lucide-react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import axios from "axios";
import Nav from "../components/nav";

const amounts = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
const PLATFORM_FEE = 3;
const PLATFORM_PUBLIC_KEY = new PublicKey("FfS6HXPCMU1NsVQciD66x7Q37gUdwZVviEdggZozES7a");
const BACKEND_URL = "http://localhost:3000";

export default function CoinFlip() {
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [amount, setAmount] = useState<number>(0.1);
  const wallet = useWallet();
  const { connection } = useConnection();


  return <div>
    <Nav />
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Choose Your Side</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSelectedSide('heads')}
            className={`p-4 rounded-lg ${selectedSide === 'heads'
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            <Coin className="w-12 h-12" />
            <span className="block mt-2">Heads</span>
          </button>
          <button
            onClick={() => setSelectedSide('tails')}
            className={`p-4 rounded-lg ${selectedSide === 'tails'
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            <CoinOff className="w-12 h-12" />
            <span className="block mt-2">Tails</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Select Amount</h3>
        <div className="grid grid-cols-3 gap-2">
          {amounts.map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`py-2 px-4 rounded ${amount === val
                ? 'bg-blue-600'
                : 'bg-gray-700 hover:bg-gray-600'
                }`}
            >
              {val} SOL
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={async () => {
          try {
            if (!wallet.publicKey || !selectedSide) {
              return;
            }
            const transaction = new Transaction();

            transaction.add(SystemProgram.transfer({
              fromPubkey: wallet.publicKey,
              toPubkey: PLATFORM_PUBLIC_KEY,
              lamports: amount * LAMPORTS_PER_SOL,
            }));
            const singnature = await wallet.sendTransaction(transaction, connection);
            const res = await axios.post(`${BACKEND_URL}/flip`, {
              singnature,
            });
            if (res.data.won) {
              toast.success("Congratulations, you won!");
            } else {
              toast.error("You lost!");
            }
          } catch (err) {

          } finally {
            setIsFlipping(false);
          }
        }}
        disabled={!selectedSide || isFlipping}
        className={`w-full py-3 px-6 rounded-lg text-lg font-semibold ${!selectedSide || isFlipping
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {isFlipping ? 'Flipping...' : 'Place Bet'}
      </button>

      <p className="text-sm text-gray-400 text-center">
        Platform fee: {PLATFORM_FEE}%
      </p>
    </div>


  </div>
}
