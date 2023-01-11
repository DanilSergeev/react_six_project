import { useRef, useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";

let fixedTime = { hour: 0, minut: 0, sec: 0 }
export default function Countdown() {
    const timeRef = useRef(null);
    const [dialValue, setDialValue] = useState('00:00:00');

    const CountdownTimerFun = (dialValue) => {
        const setTimeEnd = dialValue.split(':');
        fixedTime = {
            hour: (Number(setTimeEnd[0]) * 1000 * 60 * 60),
            minut: (Number(setTimeEnd[1]) * 1000 * 60),
            sec: (Number(setTimeEnd[2]) * 1000)
        }

        let sum = (fixedTime.hour + fixedTime.minut + fixedTime.sec);
        const timer = setInterval(() => {
            sum = sum - 1000;
            const hour = (Math.floor((sum % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))));
            const minut = (Math.floor((sum % (1000 * 60 * 60)) / (1000 * 60)));
            const sec = (Math.floor((sum % (1000 * 60)) / 1000));
            timeRef.current.innerHTML = `Текущее время - ${hour}:${minut}:${sec}`;
            if (sum < 0) {
                clearInterval(timer)
                timeRef.current.innerHTML = `End`;
            }
        }, 1000)
    }

    return (
        <section className="countdownSeciton wrapper">
            <h1 ref={timeRef}>00:00:00</h1>
            <div className="dial">
                <MyInput step='1' type="time" value={dialValue} onChange={e => setDialValue(() => e.target.value)} />
                <MyButton onClick={() => CountdownTimerFun(dialValue)}>Запустьить</MyButton>
            </div>
        </section>
    )
}