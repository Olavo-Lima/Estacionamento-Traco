import { service } from "../service/index.js";
import { view } from "../view/index.js"
import { cadastroComponent } from "./cadastro.js";
import { checkoutComponent } from "./checkout.js";

    view.getCheckinHtml();


    let idCheckin = []
    
    service.getActivities().then((dados) => {
        dados.forEach(element => {
            if (element.checkout_at == null) {
                idCheckin.push(element.vehicle_id)
            }
        });
        getVehicle()
    })

 let arrayVehicles = []
 const getVehicle = () => {
    service.getVehicle().then((dados) => {
        dados.forEach((element) => {
            if (idCheckin.includes(element.id)) {
                createNewLine(element)
            } 
            if (element.label != null) {
                arrayVehicles.push(element)
            }
        })
        createOptions(arrayVehicles)
    })
 } 
 
 const createNewLine = (object) => {
    const table = document.getElementById('tbody')
    const newLine = document.createElement('tr')
    const dadosHtml = `
        <td>${object.model}</td>
        <td>${object.label}</td>
        <td>
            <a id="${object.id}" class="btn-link">Checkout</a>
        </td>
        `
    newLine.innerHTML = dadosHtml

    return table.appendChild(newLine)
    }

 const createOptions = (arrayVehicles) => {
    const vehicleFilter = []
    arrayVehicles.forEach((element) => {
        idCheckin.includes(element.id) ? 
        console.log("Já está estacionado") : 
        vehicleFilter.push(element)
    })

    const select = document.getElementById('select')
    vehicleFilter.forEach((element) => {
        const option = new Option(element.label, element.id);
        select.add(option);
    })
 }

 const main = document.getElementById('root')

 main.addEventListener('click', (event) => {
    const target = event.target;

    // Percorre os elementos pai até encontrar um elemento com a classe 'btn-link'
    while (target && !target.classList.contains('btn-link')) {
        target = target.parentNode;
    }

    if (target) {
        const button = target.innerText;
        const id = target.id;

        if (button === "Checkout") {
            checkoutComponent(id)
        }
        if (button === "Checkin") {
            const select = document.getElementById('select')
            searchID(select.value)
        }
        if (button === "Adicionar Novo") {
            cadastroComponent()
        }
    }
 })

 const searchID = (id) => {
    service.getVehicle().then((dados) => {
        dados.forEach((element) => {
            if (element.id == id) {
                checkinApi(element)
            }
        })
    })
 } 

 const checkinApi = (objeto) => {
    service.postCheckin(objeto.label).then((dados) => {
        alert(dados.message)
        window.location.reload()
    })
 }