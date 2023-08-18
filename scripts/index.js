const myModule = (() => {
  const cells = document.querySelectorAll('.cell');
  const winner = document.querySelector('.winner');
  const turn = document.querySelector('.turn');
  const restart = document.querySelector('#restart');
  const cellArray = Array.from([...cells]);
  let gameEnded = false;

  const Gameboard = {
    render: function () {
      //CONTADOR DE PASOS DESDE QUE EMPIEZA LA PARTIDA
      let count = 0;

      // LLAMAMOS EL METODO QUE NOS MUESTRA EL TURN EN ESE MOMENTO
      this.showPlayerTurn();

      //HACEMOS UN FOREACH AL NODO DE CELDAS
      cellArray.forEach((item) => {
        item.addEventListener('click', function turn() {
          // SI LA CONDICION FLAG CAMBIA A "TRUE" SALIMOS DE LA FUNCIÓN
          if (gameEnded) return;
          // EL TURNO SE DETERMINA CUANDO HACEMOS MOD Al COUNT (PAR TURNO DEL X) (IMPAR TURNO DEL O)
          if (count % 2 == 0) {
            this.textContent = 'X';
            Gameboard.setTurnStatus('PLAYER O TURN');
          } else {
            this.textContent = 'O';
            Gameboard.setTurnStatus('PLAYER X TURN');
          }

          // REMOVEMOS EL EVENTO PARA NO RE-ESCRIBIR UNA CELDA YA ELEGIDA
          item.removeEventListener('click', turn);
          //UTILIZAMOS UN CONDICIONAL QUE EVALUA SI EL METODO GETWINNER SE CUMPLE, DE SER ASI
          //EL MENSAJE DE TURNO LO ELIMINAMOS
          // EL FLAG GLOBAL SE VEULVE VERDADERO
          // Y HACEMOS RENDER A EL MENSAJE DE GANADOR
          if (Gameboard.getWinner()) {
            Gameboard.setTurnStatus('');
            gameEnded = true;
            winner.textContent = `THE WINNER IS ${this.textContent}`;
          } else if (count === 8) {
            Gameboard.setTurnStatus('');
            winner.textContent = `THERE IS A DRAW`;
          }

          count++;
          Gameboard.showPlayerTurn();
        });
      });
    },

    showPlayerTurn: function () {
      const currentTurnStatus = this.getTurnStatus();
      turn.innerHTML = currentTurnStatus;
    },

    getWinner: function () {
      let winnerComb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const comb of winnerComb) {
        if (
          cellArray[comb[0]].textContent === cellArray[comb[1]].textContent &&
          cellArray[comb[1]].textContent === cellArray[comb[2]].textContent &&
          cellArray[comb[0]].textContent !== ''
        ) {
          return true;
        }
      }

      return false;
    },

    // LA CONDICIÓN INICIAL DEL MENSAJE DEL TURNO
    turnStatus: 'PLAYER X TURN',

    // AGREGAMOS UN GET QUE DEVUELVA STATUS DEL TURN EN ESE MOMENTO
    getTurnStatus: function () {
      return this.turnStatus;
    },
    // HACER SET DEL STATUS Y LO AGREGAMOS AL MENSAJE DEL TURNO
    setTurnStatus: function (status) {
      this.turnStatus = status;
    },
  };

  Gameboard.render();

  function handlerOnClickReset() {
    cellArray.forEach((item) => {
      item.innerHTML = '';
    });
    winner.innerHTML = '';
    turn.innerHTML = 'PLAYER X TURN';
  }

  restart.addEventListener('click', handlerOnClickReset);

  // Gameboard.render();
  return { Gameboard, cellContainer: cells, cellArray };
})();
