const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: "Pacific"
    }
  ];
  
  const quizContainer = document.getElementById('quiz');
  const submitButton = document.getElementById('submit');
  const resultParagraph = document.getElementById('result');
  function generateQuiz() {
    questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.innerHTML = `
        <h3>Question   
   ${index + 1}: ${question.question}</h3>
        <ul>
          ${question.options.map(option => `<li style="list-style-type: none;"><input type="radio" name="q${index}" value="${option}"><label for="q${index}-${option}">${option}</label></li>`).join('')}
        </ul>
      `;
      quizContainer.appendChild(questionElement);
  
      const labels = questionElement.querySelectorAll('label');
      labels.forEach(label => {
        label.addEventListener('click', () => {
          const input = label.previousElementSibling;
          input.checked = true;
        });
      });
    });
  }
  
  function checkAnswers() {
    let score = 0;
    let hasUnansweredQuestions = false;
  
    questions.forEach((question, index) => {
      const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
      if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
        score++;
      } else if (!selectedAnswer) {
        hasUnansweredQuestions = true;
      }
    });
  
    if (hasUnansweredQuestions) {
      const confirmSubmit = confirm("You have unanswered questions. Are you sure you want to submit?");
      if (confirmSubmit) {
        resultParagraph.textContent = `You scored ${score} out of ${questions.length}`;
      }
    } else {
      resultParagraph.textContent = `You scored ${score} out of ${questions.length}`;
    }
  }
  
  generateQuiz();
  submitButton.addEventListener('click', checkAnswers);