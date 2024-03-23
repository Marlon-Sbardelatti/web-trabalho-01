let treinos = document.getElementById("treinos_container");
let treinos_form = document.getElementById("treinos_form");
let formButton = document.getElementById("form_button");
let gridContainer = document.getElementById("grid-container");

function create() {
    let input_nome = document.createElement("input");
    let input_rep = document.createElement("input");
    let input_ser = document.createElement("input");
    let deleteIcon = document.createElement("img");
    let div = document.createElement("div");
    deleteIcon.src = "../assets/imgs/delete-icon.png";
    deleteIcon.className = "delete-icon";
    deleteIcon.setAttribute("onclick", "deleteTD(event)");
    input_rep.type = "number";
    input_ser.type = "number";

    input_nome.placeholder = "Nome do Exercício";
    input_rep.placeholder = "Repetições";
    input_ser.placeholder = "Séries";

    input_nome.className = "input_treinos";
    input_ser.className = "input_treinos";
    input_rep.className = "input_treinos";

    let br = document.createElement("br");
    div.appendChild(br);
    div.appendChild(input_nome);
    div.appendChild(input_rep);
    div.appendChild(input_ser);
    div.appendChild(deleteIcon);
    treinos_form.appendChild(div);
}

function save(event) {
    let inputs = [];

    for (let i = 0; i < treinos.getElementsByTagName("input").length; i++) {
        const element = treinos.getElementsByTagName("input")[i];
        if (element.value == null || element.value == "") {
            event.preventDefault();
        }
        inputs.push(element.value);
    }
    // verificando se inputs estao vazios
    if (!verificarInputs(inputs)) {
        alert("Os campos não podem estar vazios.");
    } else {
        let treinosStorage = localStorage.getItem("treinos");

        if (treinosStorage == null) {
            let treinos = [];
            treinos.push(inputs);
            let obj = JSON.stringify(treinos);
            localStorage.setItem("treinos", obj);
        } else {
            //verificando depois de saber se é null para não ocorrer erro de varrer algo nulo
            //ou seja, verificando somente depois ter mais de um elemento
            if (verificarExistencia(inputs[0])) {
                alert("Um treino com esse nome já existe, por favor altere.");
                return;
            }
            let treinos = localStorage.getItem("treinos");
            let treinos_obj = JSON.parse(treinos);
            let temp_arr = [];

            for (let i = 0; i < treinos_obj.length; i++) {
                const element = treinos_obj[i];
                temp_arr.push(element);
            }

            temp_arr.push(inputs);
            temp_arr = JSON.stringify(temp_arr);
            localStorage.setItem("treinos", temp_arr);
        }

        location.reload(true);
    }
}
function verificarInputs(inputs) {
    let found = false;
    inputs.forEach((element) => {
        if (element == "") {
            found = true;
        }
    });

    if (!found) {
        return true;
    } else {
        return false;
    }
}
function verificarExistencia(nome) {
    let found = false;
    let treinos = localStorage.getItem("treinos");
    treinos = JSON.parse(treinos);
    treinos.forEach((element) => {
        if (nome == element[0]) {
            found = true;
        }
    });

    return found;
}

function render(event) {
    let treinos = localStorage.getItem("treinos");
    if (treinos == null || treinos.length == 2) {
        document.getElementById("empty-div").setAttribute("style", "display: block");
        // document.getElementById("empty-div").innerHTML = "";
        // let div = document.createElement("div");
        // div.setAttribute("id", "empty-div");
        // let phrase = document.createElement("h1");
        // phrase.innerText = "Você ainda não possui treinos";
        // phrase.setAttribute("id", "phrase");
        // let criar = document.createElement("button");
        // criar.setAttribute("id", "button-empty");
        // let link = document.createElement("a");
        // link.setAttribute("href", "../public/criar.html");
        // link.innerText = "CRIAR";
        // criar.appendChild(link);
        // div.appendChild(phrase);
        // div.appendChild(criar);
        // document.body.appendChild(div);
    } else {
        // document.getElementById("empty-div").innerHTML = "";
        document.getElementById("empty-div").setAttribute("style", "display: none");
        let treinos_obj = JSON.parse(treinos);
        treinos_obj.forEach((element) => {
            renderElement(element);
        });
    }

    // console.log(JSON.parse(treinos));
}
function deleteAll(event) {
    let currentDiv = event.target.parentElement;
    localStorage.setItem(
        "table-to-edit",
        currentDiv.querySelector("h2").innerText,
    );

    //maybe?
    // setTimeout((e) => {
    //     let newTreinos = removerTreinoAtual();
    //     console.log(newTreinos)
    // }, 500)

    let newTreinos = removerTreinoAtual();
    newTreinos = JSON.stringify(newTreinos);
    localStorage.setItem("treinos", newTreinos);
    location.reload(true);
}

