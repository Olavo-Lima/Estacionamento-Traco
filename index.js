import { cadastroComponent } from "./controller/cadastro.js";
import { listaClienteComponent } from "./controller/listaClientes.js";

const link = document.getElementById('link')

link.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
        const option = target.innerText;
        switch(option) {
            case "Cadastro":
                cadastroComponent();
                break;
            case "Clientes":
                listaClienteComponent()
                break;   
            case "Checkin": {
                window.location.href = "/checkin.html"
                break
            } 

        }
    }
})