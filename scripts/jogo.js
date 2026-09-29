
import { incrementarEstatisticas, zerarObjetoStats, stats } from './estatisticas.js';

// Seletores do DOM necessários para o jogo
export const doorTemplate = document.getElementById("door-template");
export const doorsContainer = document.getElementById("doors-container");
export const roundInstructionsBox = document.getElementById("round-instructions");
export const maxDoorsInput = document.getElementById("max-doors");
export const doorsToShowInput = document.getElementById("doors-to-show");
export const autoPlaySpeedInput = document.getElementById("auto-play-speed");
export const autoPlayCheckbox = document.getElementById("auto-play");
const statisticsBoxesList = document.querySelectorAll(".statistics-results > *");

// Mapeamento das caixas de texto HTML para atualizar a tela
const boxes = {
    totalRolls: statisticsBoxesList[0],
    firstGuesses: statisticsBoxesList[1],
    rollsWithChange: statisticsBoxesList[2],
    guessesWithChange: statisticsBoxesList[3],
    rollsWithoutChange: statisticsBoxesList[4],
    guessesWithoutChange: statisticsBoxesList[5],
    totalGuesses: statisticsBoxesList[6],
    guessRate: statisticsBoxesList[7],
    firstGuessRate: statisticsBoxesList[8],
    withChangeGuessRate: statisticsBoxesList[9],
    withoutChangeGuessRate: statisticsBoxesList[10]
};

// Variáveis de Configuração
export const minDoors = parseInt(maxDoorsInput.min);
export const minDoorsToShow = parseInt(doorsToShowInput.min);
export const startDoorAmount = 3;
const doorAmountToShrink = 20;
const minDoorProportion = 1.0 / 3.0;

// Estado interno do Jogo
let correctDoorList = [];
let revealedDoorList = [];
let acertoDePrimeira = false;
let acertoAposRevelacao = false;
let acertoSemRevelacao = false;
let tipoDeJogada = "";
let firstDoorChoosen = undefined;
let portasReveladas = false;
export let escolha = 1;
let milissecondsToNextRound = 3000;
let goToNextPhaseId = undefined;
export let isAutoPlaying = false;
let autoClickIntervalId = undefined;
let autoPlaySpeed = Number(autoPlaySpeedInput.valueAsNumber);

const maxDoorSize = [
    Math.round(Number(window.getComputedStyle(doorsContainer).getPropertyValue("--door-width").slice(0, -2))),
    Math.round(Number(window.getComputedStyle(doorsContainer).getPropertyValue("--door-height").slice(0, -2)))
];
const minDoorSize = [
    parseInt(Math.round(maxDoorSize[0] * minDoorProportion)),
    parseInt(Math.round(maxDoorSize[1] * minDoorProportion))
];

// Funções Visuais Internas
function changeDoorHue(door, hue, detailHue) {
    const doorDrawing = door.querySelector(".door-drawing");
    if (doorDrawing) {
        doorDrawing.style.setProperty("--hue", hue);
        doorDrawing.style.setProperty("--detail-hue", detailHue);
    }
}

function changeDoorSL(door, saturation, lighting) {
    const doorDrawing = door.querySelector(".door-drawing");
    if (doorDrawing) {
        doorDrawing.style.setProperty("--saturation-increase", `${saturation}%`);
        doorDrawing.style.setProperty("--lighting-increase", `${lighting}%`);
    }
}

function changeDoorToSelected(door) {
    changeDoorSL(door, -15, 7);
    door.querySelector(".door-drawing").style.setProperty("outline", "2px solid white");
}

function changeDoorToUnselected(door) {
    changeDoorSL(door, 0, 0);
    door.querySelector(".door-drawing").style.setProperty("outline", "none");
}

// Funções Exportadas do Jogo
export function resetStatisticsInterface() {
    zerarObjetoStats();
    statisticsBoxesList.forEach(box => {
        box.innerText = box.id.includes("rate") ? "0%" : "0";
    });
}

function resetRoundVariables() {
    escolha = 1;
    goToNextPhaseId = undefined;
    portasReveladas = false;
    acertoDePrimeira = false;
    acertoAposRevelacao = false;
    acertoSemRevelacao = false;
    tipoDeJogada = "";
    firstDoorChoosen = undefined;
    if(!isAutoPlaying) roundInstructionsBox.innerHTML = "Choose a door...";
}

export function clearDoors() {
    clearTimeout(goToNextPhaseId);
    resetRoundVariables();
    setDoors(0);
    setDoors();
}

