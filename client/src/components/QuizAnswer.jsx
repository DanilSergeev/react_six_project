import MyButton from "./UI/button/MyButton";

export default function QuizAnswer({ props }) {

    return (
        <div className="quizSection">
            <div className="progress_bar">
                <div style={{ width: `100%` }}></div>
            </div>
            <h2>Поздравляем! Вы прошли тест.</h2>
            <p>Правильно - {props.correct} из - {props.questions.length} вопросов</p>
            <MyButton onClick={() => (props.setStep(0), props.setCorrect(0))}>Пройти заново</MyButton>
        </div>
    )
}