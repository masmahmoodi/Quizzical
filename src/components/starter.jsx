import React, { useState } from "react"

export default function Starter(props) {
  const [onRunning, setOnRunning] = useState(false)

  async function handleClick() {
    setOnRunning(true) 
    await props.handleClick()
    setOnRunning(false) 
  }

  return (
    <>
      {onRunning ? ( 
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="blob-top"></div>
          <div className="starter">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button className="start-btn" onClick={handleClick}>
              Start Quiz
            </button>
          </div>
          <div className="blob-bottom"></div>
        </>
      )}
    </>
  )
}
