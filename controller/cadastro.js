import { service } from "../service/index.js"
import { view } from "../view/index.js"

export const cadastroComponent = () => {
    let label = []
    service.getVehicle().then((dados) => {
        dados.forEach(element => {
            if (element.label != null) {
                label.push(element.label)
            }
        });
    })

    view.getCadastro()

    const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit', function (event) {
        event.preventDefault()

        const cadastroCliente = {
            owner: document.getElementById('name').value,
            model: document.getElementById('modelo').value,
            type: document.getElementById('tipo').value,
            label: document.getElementById('placa').value,
            observation: document.getElementById('observacoes').value
        }

        if (label.includes(cadastroCliente.label)) {
            return alert(`A placa: ${cadastroCliente.label} já está cadastrada no banco.`)
        } else {
            service.postVeiculo(cadastroCliente)
        }
    })
}