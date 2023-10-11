import { service } from "../service/index.js"
import { view } from "../view/index.js"

export const faturamentoComponent = () => {
    view.getFaturamentoHtml()

    let objetoFaturamento = []
    service.getActivities().then((dados) => {
        dados.forEach(element => {
            if (element.price != null) {
                objetoFaturamento.push(element)
            }
        });
        gerarObjetosDatas()
        gerarFaturamento()
    })

    let datasFiltradas = []
    const gerarObjetosDatas = () => {
        const datasBrutas = []
        objetoFaturamento.forEach((element) => {
            datasBrutas.push(dataConvert(element.checkout_at))
        })
        datasFiltradas = new Set(datasBrutas)
    }

    const dataConvert = (tempo) => {
        const data = new Date(tempo).getDate()
        return data
    }
    
    const gerarFaturamento = () => {
        let valor = {
            contador: 0,
            total: 0
        }
        objetoFaturamento.forEach((element) => {
            if (typeof element.price == "number") {
                valor.contador++
                valor.total += element.price
            }
        })
        createNewLine(valor)
        createOptions(datasFiltradas)
    }

    const tabela = document.getElementById('tbody')
    const createNewLine = (valor) => {
        const newLine = document.createElement('tr')
        const dadosHtml = `
            <td id="qtd">${valor.contador}</td>
            <td id="total">R$ ${valor.total.toFixed(2)}</td>
            <td><select id="datas"></select></td>
        `
        newLine.innerHTML = dadosHtml
        return tabela.appendChild(newLine) 
    } 
    const createOptions = (datas) => {
        const select = document.getElementById('datas')
        datas.forEach(element => {
            const option = new Option(element, element)
            select.add(option)
        });
    }

    tabela.addEventListener('click', (event) => {
        console.log(event)
    })
}

