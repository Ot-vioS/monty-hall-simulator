
import { 
    chooseDoor, clearDoors, resetStatisticsInterface, setDoors,
    maxDoorsInput, doorsToShowInput, doorsContainer, minDoors, minDoorsToShow, startDoorAmount,
    autoPlaySpeedInput, autoPlayCheckbox, changeAutoPlaying, isAutoPlaying, changeAutoPlayingOptions
} from './jogo.js';

const resetStatisticsButton = document.querySelector(".reset-statistics");
const resetConfigsButton = document.querySelector(".reset-configs");

function resetConfigurations() {
    maxDoorsInput.value = startDoorAmount;
    maxDoorsInput.dataset.lastNumber = startDoorAmount;
    doorsToShowInput.value = 1;
    doorsToShowInput.max = 1;
    doorsToShowInput.dataset.lastNumber = 1;
    autoPlaySpeedInput.value = 100;
    autoPlaySpeedInput.dataset.lastNumber = 100;
    changeAutoPlayingOptions(100);
    resetStatisticsInterface();
    clearDoors();
}

function configsChanged(id) {
    if (id === "max-doors") {
        const quantidadeAnterior = parseInt(maxDoorsInput.dataset.lastNumber);
        const novaQuantidade = maxDoorsInput.valueAsNumber;

        if (isNaN(novaQuantidade) || novaQuantidade < minDoors || isAutoPlaying) {
            maxDoorsInput.value = quantidadeAnterior;
        } else {
            clearDoors();
            resetStatisticsInterface();
            maxDoorsInput.dataset.lastNumber = novaQuantidade;
            doorsToShowInput.max = novaQuantidade - 2;
            if (doorsToShowInput.valueAsNumber > parseInt(doorsToShowInput.max)) {
                doorsToShowInput.value = parseInt(doorsToShowInput.max);
                doorsToShowInput.dataset.lastNumber = doorsToShowInput.valueAsNumber;
            }
        }
    } else if (id === "doors-to-show") {
        const quantidadeAnterior = parseInt(doorsToShowInput.dataset.lastNumber);
        const novaQuantidade = doorsToShowInput.valueAsNumber;

        if (isNaN(novaQuantidade) || novaQuantidade < minDoorsToShow || isAutoPlaying) {
            doorsToShowInput.value = quantidadeAnterior;
        } else if (novaQuantidade > parseInt(doorsToShowInput.max)) {
            doorsToShowInput.value = parseInt(doorsToShowInput.max);
            doorsToShowInput.dataset.lastNumber = doorsToShowInput.valueAsNumber;
            clearDoors();
            resetStatisticsInterface();
        } else {
            doorsToShowInput.dataset.lastNumber = novaQuantidade;
            clearDoors();
            resetStatisticsInterface();
        }
    } else if (id === "auto-play-speed") {
        const novoIntervalo = Number(autoPlaySpeedInput.value);
        if (isNaN(novoIntervalo) || novoIntervalo < autoPlaySpeedInput.min){
            autoPlaySpeedInput.value = parseInt(autoPlaySpeedInput.dataset.lastNumber);
        }else{
            autoPlaySpeedInput.dataset.lastNumber = novoIntervalo;

            changeAutoPlayingOptions(novoIntervalo);
        }
    }
}

// Liga os eventos usando as funções importadas
maxDoorsInput.addEventListener("change", () => configsChanged("max-doors"));
doorsToShowInput.addEventListener("change", () => configsChanged("doors-to-show"));
autoPlaySpeedInput.addEventListener("change", () => configsChanged("auto-play-speed"));
doorsContainer.addEventListener("click", (event) => {if(!isAutoPlaying) chooseDoor(event.target.closest(".door"));});
resetStatisticsButton.addEventListener("click", resetStatisticsInterface);
resetConfigsButton.addEventListener("click", () => {if(!isAutoPlaying) resetConfigurations();});
autoPlayCheckbox.addEventListener("change", changeAutoPlaying);

// Inicializa o jogo pela primeira vez
setDoors();
