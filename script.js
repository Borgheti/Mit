let selectedComponent = null;

/* Criar componentes */
function addLabel() {
    const el = document.createElement("p");
    el.innerText = "Novo Label";
    el.onclick = () => selectComponent(el);
    document.getElementById("screen").appendChild(el);
}

function addButton() {
    const el = document.createElement("button");
    el.innerText = "Botão";
    el.onclick = () => selectComponent(el);
    document.getElementById("screen").appendChild(el);
}

function addInput() {
    const el = document.createElement("input");
    el.placeholder = "Digite aqui...";
    el.onclick = () => selectComponent(el);
    document.getElementById("screen").appendChild(el);
}

/* EDITAR COMPONENTE */
function selectComponent(el) {
    selectedComponent = el;
    document.getElementById("codeArea").value = el.outerHTML;
}

/* Atualiza componente com o código do editor */
document.getElementById("codeArea").addEventListener("input", () => {
    if (selectedComponent) {
        selectedComponent.outerHTML = document.getElementById("codeArea").value;
    }
});

/* Salvar projeto */
function saveProject() {
    const data = document.getElementById("screen").innerHTML;
    localStorage.setItem("meuProjetoMIT", data);
    alert("Projeto salvo!");
}

/* Carregar projeto */
function loadProject() {
    const data = localStorage.getItem("meuProjetoMIT");
    if (data) {
        document.getElementById("screen").innerHTML = data;
        alert("Projeto carregado!");
    } else {
        alert("Nenhum projeto salvo.");
    }
}
