import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Nav() {
  const [balance, setBalance] = useState(0);


  const { connection } = useConnection();
  const wallet = useWallet();
  useEffect(() => {
    const main = async () => {
      if (wallet.publicKey) {
        let bal = await connection.getBalance(wallet.publicKey);
        bal = bal / LAMPORTS_PER_SOL;
        setBalance(bal);
      }
    }
    main();
  }, [wallet, connection]);



  return <div className="flex justify-between p-2 shadow-2xl ">
    <div>Sol Flip</div>
    <div className="flex gap-x-2 justify-center items-center">
      <WalletMultiButton />
      <div className="font-semibold text-xl">Balance: {balance}    </div>
    </div>
  </div>

}
