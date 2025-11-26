let components = [];
let selectedId = null;

function addComponent(type) {
    const id = Date.now().toString();
    const div = document.createElement("div");

    div.className = "component";
    div.innerText = type;
    div.dataset.id = id;

    div.onclick = () => selectComponent(id);

    document.getElementById("screen").appendChild(div);

    components.push({
        id,
        type,
        code: ""
    });
}

function selectComponent(id) {
    selectedId = id;
    const comp = components.find(c => c.id === id);
    document.getElementById("codeArea").value = comp.code;
}

function applyCode() {
    if (!selectedId) return alert("Selecione um componente!");

    const comp = components.find(c => c.id === selectedId);
    comp.code = document.getElementById("codeArea").value;

    // executar o código do componente
    try {
        eval(comp.code);
        alert("Código aplicado!");
    } catch (e) {
        alert("Erro no código: " + e);
    }
}

function saveProject() {
    const data = JSON.stringify(components);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "projeto.json";
    a.click();
}

function loadProject() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            components = JSON.parse(reader.result);
            renderLoadedProject();
        };

        reader.readAsText(file);
    };

    input.click();
}

function renderLoadedProject() {
    const screen = document.getElementById("screen");
    screen.innerHTML = "";

    components.forEach(comp => {
        const div = document.createElement("div");
        div.className = "component";
        div.innerText = comp.type;
        div.dataset.id = comp.id;

        div.onclick = () => selectComponent(comp.id);

        screen.appendChild(div);
    });
}