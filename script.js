const questionElement = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is the name of the main protagonist in "Naruto"?',
        choice1: 'Sasuke Uchiha',
        choice2: 'Kakashi Hatake',
        choice3: 'Naruto Uzumaki',
        choice4: 'Itachi Uchiha',
        answer: 3,
    },
    {
        question: 'In "One Piece", what is the name of the ship used by the Straw Hat Pirates?',
        choice1: 'Thousand Sunny',
        choice2: 'Going Merry',
        choice3: 'Red Force',
        choice4: 'Moby Dick',
        answer: 2,
    },
    {
        question: 'Who is the creator of the manga "Attack on Titan"?',
        choice1: 'Eiichiro Oda',
        choice2: 'Hajime Isayama',
        choice3: 'Akira Toriyama',
        choice4: 'Tite Kubo',
        answer: 2,
    },
    {
        question: 'Which anime features a character named "Goku"?',
        choice1: 'One Punch Man',
        choice2: 'Dragon Ball',
        choice3: 'Bleach',
        choice4: 'Death Note',
        answer: 2,
    },
    {
        question: 'In "My Hero Academia", what is the hero name of Izuku Midoriya?',
        choice1: 'Red Riot',
        choice2: 'Deku',
        choice3: 'Lemillion',
        choice4: 'Shoto',
        answer: 2,
    },
    {
        question: 'Which anime features a notebook that can kill anyone whose name is written in it?',
        choice1: 'Death Note',
        choice2: 'Naruto',
        choice3: 'Fullmetal Alchemist',
        choice4: 'Tokyo Ghoul',
        answer: 1,
    },
    {
        question: 'In "Sword Art Online", what is the name of the main protagonist?',
        choice1: 'Kirito',
        choice2: 'Asuna',
        choice3: 'Sinon',
        choice4: 'Leafa',
        answer: 1,
    },
];


// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
