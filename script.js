//Accessing the require elements
const item = document.querySelectorAll(".item");
const popup = document.querySelector(".popup");
const newGame = document.getElementById("new-game");
const message = document.getElementById("message");
const playerTurn = document.getElementById("player-turn");

//x will play first
let xTurn = true;
let count = 0;

item.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;

      //change player turn text into 'o' turn
      playerTurn.innerHTML = "O Turn";
      playerTurn.classList.remove("x");
      playerTurn.classList.add("o");

      //Display X
      element.innerText = "X";
      element.classList.remove("o");
      element.classList.add("x");
    } else {
      xTurn = true;

      //change player turn text into 'x' turn
      playerTurn.innerHTML = "X Turn";
      playerTurn.classList.remove("o");
      playerTurn.classList.add("x");

      //Display O
      element.innerText = "O";
      element.classList.remove("x");
      element.classList.add("o");
    }

    //Disabling the button
    element.disabled = true;

    //increament count on each click
    count++;

    if (count == 9) {
      drawMatch();
    }

    //check for win on each click
    checkWin();
  });
});

//Disable all button for the end of the match
const disableButtons = () => {
  item.forEach((element) => {
    element.disabled = true;
  });

  //show popup
  popup.classList.remove("hide");
};

//Enabling all buttons for new game
const enableButtons = () => {
  item.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });

  //hide popup
  popup.classList.add("hide");
};

//Executed when player wins
const winMatch = (player) => {
  disableButtons();
  if (player == "X") {
    message.innerText = "X Wins the game";
  } else {
    message.innerText = "O Wins the game";
  }
};

//Executed when match draws
const drawMatch = () => {
  disableButtons();
  message.innertext = "The match is draw";
};

//New game start button
newGame.addEventListener("click", () => {
  count = 0;
  enableButtons();

  //set x into first player
  xTurn = true;
  playerTurn.innerText = "X Turn";
  playerTurn.classList.remove("o");
  playerTurn.classList.add("x");
});

//win logic
const checkWin = () => {
  const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //loop thorugh all win patterns
  for (let i of winPattern) {
    let [element1, element2, element3] = [
      item[i[0]].innerText,
      item[i[1]].innerText,
      item[i[2]].innerText,
    ];

    //check if elements are filled
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 === element2 && element2 === element3) {
        winMatch(element1);
      }
    }
  }
};
