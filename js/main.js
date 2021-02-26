//Objet joueur
const Player = (letter) => {

    this.letter = letter;

    const getLetter = () => {
        return letter;
    }

    return { getLetter };
}


//Objet gameBoard
const gameBoard = (() =>{

    const board = ['','','','','','','','',''];
    const winningBoard = [[0,1,2],[3,4,5],
    [6,7,8],[0,4,8],[0,3,6],[1,4,7],[2,5,8],[6,4,2]];
    const tictactoeDivs  = document.querySelectorAll('.tictactoeGrid div');
    const playerTurn  = document.querySelector('#player_turn');
    let whosTurn = 1;
    let round = 0;
    const player_one = Player('X');
    const player_two = Player('O');
    let xForWin = 0;
    let yForWin = 0;
    

    const doWeHaveAWinner = () => {
        
        for (let index = 0; index < winningBoard.length; index++) {
            for (let i = 0; i < winningBoard[index].length; i++) {
                if(board[winningBoard[index][i]] === 'X'){
                    xForWin++;
                }else if(board[winningBoard[index][i]] === 'O'){
                    yForWin++;
                }
            }
            if(xForWin === 3){
                console.log('X for win');
                round = 9;
                yForWin = 0;
                updateMessageWhosTurn("The X player win this game");
            }else if(yForWin === 3){
                console.log('O for win');
                round = 9;
                xForWin = 0;
                updateMessageWhosTurn("The O player win this game");
            }else{
                xForWin = 0;
                yForWin = 0;
            }
        }

        
    }


    const clearBoard = () => {
        console.log("Board Reset!!!");
        for (let index = 0; index < board.length; index++) {
            board[index] = '';
            
        }

        tictactoeDivs.forEach((tictactoeDiv) => {
            tictactoeDiv.textContent = '';
        });

        whosTurn = 1
        round = 0;
        updateMessageWhosTurn("This is the X player's turn!");
    }

    const addClickEvent = (() =>{
        tictactoeDivs.forEach(tictactoeDiv => {
            tictactoeDiv.addEventListener('click', addPlayerChoice);
        });
    });
        
    

    const addPlayerChoice = (e) => {
      
        if(round <= 8){
            round++;
            if(whosTurn === 1){
                board[e.target.dataset.index] = player_one.getLetter();
                whosTurn = 0;
                
               // console.log(round);
                if(round === 9){
                    console.log('Test');
                    updateMessageWhosTurn("This is a draw!");
                   
                }else{
                    updateMessageWhosTurn("This is the O player's turn!");
                }
                
                updateGameBoard();
                doWeHaveAWinner();
                return;   
            }

            board[e.target.dataset.index] = player_two.getLetter();
            whosTurn = 1
           // console.log(round);
            updateMessageWhosTurn("This is the X player's turn");
            updateGameBoard();
            doWeHaveAWinner();
        }

        
            
    }

    const updateMessageWhosTurn = (message) =>{
        playerTurn.textContent = message;
    }

    const updateGameBoard = () => {
        
        tictactoeDivs.forEach(tictactoeDiv => {
            tictactoeDiv.textContent = board[tictactoeDiv.dataset.index];
        });
    }

    return {clearBoard, addPlayerChoice};
})();

//Objet gameController
const gameController = (() =>{
    
    

    const grid = document.querySelector('.tictactoeGrid');
    grid.addEventListener('click', gameBoard.addPlayerChoice);


    const button_reset = document.querySelector('#reset');
    button_reset.addEventListener('click', gameBoard.clearBoard);

})();



