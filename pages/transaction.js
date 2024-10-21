import { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useRouter } from 'next/router';
import Header from './header';

export default function Transaction() {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [notification, setNotification] = useState('');
    const [tonConnectUI] = useTonConnectUI();
    const router = useRouter();

    const handleTransaction = async () => {
        try {
            if (amount && recipient) {
                // Формируем транзакцию
                const transaction = {
                    validUntil: Date.now() + 5 * 60 * 1000,
                    messages: [
                        {
                            address: recipient,
                            amount: (parseFloat(amount) * 1e9).toString(),
                            payload: ''
                        }
                    ]
                };
                await tonConnectUI.sendTransaction(transaction);

                setNotification(`Транзакция на ${amount} TON к ${recipient} успешно обработана.`);
            } else {
                setNotification('Пожалуйста, введите сумму и адрес.');
            }
        } catch (error) {
            console.error('Ошибка при отправке транзакции:', error);
            setNotification('Ошибка при обработке транзакции.');
        }
    };

    return (
        <div>
            <Header />

            <div className='mt-5 p-2.5 text-center flex flex-col gap-2 bg-[#f0f0f0] rounded-xl mx-5'>
                <input
                    type="number"
                    placeholder="Количество TON"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className='p-2.5 rounded-md w-full text-black'
                />
                <input
                    type="text"
                    placeholder="Адрес получателя"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className='p-2.5 rounded-md w-full text-black'
                />
                <button onClick={handleTransaction} className='p-2.5 rounded-md bg-[#0070f3] text-white max-w-fit ml-auto'>
                    Отправить
                </button>

                {notification && <p className='mt-2 text-green-400'>{notification}</p>}
            </div>
        </div>
    );
}