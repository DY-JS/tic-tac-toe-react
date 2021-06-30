import React from "react";
import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      xCountWin: 0,
      oCountWin: 0,
      first: "",
      second: "",
    };

    this.winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  firstMove = (e) => {                                //выбираем первый ход при условии, что все блоки чистые, чтобы нельзя было выбрать посреди игры
    if (this.state.squares.every(elem=>elem===null)){ 
    this.setState({ first: e.target.value });
    this.setState({ second: e.target.value === "X" ? "O" : "X" });
       }
};

  isWinner = () => {
    let { squares, xCountWin, oCountWin, first, second } = this.state;
    let message = document.querySelector(".hide");                     //выигрыш
    let win = this.state.count % 2 === 0 ? first : second;
    this.winnerLines.forEach((elem) => {
      if (
        squares[elem[0]] === win &&
        squares[elem[1]] === win &&
        squares[elem[2]] === win
      ) {
        message.classList.toggle("win-message");
        message.textContent = win + " win!";

        win === "X"
          ? this.setState({ xCountWin: xCountWin + 1 })                //счётчик побед
          : this.setState({ oCountWin: oCountWin + 1 });
      }
    });

    if (this.state.count === 8 && message.textContent === "") {
      message.classList.toggle("win-message");
      message.textContent = "draw!";                      //ничья когда ходы исчерпаны  и нет соообщения о выигрыше
    }

    if (message.textContent !== "") {
      setTimeout(() => {
        this.setState({                     //если отобразилось сообщение о выигрыше или ничья - обнуляем состояние
          count: 0,
          first: "",
          second: "",
        });
        message.textContent = "";
        message.classList.toggle("win-message");
        [...document.querySelectorAll("input")].forEach(  //обнуляем радиокнопки
          (elem) => (elem.checked = false)
        );
      }, 3000);
    }
    };

  clickHandler = (e) => {
    let { squares, count, first, second } = this.state;

    if (first && second) {
      let index = e.target.getAttribute("data");
      let currentSquares = squares;
      if (currentSquares[index] === null) {
        currentSquares[index] = count % 2 === 0 ? first : second;
        e.target.classList.add( count % 2 === 0 ? 'blue' : 'red');
        this.setState({
          squares: currentSquares,
          count: count+1 
        });
      } else if (currentSquares[index] !== null) {
             alert("Cell is occupied");
             this.setState({ count: this.state.count 
            });
          }
      this.isWinner();
    }
  };

  newRound=()=>{
    this.setState({
      xCountWin: 0,                      //обнуляем всё состояние и все эл-ты
      oCountWin: 0,
     });
     this.newGame();
    }

  newGame=()=>{
    this.setState({                     
      squares: Array(9).fill(null),
      count: 0,                       //обнуляем состояние (кроме общего счёта) и радиокнопки
      first: "",
      second: ""
    });
    [...document.querySelectorAll("input")].forEach(  //обнуляем радиокнопки 
      (elem) => (elem.checked = false)
    );
    [...document.querySelectorAll(".field_block")].forEach(  //обнуляем color 'Х' и 'О'
      (elem) => {
     if(elem.classList.contains('blue'))elem.classList.remove('blue');
     if(elem.classList.contains('red')) elem.classList.remove('red');
      }); 
  }

  render() {
    let { squares, xCountWin, oCountWin } = this.state;
    return (
      <div className="App">
        <div className="total">
          <strong> TOTAL SCORE </strong>
          <p className="player">
            <span>
              <strong>X</strong>
            </span>
            <span>
              <strong>O</strong>
            </span>
          </p>
          <p className="count">
            <strong>
                {xCountWin} : {oCountWin}
            </strong>
          </p>
        </div>

        <div className="firstMove">
          Choose Who walks first:
          <br></br>
          <input type="radio" name="radio" value="X" onChange={this.firstMove}/> -X
          <br></br>
          <input type="radio" name="radio" value="O" onChange={this.firstMove}/> -O
        </div>
        <div className="hide"></div>
        <div className="field">
          <div className="field_block" onClick={this.clickHandler} data="0">
            {squares[0]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="1">
            {squares[1]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="2">
            {squares[2]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="3">
            {squares[3]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="4">
            {squares[4]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="5">
            {squares[5]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="6">
            {this.state.squares[6]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="7">
            {this.state.squares[7]}
          </div>
          <div className="field_block" onClick={this.clickHandler} data="8">
            {this.state.squares[8]}
          </div>
        </div>
        <div className='buttons'>
        <button className='btn' onClick={this.newRound}>Start new Round</button>
        <button className='btn' onClick={this.newGame}>Start new Game</button>
        </div>
      </div>
    );
  }
}

export default App;