export function setACorrectDoor() {
    correctDoorList = [];
    const doors = document.querySelectorAll(".door");
    const doorAmount = doors.length - 1;
    const correctDoorIndex = Math.floor(Math.random() * doorAmount) + 1;
    
    for (let i = 1; i <= doorAmount; i++) {
        correctDoorList.push(i === correctDoorIndex ? 1 : 0);
    }
}

export function changeDoorsSize() {
    const amountOfDoors = maxDoorsInput.valueAsNumber;
    let newWidth = maxDoorSize[0];
    let newHeight = maxDoorSize[1];

    if (amountOfDoors > minDoors && amountOfDoors < doorAmountToShrink) {
        const widthDeMovimento = (maxDoorSize[0] - minDoorSize[0]) / (doorAmountToShrink - minDoors);
        const heightDeMovimente = (maxDoorSize[1] - minDoorSize[1]) / (doorAmountToShrink - minDoors);
        
        newWidth = maxDoorSize[0] - Math.round(widthDeMovimento * (amountOfDoors - minDoors));
        newHeight = maxDoorSize[1] - Math.round(heightDeMovimente * (amountOfDoors - minDoors));
    } else if (amountOfDoors >= doorAmountToShrink) {
        newWidth = minDoorSize[0];
        newHeight = minDoorSize[1];
    }

    doorsContainer.style.setProperty("--door-width", `${newWidth}px`);
    doorsContainer.style.setProperty("--door-height", `${newHeight}px`);
}

export function setDoors(finalAmount = maxDoorsInput.valueAsNumber) {
    const doors = document.querySelectorAll(".door");
    const previousDoorAmount = doors.length - 1;

    if (previousDoorAmount !== finalAmount) {
        for (let i = previousDoorAmount; i > 0; i--) doors[i].remove();

        for (let i = 1; i <= finalAmount; i++) {
            const newDoorInstance = doorTemplate.firstElementChild.cloneNode(true);
            newDoorInstance.querySelector(".door-index").innerText = `Door-${i}`;
            newDoorInstance.dataset.id = i;
            doorsContainer.appendChild(newDoorInstance);
        }
        setACorrectDoor();
        changeDoorsSize();
    }
}

function revealDoors(selectedDoor) {
    if (portasReveladas) return;

    revealedDoorList = [];
    let indexesToChoose = [];
    const quantidadeParaMostrar = doorsToShowInput.valueAsNumber;
    const doors = document.querySelectorAll(".door");
    const doorAmount = doors.length - 1;

    for (let i = 1; i <= doorAmount; i++) {
        revealedDoorList.push(0);
        if (correctDoorList[i - 1] !== 1 && doors[i] !== selectedDoor) {
            indexesToChoose.push(i - 1);
        }
    }

    for (let i = 0; i < quantidadeParaMostrar; i++) {
        if (indexesToChoose.length === 0) break;
        let randomIndex = indexesToChoose.splice(Math.floor(Math.random() * indexesToChoose.length), 1);
        revealedDoorList[randomIndex] = 1;
    }

    revealedDoorList.forEach((value, index) => {
        if (value === 1) changeDoorHue(doors[index + 1], 0, 0);
    });
    portasReveladas = true;
}

function revealCorrect() {
    const doors = document.querySelectorAll(".door");
    const doorIndex = correctDoorList.indexOf(1) + 1;
    if (doorIndex !== 0) changeDoorHue(doors[doorIndex], 80, 110);
}

export function chooseDoor(door) {
    if (!door) return;
    const doorId = Number(door.dataset.id);

    if (escolha === 1) {
        if (correctDoorList[doorId - 1] === 1) acertoDePrimeira = true;
        escolha = 2;
        firstDoorChoosen = door;
        if(!isAutoPlaying) roundInstructionsBox.innerHTML = "Some wrong doors were shown.<br>Choose a door again...";
        changeDoorToSelected(door);
        revealDoors(door);

    } else if (escolha === 2) {
        if (revealedDoorList[doorId - 1] !== 1) {
            const doors = document.querySelectorAll(".door");
            doors.forEach(value => changeDoorToUnselected(value));
            changeDoorToSelected(door);
            revealCorrect();

            if (door !== firstDoorChoosen) {
                if (correctDoorList[doorId - 1] === 1) acertoAposRevelacao = true;
                tipoDeJogada = "com-revelacao";
            } else {
                if (correctDoorList[doorId - 1] === 1) acertoSemRevelacao = true;
                tipoDeJogada = "sem-revelacao";
            }
            if(!isAutoPlaying){
                if(correctDoorList[doorId-1] === 1){
                    roundInstructionsBox.innerHTML = "You've got it right!";
                }else{
                    roundInstructionsBox.innerHTML = "Sadly, the chances weren't<br>with you now...";
                }
            }
            escolha = -1;
            goToNextPhaseId = setTimeout(atualizarInterfacePontuacao, milissecondsToNextRound);
        }
    }
}

