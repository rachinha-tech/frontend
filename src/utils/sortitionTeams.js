export const sortTeams = (amount = 2, persons = []) => {
  // Pergunta ao usuário quantos times ele deseja criar
  const numTimes = amount;

  // Cria uma matriz vazia para cada time
  const times = [];
  for (let i = 0; i < numTimes; i++) {
    times.push([]);
  }

  // Pede ao usuário para inserir o nome de cada jogador e adiciona-os aleatoriamente aos times
  const jogadores = persons;
  jogadores.sort(() => Math.random() - 0.5);
  let contador = 0;
  while (jogadores.length > 0) {
    const jogadorAtual = jogadores.shift();
    times[contador % numTimes].push(jogadorAtual);
    contador++;
  }

  // Cria um array com os nomes dos times e jogadores, separando cada time em um sub-array
  const arrayDeTimes = [];
  for (let i = 0; i < numTimes; i++) {
    const timeAtual = times[i];
    const arrayDoTime = [];
    for (let j = 0; j < timeAtual.length; j++) {
      arrayDoTime.push(timeAtual[j]);
    }
    arrayDeTimes.push(arrayDoTime);
  }

  // Retorna o array de times separado por sub-arrays
  return arrayDeTimes;
};