function save_user(event) {
    let user = document.forms[0].elements[0].value;
    let password = document.forms[0].elements[1].value;

    if (user == "" || user == null || user == undefined) {
        if (password == "" || password == null || password == undefined) {
            alert("Prencha todos os campos.");
            event.preventDefault();
        } else {
            alert("Prencha o usuário.");
            event.preventDefault();
        }
    } else if (password == "" || password == null || password == undefined) {
        alert("Prencha a senha.");
        event.preventDefault();
    }
    sessionStorage.setItem("user", user);
}

window.addEventListener("load", (event) => {
    // console.log(event.currentTarget.location.href)
    // verificando se estou no path que preciso usar o render()
    // if (
    // 	event.currentTarget.location.href ==
    // 	"http://127.0.0.1:8080/public/treinos.html"
    // ) {
    // 	render();
    // }

    // if (
    // 	event.currentTarget.location.href ==
    // 	"http://127.0.0.1:8080/public/editar.html"
    // ) {
    // 	renderEdit();
    // }
    document.getElementById("user_menu").innerText =
        sessionStorage.getItem("user");
});

function showPassword() {
    let pswInput = document.getElementById("password_field");
    if (pswInput.type === "password") {
        pswInput.type = "text";
    } else {
        pswInput.type = "password";
    }
}

function editTable(event) {
    let currentDiv = event.target.parentElement;
    localStorage.setItem(
        "table-to-edit",
        currentDiv.querySelector("h2").innerText,
    );
    window.location.href = "../public/editar.html";
}

function renderEdit(event) {
    let tableName = localStorage.getItem("table-to-edit");
    let treinos = JSON.parse(localStorage.getItem("treinos"));
    let exercise = [];
    treinos.forEach((element) => {
        if (element[0] == tableName) {
            tableToEdit(element);
        }
    });
}

function tableToEdit(data) {
    let nome = document.getElementById("nome-exe");
    nome.value = data[0];
    let form = document.getElementById("form-editar");

    let count = 0;
    let div = document.createElement("div");
    for (let i = 0; i < data.length; i++) {
        if (i != 0) {
            switch (count) {
                case 0:
                    let input = document.createElement("input");
                    input.value = data[i];
                    input.placeholder = "Nome";
                    let br = document.createElement("br");
                    div.appendChild(br);
                    div.appendChild(input);
                    count++;
                    break;
                case 1:
                    let input1 = document.createElement("input");
                    input1.type = "number";
                    input1.placeholder = "Repetições";
                    input1.value = data[i];
                    div.appendChild(input1);
                    count++;
                    break;
                case 2:
                    let input2 = document.createElement("input");
                    input2.value = data[i];
                    input2.type = "number";
                    input2.placeholder = "Séries";
                    form.appendChild(input2);
                    let deleteIcon = document.createElement("img");
                    deleteIcon.src = "../assets/imgs/delete-icon.png";
                    deleteIcon.className = "delete-icon";
                    deleteIcon.setAttribute("onclick", "deleteTD(event)");
                    div.appendChild(input2);
                    div.appendChild(deleteIcon);
                    form.appendChild(div);
                    count = 0;
                    div = document.createElement("div");
                    break;

                default:
                    break;
            }
        }
    }
}

function saveEdit(event) {
    let newArr = [];
    let inputs = document
        .getElementById("editar-container")
        .querySelectorAll("input");

    if (!verificarInputEditar(inputs)) {
        alert("Os campos não podem estar vazios.");
    } else {
        inputs.forEach((element) => {
            newArr.push(element.value);
        });

        let temp = removerTreinoAtual();

        temp.push(newArr);
        temp = JSON.stringify(temp);

        localStorage.setItem("treinos", temp);
        window.location.href = "../public/treinos.html";
    }
}
function verificarInputEditar(inputs) {
    let found = false;
    inputs.forEach((element) => {
        if (element.value == "") {
            found = true;
        }
    });

    if (!found) {
        return true;
    } else {
        return false;
    }
}

