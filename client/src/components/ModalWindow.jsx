import { useState } from "react";
import QuizAnswer from "./QuizAnswer";
import QuizQuestion from "./QuizQuestion";
import MyButton from "./UI/button/MyButton";
import MyModal from "./UI/modal/MyModal";

export default function ModalWindow({ modalVisibl, setModalVisibl }) {
    const questions = [
        { title: 'Что такое Земля?', variants: ['планета', 'еда', 'оружие'], correct: 0 },
        { title: 'Их чего делают самолет?', variants: ['из бумаги', 'из дюр-алюминия', 'из подорожников'], correct: 1 },
        { title: 'В чем смысол жизни?', variants: ['мне то откуда занть', 'что-бы радоватся жизни', 'жизнь не имеет смысла'], correct: 0 },
    ]
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
    const question = questions[step];
    const checkVariant = function (index) {
        if (index === question.correct) {
            setCorrect(correct + 1)
        }
        setStep(step + 1);
    }

    return (
        <section className="modalSection" >
            <div className="wrapper">
                <h1>Модальное окно</h1>
                <MyButton onClick={() => setModalVisibl(true)}>Открыть</MyButton>
            </div>
            <MyModal modalVisibl={modalVisibl} setModalVisibl={setModalVisibl}>
                {step < questions.length ?
                    <QuizQuestion props={{ step, questions, question, checkVariant }} ></QuizQuestion>
                    :
                    <QuizAnswer props={{correct, questions, setStep, setCorrect}}></QuizAnswer>
                }
            </MyModal>
        </section>
    )
}