const quesContent = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let questions = [];
let score = 0;
let quesNo = 0;
const correctMarks = 10;
let acceptingAnswers = false;

const start = () => {
    quesNo = 0;
    score = 0;
    fetchQuestions();
};

const fetchQuestions = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        questions = data.results.map(formatQuestion);
        nextQues();
    } catch (error) {
        console.error('Error fetching questions:', error);
        // Handle error condition - show message to user, retry, etc.
    }
};

const formatQuestion = (questionData) => {
    const formattedQuestion = {
        question: he.decode(questionData.question),
        choice1: he.decode(questionData.incorrect_answers[0]),
        choice2: he.decode(questionData.incorrect_answers[1]),
        choice3: he.decode(questionData.incorrect_answers[2]),
        choice4: he.decode(questionData.correct_answer),
        answer: Math.floor(Math.random() * 4) + 1 // Randomly assign correct answer position
    };

    // Adjust choices so the correct answer is in the correct position
    const choices = [formattedQuestion.choice1, formattedQuestion.choice2, formattedQuestion.choice3, formattedQuestion.choice4];
    const correctChoice = choices.splice(3, 1)[0];
    choices.splice(formattedQuestion.answer - 1, 0, correctChoice);

    formattedQuestion.choice1 = choices[0];
    formattedQuestion.choice2 = choices[1];
    formattedQuestion.choice3 = choices[2];
    formattedQuestion.choice4 = choices[3];

    return formattedQuestion;
};

const nextQues = () => {
    if (quesNo >= questions.length) {
        localStorage.setItem('mostRecentScore', score);
        window.location.href = 'end.html';
        return;
    }

    progressText.textContent = `Question ${quesNo + 1} out of ${questions.length}`;
    progressBarFull.style.width = `${((quesNo + 1) / questions.length) * 100}%`;

    const currentQues = questions[quesNo];
    quesContent.textContent = currentQues.question;

    choices.forEach((choice, index) => {
        choice.textContent = currentQues['choice' + (index + 1)];
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
        const isCorrect = selectedAnswer == questions[quesNo - 1].answer.toString();

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
