import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 *    Status: complete
 *    TODO:
 *    ✓Change status for when it's player O's turn
 *    ✓calculate win condition
 *    ✓highlight winning squares
 *    ✓track when all 64 squares are taken up
 *    ✓allow game restart
 *    ✓track turns taken / reset to 0 on game (re)start
 */
class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
      win: false,
    };
  }

  render() {
    return (
      <button className={this.props.win ? "highlighted-square" : "square"} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    var squares = createArray(4,4,4);
    this.state = {
      inProgress: false,
      squares: squares,
      turn: 'X',
      winSquares: null,
    }
  }

  clearSquares() {
    this.setState({squares: createArray(4,4,4), winSquares: null, inProgress: true});
    this.props.resetCallback();
  }

  handleClick(i,j,k) {
    if (!this.state.inProgress) {
      return;
    }
    const squares = this.state.squares.slice();
    if (squares[i][j][k]) {  // square already occupied
      return;
    }
    squares[i][j][k] = this.state.turn;
    this.props.callbackIncrTurns();
    var win = getWinSquares(squares, this.state.turn);
    if (win) {
      this.setState({squares: squares, turn: 'X', winSquares: win, inProgress: false});
      this.props.callbackGameOver();
    } else {
      this.setState({squares: squares, turn: (this.state.turn === 'X' ? 'O' : 'X') });
    }
  }

  renderSquare(i,j,k) {
    var win = false;
    if (this.state.winSquares) {
      for (var a=0, len=this.state.winSquares.length; a<len; a++) {
        if (this.state.winSquares[a][0] === i && this.state.winSquares[a][1] === j && this.state.winSquares[a][2] === k) {
          win = true;
        }
      }
    }
    return (
      <Square
        value={this.state.squares[i][j][k]}
        win={win}
        onClick={
          () => {
            if (!this.state.winSquares) {
              this.handleClick(i,j,k);
            }
            this.props.onClick()
          }
        }
      />
    );
  }
 
  render() {
    if (this.props.reset) {
      this.clearSquares();
    }
    return (
      <div className="entire-board">
        <div className="board-level">
          <div className="board-row">
            {this.renderSquare(0, 0, 0)}
            {this.renderSquare(0, 1, 0)}
            {this.renderSquare(0, 2, 0)}
            {this.renderSquare(0, 3, 0)}
          </div>
          <div className="board-row">
            {this.renderSquare(1, 0, 0)}
            {this.renderSquare(1, 1, 0)}
            {this.renderSquare(1, 2, 0)}
            {this.renderSquare(1, 3, 0)}
          </div>
          <div className="board-row">
            {this.renderSquare(2, 0, 0)}
            {this.renderSquare(2, 1, 0)}
            {this.renderSquare(2, 2, 0)}
            {this.renderSquare(2, 3, 0)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, 0, 0)}
            {this.renderSquare(3, 1, 0)}
            {this.renderSquare(3, 2, 0)}
            {this.renderSquare(3, 3, 0)}
          </div>
        </div>
        <div className="board-level">
          <div className="board-row">
            {this.renderSquare(0, 0, 1)}
            {this.renderSquare(0, 1, 1)}
            {this.renderSquare(0, 2, 1)}
            {this.renderSquare(0, 3, 1)}
          </div>
          <div className="board-row">
            {this.renderSquare(1, 0, 1)}
            {this.renderSquare(1, 1, 1)}
            {this.renderSquare(1, 2, 1)}
            {this.renderSquare(1, 3, 1)}
          </div>
          <div className="board-row">
            {this.renderSquare(2, 0, 1)}
            {this.renderSquare(2, 1, 1)}
            {this.renderSquare(2, 2, 1)}
            {this.renderSquare(2, 3, 1)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, 0, 1)}
            {this.renderSquare(3, 1, 1)}
            {this.renderSquare(3, 2, 1)}
            {this.renderSquare(3, 3, 1)}
          </div>
        </div>
        <div className="board-level">
          <div className="board-row">
            {this.renderSquare(0, 0, 2)}
            {this.renderSquare(0, 1, 2)}
            {this.renderSquare(0, 2, 2)}
            {this.renderSquare(0, 3, 2)}
          </div>
          <div className="board-row">
            {this.renderSquare(1, 0, 2)}
            {this.renderSquare(1, 1, 2)}
            {this.renderSquare(1, 2, 2)}
            {this.renderSquare(1, 3, 2)}
          </div>
          <div className="board-row">
            {this.renderSquare(2, 0, 2)}
            {this.renderSquare(2, 1, 2)}
            {this.renderSquare(2, 2, 2)}
            {this.renderSquare(2, 3, 2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, 0, 2)}
            {this.renderSquare(3, 1, 2)}
            {this.renderSquare(3, 2, 2)}
            {this.renderSquare(3, 3, 2)}
          </div>
        </div>
        <div className="board-level">
          <div className="board-row">
            {this.renderSquare(0, 0, 3)}
            {this.renderSquare(0, 1, 3)}
            {this.renderSquare(0, 2, 3)}
            {this.renderSquare(0, 3, 3)}
          </div>
          <div className="board-row">
            {this.renderSquare(1, 0, 3)}
            {this.renderSquare(1, 1, 3)}
            {this.renderSquare(1, 2, 3)}
            {this.renderSquare(1, 3, 3)}
          </div>
          <div className="board-row">
            {this.renderSquare(2, 0, 3)}
            {this.renderSquare(2, 1, 3)}
            {this.renderSquare(2, 2, 3)}
            {this.renderSquare(2, 3, 3)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, 0, 3)}
            {this.renderSquare(3, 1, 3)}
            {this.renderSquare(3, 2, 3)}
            {this.renderSquare(3, 3, 3)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: 'X',
      inProgress: false,
      numTurns: 0,
      resetSquares: false,
      winner: null,
    }
  }

  handleClick() {
    if (this.state.inProgress) {
      this.setState({turn: (this.state.turn === 'X' ? 'O' : 'X')});
    } else {
      this.setState({turn: 'X'});
    }
  }

  gameOver() {
    const winnerTurn = this.state.turn;
    this.setState({turn: 'X', inProgress: false, winner: winnerTurn});
  }

  gameRestart() {
    this.setState({turn: 'X', inProgress: true, numTurns: 0, resetSquares: true, winner: null});
  }

  resetCallback() {
    this.setState({resetSquares: false});
  }

  incrTurns() {
    var newNumTurns = this.state.numTurns + 1;
    var newInProgress = this.state.inProgress;
    if (newNumTurns >= 64) {
      newInProgress = false;
    }
    this.setState({numTurns: newNumTurns, inProgress: newInProgress});
  }

  render() {
    return (
      <div className="game">
        <StatusBar
          gameInProgress={this.state.inProgress}
          playerTurn={this.state.turn}
          turnsTaken={this.state.numTurns}
          gameRestart={() => { this.gameRestart(); } }
          winner={this.state.winner}
        />
        <div className="game-board">
          <Board
            stateCallback="handleClick"
            onClick={
              () => {
                if (this.state.inProgress) {
                  this.handleClick();
                }
              }
            }
            callbackIncrTurns={() => this.incrTurns()}
            callbackGameOver={() => this.gameOver()}
            reset={this.state.resetSquares}
            resetCallback={() => this.resetCallback()}
          />
        </div>
      </div>
    );
  }
}

