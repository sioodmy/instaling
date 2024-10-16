// ==UserScript==
// @name         Instaling.pl Quiz Solver
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  imagine robic prace domową lmao.
// @author       sioodmy
// @downloadURL  https://raw.githubusercontent.com/sioodmy/instaling/refs/heads/main/instaling.js
// @match        https://instaling.pl/ling2/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';
    let questionAnswerMap = GM_getValue("instaling", {});

    function getRandomAnswer() {
        return Math.random().toString(36).substring(7);
    }
    function getRandomTimeout() {
        return Math.floor(Math.random() * 1000) + 500;
    }

    function solveQuiz() {
        let questionDiv = document.querySelector('div.translations');
        let questionText = questionDiv ? questionDiv.innerText.trim() : '';
        let answerInput = document.getElementById('answer');
        let checkButton = document.getElementById('check');
        let wordDiv = document.getElementById('word');


        if (!questionText || !answerInput || !checkButton || !wordDiv) {
            setTimeout(solveQuiz, getRandomTimeout());
            return;
        }

        let answer = questionAnswerMap[questionText] || getRandomAnswer();
        if (Math.random() < 0.2) {
            answer = getRandomAnswer();
        }

        answerInput.value = answer;

        checkButton.click();

        setTimeout(() => {
            let incorrectDiv = document.querySelector('div.red');
            let correctDiv = document.getElementById('green');

            if (incorrectDiv) {
                let correctAnswer = wordDiv.innerText.trim();
                questionAnswerMap[questionText] = correctAnswer;
                GM_setValue("instaling", questionAnswerMap);
            }



                let nextWordButton = document.querySelector("h4#next_word")
                if (nextWordButton) {
                    nextWordButton.click();
                    setTimeout(solveQuiz, getRandomTimeout());
                }

        }, getRandomTimeout());
    }

    setTimeout(solveQuiz, getRandomTimeout());
})();
