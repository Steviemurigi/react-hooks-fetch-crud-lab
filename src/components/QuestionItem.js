import React from "react";

function QuestionItem({ question, onDeleteQuestion, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  // function handleChangeAnswer(){
  //   fetch(`http://localhost:4000/questions/${id}`,{
  //     method:"PATCH",
  //     headers:{
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       correctIndex: parseInt(correctIndex)
  //     })
  //   })
  //     .then((r) => r.json())
  //     .then((updatedAnswer => onUpdateItem(updatedAnswer) ))
  // }

  function handleOnAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value)
    onAnswerChange(id, newCorrectIndex);
  }

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteQuestion(question))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleOnAnswerChange}>{options}</select>
      </label>
      <button onClick ={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
