function Quiz(questionsArray) {
    this.questions = questionsArray;
    this.score = 0;
    this.currentIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.currentIndex];
}

Quiz.prototype.incrementIndex = function() {
    this.currentIndex++;
}

Quiz.prototype.hasEnded = function() {
    return this.currentIndex === this.questions.length;
}

Quiz.prototype.guess = function(guess) {
    const currentQuestion = this.questions[this.currentIndex];
    if(currentQuestion.isCorrect(guess)) {
        this.score++;
    }

    this.currentIndex++;

}

Quiz.prototype.reset = function () {
    this.score = 0;
    this.currentIndex = 0;
}


export default Quiz;