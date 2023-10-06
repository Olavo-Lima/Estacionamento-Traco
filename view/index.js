
const getCadastro = () => {
    const main = document.getElementById('root')
    const dadosHtml = `
        <form id="formulario">
            <h1>Novo Cliente</h1>
            <label>Nome do Cliente</label>
            <input id="name" type="text" placeholder="Digite o seu nome">
            <br/><br/>
            <label>Modelo</label>
            <input id="modelo" type="text" placeholder="Digite o modelo do veículo">
            <br/><br/>
            <label>Tipo</label>
            <select id="tipo" type="text" placeholder="Digite o tipo do veículo">
                <option value="1">Carro</option>
                <option value="0">Moto</option>
            </select>
            <br/><br/>
            <label>Placa</label>
            <input id="placa" type="text" placeholder="Digite a placa do veículo">
            <br/><br/>
            <label>Observações</label>
            <input id="observacoes" type="text" placeholder="Digite a observação:">
            <br/><br/>
            <div>
                <button id="cancel" type="button">Cancelar</button>
                <button id="save" type="submit">Salvar</button>
            </div>
        </form>
    `

main.innerHTML = dadosHtml
}

const getListaClientesHTML = () => {
    const main = document.getElementById('root')
    const dadosHtml = `
    <section>
        <h1>Lista de Clientes</h1>
            <table id="tbody">
                <tr >
                    <th>Clinte</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Observações</th>
                    <th><a>Novo</a></th>
                </tr>
            </table>
    </section>
    `
    main.innerHTML = dadosHtml
}

const getUpdate = () => {
    const main = document.getElementById('root')
    const dadosHtml = `
        <form id="formulario">
            <h1>Editar Cliente</h1>
            <label>Nome do Cliente</label>
            <input id="name" type="text" placeholder="Digite o seu nome">
            <br/><br/>
            <label>Modelo</label>
            <input id="modelo" type="text" placeholder="Digite o modelo do veículo">
            <br/><br/>
            <label>Tipo</label>
            <select id="tipo" type="text" placeholder="Digite o tipo do veículo">
                <option value="1">Carro</option>
                <option value="0">Moto</option>
            </select>
            <br/><br/>
            <label>Placa</label>
            <input id="placa" type="text" placeholder="Digite a placa do veículo">
            <br/><br/>
            <label>Observações</label>
            <input id="observacoes" type="text" placeholder="Digite a observação:">
            <br/><br/>
            <div>
                <button id="cancel" type="button">Cancelar</button>
                <button id="save" type="submit">Atualizar</button>
            </div>
        </form>
    `

main.innerHTML = dadosHtml
}

const getCheckinHtml = () => {
    const main = document.getElementById('root')
    const dadosHtml = `
        
    `
}

export const view = {
    getListaClientesHTML,
    getCadastro,
    getUpdate
}