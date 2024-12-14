// Quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    correct: "Paris",
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correct: "JavaScript",
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "12", "7"],
    correct: "8",
  },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");

// Display the current question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Display options
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-button");
    button.onclick = () => selectAnswer(button, option);
    optionsContainer.appendChild(button);
  });

  nextButton.disabled = true;
}

// Handle answer selection
function selectAnswer(button, option) {
  const correctAnswer = quizData[currentQuestionIndex].correct;

  // Highlight correct and incorrect answers
  if (option === correctAnswer) {
    button.style.backgroundColor = "green";
    score++;
  } else {
    button.style.backgroundColor = "red";
    Array.from(optionsContainer.children).forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.style.backgroundColor = "green";
      }
    });
  }

  // Disable all buttons after selecting an answer
  Array.from(optionsContainer.children).forEach((btn) => {
    btn.disabled = true;
  });

  nextButton.disabled = false;
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Display the result
function showResult() {
  questionElement.style.display = "none";
  optionsContainer.style.display = "none";
  nextButton.style.display = "none";
  resultContainer.style.display = "block";

  resultElement.textContent = `You scored ${score} out of ${quizData.length}!`;
}

// Initialize the quiz
loadQuestion();
