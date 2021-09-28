const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  //   let puntosJugador = 0,
  //     puntosComputadora = 0;
  let puntosJugadores = [];
  // Referencia del HTML
  const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll("small");

  // Está función inicializa el juego

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach( elem => elem.innerText = 0);
    divCartasJugadores.forEach( elem => elem.innerHTML = '');

    btnPedir.disabled = false;
    btnDetener.disabled = false;

  };

  // Esta función crear una nueva baraja
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    return _.shuffle(deck);
  };

  // Esta función me permite tomar una nueva carta del deck
  var pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    const carta = _.sample(deck);
    let cartaIndex = deck.indexOf(carta);
    deck.splice(cartaIndex, 1);
    return carta;
  };

  const valorCarta = (carta) => {
    // Obtenemos el valor de la carta
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  //Turno: 0 = primer Jugador y el ultimo es la computadora
  const acumulaPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  //Función que permite crear la carta en el front
  const crearCarta = ( carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append( imgCarta );

  };

 // Función para determinar el ganador
  const determinaGanador = () => {

    const [ puntosMinimos, puntosComputadora ] = puntosJugadores;
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
          alert("Empate!!!");
        } else if (puntosMinimos > 21) {
          alert("Ha ganado la computadora");
        } else if (puntosComputadora > puntosMinimos && puntosComputadora <= 21) {
          alert("Ha ganado la computadora");
        } else {
          alert("Has Ganado!!");
        }
      }, 100);
  }

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;  
    do {
      // Se Acumulan los puntos de la computadora en un arreglo
      const carta = pedirCarta();
      puntosComputadora = acumulaPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

    } while ((puntosComputadora < puntosMinimos && puntosMinimos <= 21));

    determinaGanador();
  };

  //Eventos

  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumulaPuntos(carta, 0);

    crearCarta( carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, genial");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
    
  });

  btnDetener.addEventListener('click', () => {

    const puntosJugador = puntosJugadores[0]
    //console.log(puntosJugador);
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
  });

//   btnNuevo.addEventListener('click', () => {
//     console.clear();
//     inicializarJuego();
//   });

  return {
        nuevoJuego: inicializarJuego
  };

})();
