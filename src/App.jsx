import React, { useEffect, useState } from "react"
import he from "he"
import Starter from "./components/starter"
import Question from "./components/Question"


export default function App() {
  // States
  const [isStart, setIsStart] = useState(false)
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    data1: "",
    data2: "",
    data3: "",
    data4: "",
    data5: "",
  })
  const [answerStatus, setAnswerStatus] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [onRunning, setOnRunning] = useState(false)

  // fetching data 
  async function fetchQuestions() {
    setOnRunning(true)
    const response = await fetch("https://opentdb.com/api.php?amount=5")
    const data = await response.json()
    setOnRunning(false) 
    return data.results
  }
// The start of game
  async function startButtonHandle() {
    const questions = await fetchQuestions()
    if (questions.length === 5) {
      setData(questions)
      setIsStart(true)
    }
  }
//  play again
  async function restartGame() {
    const questions = await fetchQuestions()
    if (questions.length === 5) {
      setData(questions)
      setIsStart(true)
      setFormData({
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        data5: "",
      })
      setAnswerStatus({})
      setIsSubmit(false)
      setCorrectAnswer(0)
    }
  }

  // submit logic
  function handleSubmit(event) {
    event.preventDefault()
    const answeredQuestions = Object.values(formData)
    let newCorrectAnswerCount = 0

    if (answeredQuestions.every((hasAnswer) => hasAnswer)) {
      const newAnswerStatus = {}
      data.forEach((item, index) => {
        const name = `data${index + 1}`
        const selectedAnswer = formData[name]
        if (selectedAnswer === item.correct_answer) {
          newAnswerStatus[name] = "correct"
          newCorrectAnswerCount++
        } else {
          newAnswerStatus[name] = "incorrect"
        }
      })
      setAnswerStatus(newAnswerStatus)
      setCorrectAnswer(newCorrectAnswerCount)
      setIsSubmit(true)
    }
  }


  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // passing questions and answers to Question component
  const dataArray = data.map((item, index) => (
    <Question
      handleChange={handleChange}
      name={`data${index + 1}`}
      data={item}
      key={index}
      formData={formData}
      answerStatus={answerStatus[`data${index + 1}`]}
      isSubmit={isSubmit}
    />
  ))

  return (
    <main>
      <div>
        {isStart ? (
          <div>
            <div className="blob-top-question"></div>
            {onRunning ? ( 
              <h2>Loading...</h2>
            ) : (
              <form onSubmit={handleSubmit}>
                {dataArray}
                {isSubmit ? (
                  <div className="play-again">
                    <h3>You scored {correctAnswer}/5 correct answers</h3>
                    <button className="start-btn" onClick={restartGame} type="button">
                      Play again
                    </button>
                  </div>
                ) : (
                  <div className="ans-btn">
                    <button className="start-btn">Check answers</button>
                  </div>
                )}
              </form>
            )}
            <div className="blob-bottom-question"></div>
          </div>
        ) : (
          <Starter handleClick={startButtonHandle} />
        )}
      </div>
    </main>
  )
}
