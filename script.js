const quesContent = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let questions = [
    {
        question: 'Who directed the movie "Interstellar"?',
        choice1: 'Christopher Nolan',
        choice2: 'Steven Spielberg',
        choice3: 'Quentin Tarantino',
        choice4: 'Martin Scorsese',
        answer: 1,
    },
    {
        question: 'In the movie "Invictus", who portrays the role of Nelson Mandela?',
        choice1: 'Will Smith',
        choice2: 'Denzel Washington',
        choice3: 'Morgan Freeman',
        choice4: 'Forest Whitaker',
        answer: 3,
    },
    {
        question: 'Which country is the setting for the movie "La Haine"?',
        choice1: 'United States',
        choice2: 'France',
        choice3: 'Italy',
        choice4: 'Germany',
        answer: 2,
    },
    {
        question: 'What is the English title of the French film "Intouchables"?',
        choice1: 'The Intouchables',
        choice2: 'Untouchable',
        choice3: 'Touching Lives',
        choice4: 'The Touchables',
        answer: 1,
    },
    {
        question: 'Who directed the movie "The Shape of Water"?',
        choice1: 'Guillermo del Toro',
        choice2: 'Alfonso Cuarón',
        choice3: 'Alejandro González Iñárritu',
        choice4: 'Pedro Almodóvar',
        answer: 1,
    },
];


let score = 0;
let quesNo = 0;
const correctMarks = 10;
let acceptingAnswers = false;

const start = () => {
    quesNo = 0;
    score = 0;
    nextQues();
};

const nextQues = () => {
    if (quesNo >= questions.length) {
        localStorage.setItem('mostRecentScore', score);
        window.location.href = 'end.html';
        return;
    }

    progressText.textContent = `Question ${quesNo + 1} out of ${questions.length}`;
    progressBarFull.style.width = `${((quesNo + 1) / questions.length) * 100}%`;

    currentQues = questions[quesNo];
    quesContent.textContent = currentQues.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.textContent = currentQues['choice' + number];
    });

    quesNo++;
    acceptingAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = choice;
        const selectedAnswer = selectedChoice.dataset['number'];
        const isCorrect = selectedAnswer == currentQues.answer;

        if (isCorrect) {
            updateScore(correctMarks);
        }
        const corrOrIncorr = isCorrect ? 'correct' : 'incorrect';
        selectedChoice.classList.add(corrOrIncorr);
        setTimeout(() => {
            selectedChoice.classList.remove(corrOrIncorr);
            nextQues();
        }, 600);
    });
});


const updateScore = num => {
    score += num;
    scoreText.textContent = score;
};

start();
