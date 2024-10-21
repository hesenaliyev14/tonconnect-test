// pages/index.js
import { useTonConnectUI, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "./header";

export default function Wallet() {
  const [walletInfo, setWalletInfo] = useState(null);
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();

  useEffect(() => {
    console.log("wallet" + wallet?.connectItems?.tonProof?.proof);
    tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        setWalletInfo(wallet);
      }
    });
  }, [tonConnectUI, wallet]);
  

  return (
    <>
      <Header />

      <div className="container mx-auto px-5 mt-5">
        <div className="w-full border p-5 text-center">
          {walletInfo ? (
            <p className="cursor-pointer" onClick={() => {
              window.navigator.clipboard.writeText(userFriendlyAddress);
              alert(`Адрес Скопирован '${userFriendlyAddress}'`)
            }}>Адрес: {userFriendlyAddress}</p>
          ) : (
            <p>Подключите кошелёк</p>
          )}
        </div>

        <Link href={"/transaction"} className="rounded border px-3 py-1 mt-2 block max-w-fit">Транзакции --</Link>
      </div>
    </>
  );
}