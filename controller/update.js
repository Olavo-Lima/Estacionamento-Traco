import { service } from "../service/index.js"
import { view } from "../view/index.js"
import { listaClienteComponent } from "./listaClientes.js"

export const updateComponent = (idParams) => {
    view.getUpdate()

    service.getVehicle().then((dados) => {
        dados.forEach(element => {
            if(element.id == idParams) {
                console.log(element)
                addParamsInInput(element)
            }
        });
    })

    const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit', function (event) {
        event.preventDefault()

        const atualizaCliente = {
            owner: document.getElementById('name').value,
            model: document.getElementById('modelo').value,
            type: document.getElementById('tipo').value,
            label: document.getElementById('placa').value,
            observation: document.getElementById('observacoes').value
        }
        service.putVeiculo(atualizaCliente, idParams).then(() => {
            cancelar()
            listaClienteComponent();
        })
    })
}

const addParamsInInput = (objeto) => {

        document.getElementById('name').value = objeto.owner
        document.getElementById('modelo').value = objeto.model
        document.getElementById('tipo').value = objeto.type
        document.getElementById('placa').value = objeto.label
        document.getElementById('observacoes').value = objeto.observation       
}


const cancelar = () => {
    const formulario = document.getElementById('formulario')
    formulario.reset()
}