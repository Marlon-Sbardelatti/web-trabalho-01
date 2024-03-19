let treinos = document.getElementById("treinos_container");
let treinos_form = document.getElementById("treinos_form");
let formButton = document.getElementById("form_button");

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

  for (let i = 0; i < treinos_form.elements.length; i++) {
    const element = treinos_form.elements[i];
    console.log(element.value);
    if (element.value == null || element.value == "") {
      event.preventDefault();
    }
    inputs.push(element.value);
  }
  console.log(inputs);
  console.log("saved");
  // location.reload(true);
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
