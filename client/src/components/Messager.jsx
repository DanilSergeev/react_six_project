import { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from 'axios';
import { useEffect } from "react";

export default function Messager() {
    const [message, setMessage] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [servNoStarted, setServNoStarted] = useState(false);


    useEffect(() => {
        subscribe();
    }, [])


    const subscribe = async () => {
        try {
            
            const { data } = await axios.get('http://localhost:5000/get-message')
            if (data.messages) {
                setMessage(prev => [data, ...prev]);
            }
            await subscribe();
            setServNoStarted(() => false);
        } catch (e) {
            console.log(e)
            setServNoStarted(() => true);
            setTimeout(() => {
                subscribe();
            }, 500)
        }
    }

    const sendMassage = async () => {
        await axios.post('http://localhost:5000/create-message', {
            messages: inputValue,
            id: Date.now()
        })
    }

    return (
        <section className="massagerSection">
            {
                servNoStarted ?
                    <h1>Сервер не запущен</h1>
                    :
                    null
            }
            <div className="wrapper">
                <MyInput placeholder="Введите сообщение" value={inputValue} onChange={e => setInputValue(() => e.target.value)}></MyInput>
                <MyButton onClick={() => sendMassage()}>Отправить</MyButton>
            </div>
            {
                message.length ?
                    <ul className="wrapper">
                        {
                            message.map((title) =>
                                <li key={title.id}>{title.messages}</li>
                            )
                        }
                    </ul>
                    : <h1>Нет сообщений</h1>
            }
        </section>
    )
}