import Question from "./Question.js";
import Quiz from "./Quiz.js";

//revealing module pattern
const App = (function(){

    const quizElemnet = document.querySelector('.quiz');
    const quizQuestionElement = document.querySelector('.quiz__question');
    const trackerElement = document.querySelector('.quiz__tracker');
    const tagLineElement = document.querySelector('.quiz__tagline');
    const choicesElement = document.querySelector('.quiz__choices');
    const progressInnerElement = document.querySelector('.progress__inner');
    const nextButtonElement = document.querySelector('.next');
    const restartButtonElement = document.querySelector('.restart');

    const q1 = new Question(
        "When was Javascript created?",
        ["June 1995", "May 1995", "April 1989", "September 2000"],
        1);

    const q2 = new Question(
        "What does CSS stand for?",
        ["County State Service", "Cascading Style Sheets", "Cascading Slimy Sheets","Cross Cross Scripting"],
        1);

    const q3 = new Question(
        "Console.log(type of [] would return what?)",
        ["array", "List", "Object", "null"],
        2);

    const q4 = new Question(
        "React is a ?",
        ["Framework", "Library", "New Language", "Replacement for JQuery"],
        0);

    const q5 = new Question(
        "Javascript server side is know as ?",
        ["Go", "Scala", "Rust","NodeJs"],
        3);


    const quiz = new Quiz([q1, q2, q3, q4, q5]);

    const renderQuestion = () => {
        const question = quiz.getCurrentQuestion().question;
        quizQuestionElement.textContent = question;
    }


    const renderChocies = () => {
        const choices = quiz.getCurrentQuestion().choices;
        let htmlMarkup = "";

        choices.forEach((choice, i) => {
            htmlMarkup += `
                <li class="quiz__choice">
                        <input type="radio" name="choice" class="quiz__input" id="choice${i}" data-index=${i} >
                        <label for="choice${i}" class="quiz__label">
                            <i></i>
                            <span>${choice}</span>
                        </label>
                 </li>
            `
        })

        choicesElement.textContent = "";
        choicesElement.insertAdjacentHTML("beforeend", htmlMarkup);
    }


    const renderTracker = () => {
        const position = quiz.currentIndex + 1;
        const total = quiz.questions.length;
        trackerElement.textContent = `${position} of ${total}`;

    }


    const renderProgressBar = () => {
        const index = quiz.currentIndex;
        const total = quiz.questions.length;
        progressInnerElement.style.width = `0%`;
        progressInnerElement.style.width = `${Math.round((index / total) * 100)}%`;
    }

    const listeners = () => {
        nextButtonElement.addEventListener("click", (event) => {
            const checkedRadioElement = document.querySelector('input[name="choice"]:checked');
            if(checkedRadioElement){
                const key = Number.parseInt(checkedRadioElement.dataset.index, 10);
                quiz.guess(key)
                renderAll();
            }

        })

        restartButtonElement.addEventListener("click", (event) => {
            quiz.reset();
            renderAll();
            nextButtonElement.style.opacity = 1;
            tagLineElement.textContent = "Pick an option below!";


        })
    }

    const renderEndScreen = () => {
        quizQuestionElement.textContent = "Great Job!";
        trackerElement.textContent = `Your Score: ${(quiz.score / quiz.questions.length) * 100}%`;
        tagLineElement.textContent = "Complete!";
        nextButtonElement.style.opacity = 0;
        progressInnerElement.style.width = "100%";
    }


    const renderAll = () => {
        //quiz has ended
        if(quiz.hasEnded()){
           renderEndScreen();
        } else {
            renderQuestion();
            renderChocies();
            renderTracker();
            renderProgressBar()
        }
    }
    return {
        renderAll,
        listeners
    };

})()



App.renderAll();
App.listeners();