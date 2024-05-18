import React, { useEffect } from "react"
import he from "he"    // for decoding questions 

export default function Question(props) {
  const [answers, setAnswers] = React.useState([])

  useEffect(() => {
    function gettingAnswers() {
      const answers = []
      answers.push(props.data.correct_answer);
      props.data.incorrect_answers.forEach(ans => {
        answers.push(ans)
      })
      answers.sort(() => Math.random() - 0.5)
      return answers
    }

    setAnswers(gettingAnswers())
  }, [props.data])

  const data = answers.map((ans, index) => {
    const id = `${props.name}-${index + 1}`

    return (
      <div
        className="button"
        key={index}
      >
        <input
          type="radio"
          name={props.name}
          id={id}
          value={ans}
          onChange={props.handleChange}
          checked={props.formData[props.name] === ans}
          disabled={props.answerStatus ? true : false}
        />
        <label htmlFor={id}
          className={`button ${ans===props.data.correct_answer && props.isSubmit ? "correct": ""}`}
          id={`${
              props.answerStatus === "correct" && ans === props.data.correct_answer
              ? "correct-answer"
              : props.answerStatus === "incorrect" && ans === props.formData[props.name]
              ? "wrong-answer"
              : ""
          }`}
        >{ans}</label>
      </div>
    )
  })

  return (
    <>
      <div className="form-data-container">
      <h1>{he.decode(props.data.question)}</h1>
        {data}
      </div>
      <hr />
    </>
  )
}
