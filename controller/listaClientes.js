import { service } from "../service/index.js"
import { view } from "../view/index.js"
import { updateComponent } from "./update.js"

export const listaClienteComponent = () => {
    view.getListaClientesHTML()

    service.getVehicle().then((dados) => {
        dados.forEach((element) => {
            if(element.owner != null && element.label !== null) {
                createNewLine(element.owner, element.model, element.label, element.type, element.observation, element.id)
            }
        });
    })
    const table = document.getElementById('tbody');
table.addEventListener('click', (event) => {
    const target = event.target;

    // Percorre os elementos pai até encontrar um elemento com a classe 'btn-link'
    while (target && !target.classList.contains('btn-link')) {
        target = target.parentNode;
    }

    if (target) {
        const button = target.innerText;
        const id = target.id;

        if (button === "Editar") {
            updateComponent(id);
        }
        if (button === "Excluir") {
            deletar(id)
        }
        if (button === "Novo") {
            console.log(button);
        }
    }
});

    

const createNewLine = (cliente, modelo, placa, tipo, observacoes, id) => {
    const table = document.getElementById('tbody')
    const newLine = document.createElement('tr')
    const dadosHtml = `
        <td class="none">${cliente}</td>
        <td>${modelo}</td>
        <td>${placa}</td>
        <td class="none">${tipo}</td>
        <td class="none">${observacoes}</td>
        <td>
            <div class="lista-btn">
                <a id="${id}" class="btn-link editar">Editar</a>
                <a id="${id}" class="btn-link" type="button">Excluir</a>
            </div>
        </td>
        `
    newLine.innerHTML = dadosHtml
    return table.appendChild(newLine)
    }
}

const deletar = (id) => {
    service.deleteVehicle(id).then(() => {
        listaClienteComponent()
    })
}