class StatusBar extends React.Component {
  render() {
    var message = this.props.gameInProgress ? "Restart" : "Start New Game";
    return (
      <div>
        <button className="button" onClick={() => this.props.gameRestart()}>{message}</button>
        <br/><br/>
        <div className="status">{this.props.gameInProgress ? 'Game in progress' : 'Game over'}</div>
        <div className="status">{'Who\'s turn? ' + this.props.playerTurn}</div>
        <div className="status">{this.props.turnsTaken + ' turns taken'}</div>
        <div className={`status${(!this.props.winner ? 'off' : '')}`}>{'Winner: ' + this.props.winner}</div>
      </div>
    )
  }
}

// ========================================

export function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

export function getWinSquares(cube, xo) {
  //
  // Check if player's marker
  //
  // There are 10 possible win conditions per plane,
  // times 4 planes going each of the 3 dimensions,
  // while the next dimension will double-count 4 of the previous win conditions
  // (8 by the 3rd dimension).
  // That's 10x4 + 6x4 + 2x4 = 72.
  // Plus 4 win conditions that can span all 3 dimensions!  E.g.,
  // from one corner of the cube to the other (6 corners, 2 of them
  // touched in each win condition).
  // That yields a total of 76 win conditions.
  // Example:
  // ⬛🔲🔲🔲   🔲⬛🔲🔲   🔲🔲⬛🔲   🔲🔲🔲⬛   ⬛⬛⬛⬛   🔲🔲🔲🔲   🔲🔲🔲🔲   🔲🔲🔲🔲   ⬛🔲🔲🔲   🔲🔲🔲⬛
  // ⬛️🔲🔲🔲   🔲⬛🔲🔲   🔲🔲⬛🔲   🔲🔲🔲⬛   🔲🔲🔲🔲   ⬛⬛⬛⬛   🔲🔲🔲🔲   🔲🔲🔲🔲   🔲⬛🔲🔲   🔲🔲⬛🔲
  // ⬛️🔲🔲🔲   🔲⬛🔲🔲   🔲🔲⬛🔲   🔲🔲🔲⬛   🔲🔲🔲🔲   🔲🔲🔲🔲   ⬛⬛⬛⬛   🔲🔲🔲🔲   🔲🔲⬛🔲   🔲⬛🔲🔲
  // ⬛️🔲🔲🔲   🔲⬛🔲🔲   🔲🔲⬛🔲   🔲🔲🔲⬛   🔲🔲🔲🔲   🔲🔲🔲🔲   🔲🔲🔲🔲   ⬛⬛⬛⬛   🔲🔲🔲⬛   ⬛🔲🔲🔲
  // The above 10 win conditions cover 1 plane, suppose it's the X-Y plane...
  // There are 3 more similar X-Y planes if you travel down the Z axis

  // For all 2D planes, look at all 10 possible win conditions (and recube double-counted ones)
  var winCombos = [];
  // Y-Z plane, 0 level of X axis
  winCombos.push([[0,0,0],[0,0,1],[0,0,2],[0,0,3]]);
  winCombos.push([[0,1,0],[0,1,1],[0,1,2],[0,1,3]]);
  winCombos.push([[0,2,0],[0,2,1],[0,2,2],[0,2,3]]);
  winCombos.push([[0,3,0],[0,3,1],[0,3,2],[0,3,3]]);
  winCombos.push([[0,0,0],[0,1,0],[0,2,0],[0,3,0]]);
  winCombos.push([[0,0,1],[0,1,1],[0,2,1],[0,3,1]]);
  winCombos.push([[0,0,2],[0,1,2],[0,2,2],[0,3,2]]);
  winCombos.push([[0,0,3],[0,1,3],[0,2,3],[0,3,3]]);
  winCombos.push([[0,0,0],[0,1,1],[0,2,2],[0,3,3]]);
  winCombos.push([[0,0,3],[0,1,2],[0,2,1],[0,3,0]]);
  // Y-Z plane, 1 level of X axis
  winCombos.push([[1,0,0],[1,0,1],[1,0,2],[1,0,3]]);
  winCombos.push([[1,1,0],[1,1,1],[1,1,2],[1,1,3]]);
  winCombos.push([[1,2,0],[1,2,1],[1,2,2],[1,2,3]]);
  winCombos.push([[1,3,0],[1,3,1],[1,3,2],[1,3,3]]);
  winCombos.push([[1,0,0],[1,1,0],[1,2,0],[1,3,0]]);
  winCombos.push([[1,0,1],[1,1,1],[1,2,1],[1,3,1]]);
  winCombos.push([[1,0,2],[1,1,2],[1,2,2],[1,3,2]]);
  winCombos.push([[1,0,3],[1,1,3],[1,2,3],[1,3,3]]);
  winCombos.push([[1,0,0],[1,1,1],[1,2,2],[1,3,3]]);
  winCombos.push([[1,0,3],[1,1,2],[1,2,1],[1,3,0]]);
  // Y-Z plane, 2 level of X axis
  winCombos.push([[2,0,0],[2,0,1],[2,0,2],[2,0,3]]);
  winCombos.push([[2,1,0],[2,1,1],[2,1,2],[2,1,3]]);
  winCombos.push([[2,2,0],[2,2,1],[2,2,2],[2,2,3]]);
  winCombos.push([[2,3,0],[2,3,1],[2,3,2],[2,3,3]]);
  winCombos.push([[2,0,0],[2,1,0],[2,2,0],[2,3,0]]);
  winCombos.push([[2,0,1],[2,1,1],[2,2,1],[2,3,1]]);
  winCombos.push([[2,0,2],[2,1,2],[2,2,2],[2,3,2]]);
  winCombos.push([[2,0,3],[2,1,3],[2,2,3],[2,3,3]]);
  winCombos.push([[2,0,0],[2,1,1],[2,2,2],[2,3,3]]);
  winCombos.push([[2,0,3],[2,1,2],[2,2,1],[2,3,0]]);
  // Y-Z plane, 3 level of X axis
  winCombos.push([[3,0,0],[3,0,1],[3,0,2],[3,0,3]]);
  winCombos.push([[3,1,0],[3,1,1],[3,1,2],[3,1,3]]);
  winCombos.push([[3,2,0],[3,2,1],[3,2,2],[3,2,3]]);
  winCombos.push([[3,3,0],[3,3,1],[3,3,2],[3,3,3]]);
  winCombos.push([[3,0,0],[3,1,0],[3,2,0],[3,3,0]]);
  winCombos.push([[3,0,1],[3,1,1],[3,2,1],[3,3,1]]);
  winCombos.push([[3,0,2],[3,1,2],[3,2,2],[3,3,2]]);
  winCombos.push([[3,0,3],[3,1,3],[3,2,3],[3,3,3]]);
  winCombos.push([[3,0,0],[3,1,1],[3,2,2],[3,3,3]]);
  winCombos.push([[3,0,3],[3,1,2],[3,2,1],[3,3,0]]);
  // X-Y plane, 0 level of Z axis - skip intersection with Y-Z
  winCombos.push([[0,0,0],[1,0,0],[2,0,0],[3,0,0]]);
  winCombos.push([[0,1,0],[1,1,0],[2,1,0],[3,1,0]]);
  winCombos.push([[0,2,0],[1,2,0],[2,2,0],[3,2,0]]);
  winCombos.push([[0,3,0],[1,3,0],[2,3,0],[3,3,0]]);
  winCombos.push([[0,0,0],[1,1,0],[2,2,0],[3,3,0]]);
  winCombos.push([[0,3,0],[1,2,0],[2,1,0],[3,0,0]]);
  // X-Y plane, 1 level of Z axis - skip intersection with Y-Z
  winCombos.push([[0,0,1],[1,0,1],[2,0,1],[3,0,1]]);
  winCombos.push([[0,1,1],[1,1,1],[2,1,1],[3,1,1]]);
  winCombos.push([[0,2,1],[1,2,1],[2,2,1],[3,2,1]]);
  winCombos.push([[0,3,1],[1,3,1],[2,3,1],[3,3,1]]);
  winCombos.push([[0,0,1],[1,1,1],[2,2,1],[3,3,1]]);
  winCombos.push([[0,3,1],[1,2,1],[2,1,1],[3,0,1]]);
  // X-Y plane, 2 level of Z axis - skip intersection with Y-Z
  winCombos.push([[0,0,2],[1,0,2],[2,0,2],[3,0,2]]);
  winCombos.push([[0,1,2],[1,1,2],[2,1,2],[3,1,2]]);
  winCombos.push([[0,2,2],[1,2,2],[2,2,2],[3,2,2]]);
  winCombos.push([[0,3,2],[1,3,2],[2,3,2],[3,3,2]]);
  winCombos.push([[0,0,2],[1,1,2],[2,2,2],[3,3,2]]);
  winCombos.push([[0,3,2],[1,2,2],[2,1,2],[3,0,2]]);
  // X-Y plane, 3 level of Z axis - skip intersection with Y-Z
  winCombos.push([[0,0,3],[1,0,3],[2,0,3],[3,0,3]]);
  winCombos.push([[0,1,3],[1,1,3],[2,1,3],[3,1,3]]);
  winCombos.push([[0,2,3],[1,2,3],[2,2,3],[3,2,3]]);
  winCombos.push([[0,3,3],[1,3,3],[2,3,3],[3,3,3]]);
  winCombos.push([[0,0,3],[1,1,3],[2,2,3],[3,3,3]]);
  winCombos.push([[0,3,3],[1,2,3],[2,1,3],[3,0,3]]);
  // X-Z plane, 0 level of Y plane.  Diagonals only - skip intersection with other planes
  winCombos.push([[0,0,0],[1,0,1],[2,0,2],[3,0,3]]);
  winCombos.push([[0,0,3],[1,0,2],[2,0,1],[3,0,0]]);
  // X-Z plane, 1 level of Y plane.  Diagonals only - skip intersection with other planes
  winCombos.push([[0,1,0],[1,1,1],[2,1,2],[3,1,3]]);
  winCombos.push([[0,1,3],[1,1,2],[2,1,1],[3,1,0]]);
  // X-Z plane, 2 level of Y plane.  Diagonals only - skip intersection with other planes
  winCombos.push([[0,2,0],[1,2,1],[2,2,2],[3,2,3]]);
  winCombos.push([[0,2,3],[1,2,2],[2,2,1],[3,2,0]]);
  // X-Z plane, 3 level of Y plane.  Diagonals only - skip intersection with other planes
  winCombos.push([[0,3,0],[1,3,1],[2,3,2],[3,3,3]]);
  winCombos.push([[0,3,3],[1,3,2],[2,3,1],[3,3,0]]);
  // diagonals of cube (corner to corner, 4 lines that touch all 8 corners)
  winCombos.push([[0,0,0],[1,1,1],[2,2,2],[3,3,3]]);
  winCombos.push([[0,0,3],[1,1,2],[2,2,1],[3,3,0]]);
  winCombos.push([[3,0,3],[2,1,2],[1,2,1],[0,3,0]]);
  winCombos.push([[3,0,0],[2,1,1],[1,2,2],[0,3,3]]);

  //winCombos.forEach(function (winCombo) {
  for (var i=0, len=winCombos.length; i<len; i++) {
    var winCombo = winCombos[i];
    if (xo === cube[winCombo[0][0]][winCombo[0][1]][winCombo[0][2]] &&
        xo === cube[winCombo[1][0]][winCombo[1][1]][winCombo[1][2]] &&
        xo === cube[winCombo[2][0]][winCombo[2][1]][winCombo[2][2]] &&
        xo === cube[winCombo[3][0]][winCombo[3][1]][winCombo[3][2]]) {
          return winCombo;
    }
  };

  return null;
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