function atualizarInterfacePontuacao() {
    // Envia os dados locais da rodada para o módulo de estatísticas processar
    incrementarEstatisticas(tipoDeJogada, acertoDePrimeira, acertoAposRevelacao, acertoSemRevelacao);
    // Muda o texto de instruções
    if(!isAutoPlaying) roundInstructionsBox.innerHTML = "Choose a door...";
    // Atualiza o DOM puxando os valores calculados de lá
    boxes.totalRolls.innerText = stats.totalRolls;
    boxes.firstGuesses.innerText = stats.firstGuesses;
    boxes.rollsWithChange.innerText = stats.rollsWithChange;
    boxes.guessesWithChange.innerText = stats.guessesWithChange;
    boxes.rollsWithoutChange.innerText = stats.rollsWithoutChange;
    boxes.guessesWithoutChange.innerText = stats.guessesWithoutChange;
    boxes.totalGuesses.innerText = stats.totalGuesses;

    boxes.guessRate.innerText = `${((stats.totalGuesses / stats.totalRolls) * 100).toFixed(2)}%`;
    boxes.firstGuessRate.innerText = `${((stats.firstGuesses / stats.totalRolls) * 100).toFixed(2)}%`;

    if (stats.rollsWithChange !== 0) {
        boxes.withChangeGuessRate.innerText = `${((stats.guessesWithChange / stats.rollsWithChange) * 100).toFixed(2)}%`;
    }
    if (stats.rollsWithoutChange !== 0) {
        boxes.withoutChangeGuessRate.innerText = `${((stats.guessesWithoutChange / stats.rollsWithoutChange) * 100).toFixed(2)}%`;
    }

    resetRoundVariables();
    clearDoors();
}

export function changeAutoPlaying(){
    if(autoPlayCheckbox.checked){
        maxDoorsInput.readOnly = true;
        doorsToShowInput.readOnly = true;
        isAutoPlaying = true;
        milissecondsToNextRound = autoPlaySpeed-5;
        autoClickIntervalId = setInterval(autoClick, autoPlaySpeed);
        roundInstructionsBox.innerHTML = "Auto Playing...";
    }else{
        isAutoPlaying = false;
        milissecondsToNextRound = 3000;
        clearInterval(autoClickIntervalId);
        autoClickIntervalId = undefined;
        maxDoorsInput.readOnly = false;
        doorsToShowInput.readOnly = false;
        if(goToNextPhaseId !== undefined){
            clearTimeout(goToNextPhaseId);
            goToNextPhaseId = undefined;
            atualizarInterfacePontuacao();
        }
        if(escolha === 1){
            roundInstructionsBox.innerHTML = "Choose a door...";
        }else if(escolha === 2){
            roundInstructionsBox.innerHTML = "Some wrong doors were shown.<br>Choose a door again...";
        }
    }
}

function autoClick(){
    const doors = document.querySelectorAll(".door");
    const doorAmount = (doors.length)-1;
    
    if(!portasReveladas){
        const doorToClick = doors[Math.floor(Math.random()*doorAmount)+1];
        chooseDoor(doorToClick);
        return;
    }
    
    let doorToClick;
    const deveTrocarDePorta = Math.random() < 0.5;

    if (!deveTrocarDePorta) {
        doorToClick = firstDoorChoosen;
    } else {
        let doorsToClick = [];
        revealedDoorList.forEach((value, index) => {
            const doorIndex = index+1;
            if (value === 0 && doors[doorIndex] !== firstDoorChoosen) {
                doorsToClick.push(doorIndex);
            }
        });

        const randomTargetIndex = doorsToClick[Math.floor(Math.random() * doorsToClick.length)];
        doorToClick = doors[randomTargetIndex];
    }

    chooseDoor(doorToClick);
}

export function changeAutoPlayingOptions(novoIntervalo){
    autoPlaySpeed = novoIntervalo;
    if(isAutoPlaying){
        milissecondsToNextRound = novoIntervalo-5;
        clearInterval(autoClickIntervalId);
        autoClickIntervalId = setInterval(autoClick, autoPlaySpeed);
        if(goToNextPhaseId !== undefined){
            clearTimeout(goToNextPhaseId);
            goToNextPhaseId = setTimeout(atualizarInterfacePontuacao, milissecondsToNextRound);
        }
    }
}