
export default function QuizQuestion({props}) {

    return (
        <div className="quizSection">
            <div className="progress_bar">
                <div style={{ width: `${Math.round(props.step / props.questions.length * 100)}%` }}></div>
            </div>
            <h2>{props.question.title}</h2>
            <ul>
                {
                    props.question.variants.map((text, index) =>
                        <li key={text} onClick={() => props.checkVariant(index)}>{text}</li>
                    )
                }
            </ul>
        </div>
    )
}