function removerTreinoAtual() {
    let treinos = JSON.parse(localStorage.getItem("treinos"));
    let nome = localStorage.getItem("table-to-edit");

    let temp = treinos.filter((element) => {
        return element[0] !== nome;
    });

    return temp;
}

function createEdit() {
    let div = document.createElement("div");
    let form = document.getElementById("form-editar");
    let nome = document.createElement("input");
    nome.placeholder = "Nome";
    let series = document.createElement("input");
    series.placeholder = "Séries";
    series.type = "number";
    let reps = document.createElement("input");
    reps.placeholder = "Repetições";
    reps.type = "number";
    let br = document.createElement("br");
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "../assets/imgs/delete-icon.png";
    deleteIcon.className = "delete-icon";
    deleteIcon.setAttribute("onclick", "deleteTD(event)");
    div.appendChild(br);
    div.appendChild(nome);
    div.appendChild(reps);
    div.appendChild(series);
    div.appendChild(deleteIcon);
    form.appendChild(div);
}

function deleteTD(event) {
    let parent = event.target.parentElement;
    console.log(parent);
    parent.remove();
}

// deleta tudo no editar
function deleteEdit(event) {
    let newTreinos = removerTreinoAtual();
    newTreinos = JSON.stringify(newTreinos);
    localStorage.setItem("treinos", newTreinos);
}

function pesquisar(event) {
    let field = document.getElementById("input-pesquisa");
    if (field == null || field.value == "") {
        alert("Preencha o campo ");
    } else {
        let treinos = localStorage.getItem("treinos");
        treinos = JSON.parse(treinos);
        let found = false;
        treinos.forEach((element) => {
            if (element[0] == field.value) {
                document.getElementById("grid-container").innerHTML = "";
                renderElement(element)
                found = true;
            }
        });
        if (!found) {
            alert("Treino não encontrado")
        }
    }
}

// document.getElementById("input-pesquisa").addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         pesquisar();
//     }
// })

function verificarEnter(event){
    if (event.key === "Enter") {
        pesquisar();
    }
}

function renderElement(element) {
    let card = document.createElement("div");
    card.className = "card";
    let container = document.createElement("container");
    container.className = "container";
    let grupo = document.createElement("h2");
    grupo.innerText = element[0];
    container.appendChild(grupo);
    let table = document.createElement("table");
    table.contentEditable = "false";
    let body = table.createTBody();
    let tr = document.createElement("tr");
    let nome = document.createElement("th");
    nome.innerText = "Nome";
    let series = document.createElement("th");
    series.innerText = "Séries";
    let reps = document.createElement("th");
    reps.innerText = "Reps";
    tr.appendChild(nome);
    tr.appendChild(series);
    tr.appendChild(reps);
    body.appendChild(tr);

    let trData = document.createElement("tr");
    let count = 0;
    for (let i = 0; i < element.length; i++) {
        if (i != 0) {
            const e = element[i];
            switch (count) {
                case 0:
                    let nome = document.createElement("td");
                    nome.innerText = e;
                    trData.appendChild(nome);
                    count++;
                    break;
                case 1:
                    let series = document.createElement("td");
                    series.innerText = e;
                    trData.appendChild(series);
                    count++;
                    break;
                case 2:
                    let reps = document.createElement("td");
                    reps.innerText = e;
                    trData.appendChild(reps);
                    body.appendChild(trData);
                    trData = document.createElement("tr");
                    count = 0;
                    break;

                default:
                    break;
            }
        }
    }
    let img = document.createElement("img");
    img.className = "edit-icon";
    img.src = "../assets/imgs/edit-icon.png";
    img.setAttribute("onclick", "editTable(event)");

    let deleteIcon = document.createElement("img");
    deleteIcon.className = "delete-icon";
    deleteIcon.src = "../assets/imgs/lixeira60.png";
    deleteIcon.setAttribute("onclick", "deleteAll(event)");

    // body.appendChild(trData);
    container.appendChild(img);
    container.appendChild(table);
    container.appendChild(deleteIcon);

    card.appendChild(container);
    gridContainer.appendChild(card);
}
