// 1 Questions erray
// 2 load all the question
// 3 next question function
// 4 finished the question length
// 5 correct answer
// 6 unchecked function
// 7 score function
// 8 reload the page

const quizBase = [
  {
    question: "What is the most used pogramming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "Javascript",
    correct: "d",
  },
  {
    question: "Who is the President of US?",
    a: "Florin Pop",
    b: "Donald Trump",
    c: "Joe Biden",
    d: "Ivan Saldano",
    correct: "c",
  },
  {
    question: "What does the HTML stand for?",
    a: "Hypertext MArkup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year Javascript was launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const questionText = document.getElementById("questionText");

const a_answer = document.getElementById("a_answer");
const b_answer = document.getElementById("b_answer");
const c_answer = document.getElementById("c_answer");
const d_answer = document.getElementById("d_answer");
const answers = document.querySelectorAll(".answer");

const quiz = document.getElementById("quiz");

const submit = document.getElementById("submit");

let currentQuiz = 0;

let score = 0;

function loadQuiz() {
  deselect();
  const firstQuiz = quizBase[currentQuiz];

  questionText.innerText = firstQuiz.question;

  a_answer.innerText = firstQuiz.a;
  b_answer.innerText = firstQuiz.b;
  c_answer.innerText = firstQuiz.c;
  d_answer.innerText = firstQuiz.d;

  selected();
}

loadQuiz();

function selected() {
  let answer = undefined;
  answers.forEach((ans) => {
    if (ans.checked) {
      answer = ans.id;
    }
  });

  return answer;
}
function deselect() {
  answers.forEach((ans) => {
    ans.checked = false;
  });
}
submit.addEventListener("click", () => {
  const answerFunc = selected();

  if (answerFunc) {
    if (answerFunc === quizBase[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizBase.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<div class="correct"><h2>You answered correctly at ${score}/ ${quizBase.length} questions.</h2>
      <button class="correctBtn" onClick="location.reload()">Reload</button>
      </div>`;
    }
  }
});
