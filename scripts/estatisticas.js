
// Objeto de controle guardado na memória deste módulo
export let stats = {
    totalRolls: 0,
    firstGuesses: 0,
    rollsWithChange: 0,
    guessesWithChange: 0,
    rollsWithoutChange: 0,
    guessesWithoutChange: 0,
    totalGuesses: 0
};

export function incrementarEstatisticas(tipoDeJogada, acertoDePrimeira, acertoAposRevelacao, acertoSemRevelacao) {
    stats.totalRolls++;
    
    if (tipoDeJogada === "com-revelacao") stats.rollsWithChange++;
    else if (tipoDeJogada === "sem-revelacao") stats.rollsWithoutChange++;
    
    if (acertoDePrimeira) stats.firstGuesses++;

    if (acertoAposRevelacao) {
        stats.guessesWithChange++;
        stats.totalGuesses++;
    }

    if (acertoSemRevelacao) {
        stats.guessesWithoutChange++;
        stats.totalGuesses++;
    }
}

export function zerarObjetoStats() {
    Object.keys(stats).forEach(key => stats[key] = 0);
}
