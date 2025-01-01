let userScore = 0;
let compScore = 0;
const winningScore = 25;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was a draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const endGame = (winner) => {
  if (winner === "user") {
    msg.innerText = "Congratulations! You won the game!";
    msg.style.backgroundColor = "green";
  } else {
    msg.innerText = "Sorry, the computer won the game.";
    msg.style.backgroundColor = "red";
  }

  // Disable further clicks
  choices.forEach((choice) => {
    choice.removeEventListener("click", playGameListener);
  });

  // Ask if the user wants to play again
  setTimeout(() => {
    const playAgain = confirm("Do you want to play another game?");
    if (playAgain) {
      resetGame();
    } else {
      resetScores();
      msg.innerText = "Thank you for playing!";
      msg.style.backgroundColor = "#081b31";
    }
  }, 1000);
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  if (userScore === winningScore) {
    endGame("user");
  } else if (compScore === winningScore) {
    endGame("comp");
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const playGameListener = (event) => {
  const userChoice = event.target.closest(".choice").getAttribute("id");
  playGame(userChoice);
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";

  choices.forEach((choice) => {
    choice.addEventListener("click", playGameListener);
  });
};

const resetScores = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
};

choices.forEach((choice) => {
  choice.addEventListener("click", playGameListener);
});
