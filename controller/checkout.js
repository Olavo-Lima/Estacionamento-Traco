import { service } from "../service/index.js"
import { view } from "../view/index.js"

export const checkoutComponent = (idParams) => {
    view.getCheckout()

    service.getVehicle().then((dados) => {
        dados.forEach(element => {
            if (element.id == idParams) {
                addParamsInHTML(element)
                searchRegist(idParams)
            }
        });
    })
}

let placa = ''
const addParamsInHTML = (objeto) => {
    placa = objeto.label
    const newLine = document.getElementById('tbody')
    const dadosHtml = `
        <td>${objeto.owner}</td>
        <td>${objeto.model}</td>
        <td>${objeto.label}</td>
    ` 
    newLine.innerHTML = dadosHtml      
}

const searchRegist = (id) => {
    service.getActivities().then((dados) => {
        dados.forEach(element => {
            if (element.vehicle_id == id) {
                addParamsInInput(element)
            }
        });
    })
}

const valorHora = 2; // Corrigi a variável para "valorHora" (com "H" maiúsculo) para coincidir com a utilizada no cálculo.
const valorMinuto = valorHora / 60;

const addParamsInInput = (element) => {
    const checkin = new Date(element.checkin_at);
    const checkout = new Date();
    const tempo = checkout - checkin; // Tempo em milissegundos
    const tempoEmMinutos = tempo / 60000; // Conversão para minutos
    const hora = calcularHora(tempo)

    // Cálculo do valor a pagar
    const totalPagar = tempoEmMinutos * valorMinuto;

    console.log(totalPagar);

    const inputHora = document.getElementById('totalHora');
    const inputTotal = document.getElementById('valorPagar');
    
    if(hora.minutos < 10 && hora.horas < 10)
        inputHora.value = `Tempo 0${hora.horas}:0${hora.minutos}`;

    if (hora.horas < 10)
        inputHora.value = `Tempo 0${hora.horas}:${hora.minutos}`;

    if (hora.minutos < 10)
        inputHora.value = `Tempo ${hora.horas}:0${hora.minutos}`;

    if (totalPagar < 10) {
        inputTotal.value = `R$: 0${totalPagar.toFixed(2)}`;

    } else {
        inputTotal.value = `R$: ${totalPagar.toFixed(2)}`;
    }

    const finalizar = document.getElementById('finalizar')
    finalizar.addEventListener('click', () => {
        const preco = document.getElementById('valorPagar').value
        const stringPreco = preco.split(' ')
        const objeto = {
            label: placa,
            price: Number(stringPreco[1])
        }
        checkoutAPI(objeto)
    })
};

const calcularHora = (timeInMiliSec) => {
    const tempo = {
        horas: Math.floor(timeInMiliSec / 3600000), // Horas completas
        minutos: Math.floor((timeInMiliSec / 60000) % 60) // Minutos
    };
    return tempo;
};

const checkoutAPI = (objeto) => {
    service.putCheckout(objeto).then(() => {
        location.href = "../checkin.html"
    })
}
