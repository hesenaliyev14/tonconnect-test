import { TonConnectButton, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const userFriendlyAddress = useTonAddress();
    const [balance, setBalance] = useState(null);
    const path = usePathname();

    const getBalance = async (address) => {
        try {
            const response = await fetch(`https://testnet.toncenter.com/api/v2/getAddressInformation?address=${address}`);
            const data = await response.json();
            return data.result.balance;
        } catch (error) {
            console.error('Ошибка при получении баланса:', error);
            return 0;
        }
    };

    useEffect(() => {
        if (userFriendlyAddress) {
            const fetchBalance = async () => {
                const balance = await getBalance(userFriendlyAddress);
                setBalance(balance);
            };
            fetchBalance();
        }
    }, [userFriendlyAddress]);


    const wallet = useTonWallet();
    return (
        <header className="p-5 border-b flex justify-between items-center">
            {
                path === "/transaction" ?
                    <Link href={"/"}>Назад</Link> :
                    <TonConnectButton />
            }
            <p>{`Баланс: ${balance} TON`}</p>
        </header>
    )
}