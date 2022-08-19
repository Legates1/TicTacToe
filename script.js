let currentPlayer = 'X'
let running = false
let playerTurn = document.querySelector('#turn')
const board = document.querySelector('.center')
let allBtns = document.querySelectorAll('.box')
const restartBtn = document.querySelector('.restart')
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options =["", "", "", "", "", "", "", "", ""]



startGame()

function startGame(){
	running = true
	allBtns.forEach(item => item.addEventListener('click',cellClicked))
	restartBtn.addEventListener('click',restartGame)
	playerTurn.textContent = `${currentPlayer}'s Turn`
}

function cellClicked(){
	const cellIndex = this.getAttribute("cellIndex")
	if(options[cellIndex] != "" || !running){
		return
	}
	updateCell(this, cellIndex)
	checkWinner()
}

function updateCell(cell,index){
	options[index] = currentPlayer
	cell.textContent = currentPlayer
}

function changePlayer(){
	currentPlayer = (currentPlayer == 'X') ? "O" : "X"
	playerTurn.textContent = `${currentPlayer}'s Turn`
}	

function checkWinner(){
	let roundWon = false

	for(let i = 0; i < winConditions.length; i++){
		const condition = winConditions[i]
		const cellA = options[condition[0]]
		const cellB = options[condition[1]]
		const cellC = options[condition[2]]

		if(cellA == "" || cellB == "" || cellC == ""){
			continue
		}
		if(cellA == cellB && cellB == cellC){
			roundWon = true
			break;
		}
	}

	if(roundWon){
		switch(currentPlayer){
			case 'X':
				playerTurn.textContent = 'Player 1 won'
				break;
			case 'O':
				playerTurn.textContent = 'Player 2 won'
				break;
		}
		running = false
	}else if(!options.includes('')){
		playerTurn.textContent = 'Draw'
	}else{
		changePlayer()
	}
}

function restartGame(){
	currentPlayer = 'X'
	options =["", "", "", "", "", "", "", "", ""]
	playerTurn.textContent = `${currentPlayer}'s Turn`
	allBtns.forEach(cell => cell.textContent = "")
	running = true
}