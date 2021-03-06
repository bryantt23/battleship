const boardSize = 10;

class Gameboard {
  constructor() {
    let arr = [];
    for (let i = 0; i < boardSize; i++) {
      arr.push(new Array(size));
    }
    this.gameBoard = arr;
    this.ships = [];
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  getBoard() {
    return this.gameBoard;
  }

  //try boolean to know if turn is over
  receiveAttack(row, col) {
    const gameboardPosition = this.gameBoard[row][col];
    if (gameboardPosition === 'MISS' || gameboardPosition === 'HIT') {
      return false;
    }
    if (typeof this.gameBoard[row][col] === 'object') {
      const ship = this.gameBoard[row][col].hit();
      this.gameBoard[row][col] = 'HIT';
    } else {
      //should be undefined
      this.gameBoard[row][col] = 'MISS';
    }
    return true;
  }

  placeShip(startingRow, startingCol, orientation, ship) {
    if (isValidShipPosition(startingRow, startingCol, orientation, ship)) {
      setShip(startingRow, startingCol, orientation, ship);
      this.ships.push(ship);
    }
  }

  isValidShipPosition(startingRow, startingCol, orientation, ship) {
    const { shipLength } = ship;

    if (orientation === 'vertical') {
      for (let i = startingRow; i <= startingRow + shipLength; i++) {
        this.gameBoard[i][startingCol] = ship;
      }
    } else {
      //horizontal
      for (let i = startingCol; i <= startingCol + shipLength; i++) {
        this.gameBoard[startingRow][i] = ship;
      }
    }
  }

  isValidShipPosition(startingRow, startingCol, orientation, ship) {
    const { shipLength } = ship;

    if (orientation === 'vertical') {
      if (startingRow + shipLength >= boardSize) {
        return false;
      }

      for (let i = startingRow; i <= startingRow + shipLength; i++) {
        if (this.gameBoard[i][startingCol] !== undefined) {
          return false;
        }
      }
    } else {
      //horizontal
      if (startingCol + shipLength >= boardSize) {
        return false;
      }

      for (let i = startingCol; i <= startingCol + shipLength; i++) {
        if (this.gameBoard[startingRow][i] !== undefined) {
          return false;
        }
      }
    }
    return true;
  }
}

export default Gameboard;
