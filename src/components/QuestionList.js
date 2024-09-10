import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([])
 

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then ((r) => r.json())
    .then ((data) => setQuestions(data))
  }, []);
  
  function handleNewQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  }
  
  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleNewAnswer(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex }),
  })
    .then((res) => res.json())
    .then((newQuestion) => {
      const newQuestions = questions.map((quiz) => {
        if (quiz.id === newQuestion.id) return newQuestion;
        return quiz;
      });
      setQuestions(newQuestions);
    });
}


  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
        <QuestionItem key={question.id} question={question} onDeleteQuestion ={handleDeleteQuestion} onAnswerChange={handleNewAnswer}/>
        ))}
         <QuestionForm onAddQuestion={handleNewQuestion}/>
      </ul>
    </section>
  );
}

export default QuestionList;
