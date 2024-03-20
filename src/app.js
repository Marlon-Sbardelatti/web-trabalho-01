let treinos = document.getElementById("treinos_container");
let treinos_form = document.getElementById("treinos_form");
let formButton = document.getElementById("form_button");
let gridContainer = document.getElementById("grid-container");

function create() {
    let input_nome = document.createElement("input");
    let input_rep = document.createElement("input");
    let input_ser = document.createElement("input");
    input_rep.type = "number";
    input_ser.type = "number";

    input_nome.placeholder = "Nome do Exercício";
    input_rep.placeholder = "Repetições";
    input_ser.placeholder = "Séries";

    input_nome.className = "input_treinos";
    input_ser.className = "input_treinos";
    input_rep.className = "input_treinos";

    let br = document.createElement("br");
    treinos_form.appendChild(br);
    treinos_form.appendChild(input_nome);
    treinos_form.appendChild(input_rep);
    treinos_form.appendChild(input_ser);
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
    // verificando inputs
    if (!verificarInputs(inputs)) {
        alert("Os campos não podem estar vazios.");
    } else {
        let t = localStorage.getItem("treinos");

        if (t == null) {
            let treinos = [];
            treinos.push(inputs);
            let obj = JSON.stringify(treinos);
            localStorage.setItem("treinos", obj);
            render();
        } else {
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
            render();
        }

        console.log("saved");
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

function render(event) {
    let treinos = localStorage.getItem("treinos");
    let treinos_obj = JSON.parse(treinos);
    treinos_obj.forEach((element) => {
        let card = document.createElement("div");
        card.className = "card";
        let container = document.createElement("container");
        container.className = "container";
        let grupo = document.createElement("h2");
        grupo.innerText = element[0];
        container.appendChild(grupo);
        let table = document.createElement("table");
        table.contentEditable = "true";
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
        img.setAttribute("onclick", "editTable()")
        // body.appendChild(trData);
        container.appendChild(img);
        container.appendChild(table);

        card.appendChild(container);
        gridContainer.appendChild(card);
    });
    // console.log(JSON.parse(treinos));
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
    localStorage.setItem("user", user);
}

window.addEventListener("load", (event) => {
    // console.log(event.currentTarget.location.href)
    // verificando se estou no path que preciso usar o render()
    if (
        event.currentTarget.location.href ==
        "http://127.0.0.1:8080/public/treinos.html"
    ) {
        render();
    }
    document.getElementById("user_menu").innerText = localStorage.getItem("user");
});

function showPassword() {
    let pswInput = document.getElementById("password_field");
    if (pswInput.type === "password") {
        pswInput.type = "text";
    } else {
        pswInput.type = "password";
    }
}

function editTable() {
    console.log("Edit it");
}
