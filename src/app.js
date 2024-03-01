let treinos = document.getElementById("treinos_container");
let treinos_form = document.getElementById("treinos_form");

function create() {
  let form = document.createElement("form");
  form.className = "treinos_form";
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

  form.appendChild(input_nome);
  form.appendChild(input_rep);
  form.appendChild(input_ser);
  treinos.appendChild(form);
}

function save() {
  console.log("saved");
  location.reload(true);
}
