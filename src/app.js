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
	// verificando inputs
	if (!verificarInputs(inputs)) {
		alert("Os campos não podem estar vazios.");
	} else {
		let t = localStorage.getItem("treinos");

		if (t == null) {
			let treinos = [];
			treinos.push(inputs);
			let obj = JSON.stringify(treinos);
			// render();
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

	if (
		event.currentTarget.location.href ==
		"http://127.0.0.1:8080/public/editar.html"
	) {
		renderEdit();
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

function editTable(event) {
	// console.log("Edit it");
	// if (currentTable.getAttribute("contentEditable") === "true") {
	//     currentTable.setAttribute("contentEditable", "false");
	// } else {
	//     currentTable.setAttribute("contentEditable", "true");
	// }
	// console.log(currentTable);

	// let currentTable = currentDiv.querySelector("table");
	// console.log(currentDiv)
	// console.log(currentTable)
	// console.log(currentDiv.querySelector("h2").innerText)
	let currentDiv = event.target.parentElement;
	localStorage.setItem(
		"table-to-edit",
		currentDiv.querySelector("h2").innerText,
	);
	window.location.href = "http://127.0.0.1:8080/public/editar.html";
}

function renderEdit(event) {
	let tableName = localStorage.getItem("table-to-edit");
	let treinos = JSON.parse(localStorage.getItem("treinos"));
	// console.log(treinos);
	let exercise = [];
	treinos.forEach((element) => {
		if (element[0] == tableName) {
			// console.log(element);
			tableToEdit(element);
			// element.forEach((data) => {
			//     exercise.push(data);

			// });
			// console.log(exercise)
		}
	});
}

function tableToEdit(data) {
	// console.log(data);

	let nome = document.getElementById("nome-exe");
	nome.value = data[0];
	// console.log(nome);
	let form = document.getElementById("form-editar");

	let count = 0;
	let div = document.createElement("div");
	for (let i = 0; i < data.length; i++) {
		if (i != 0) {
			// let div = document.createElement("div");
			switch (count) {
				case 0:
					let input = document.createElement("input");
					input.value = data[i];
                    let br = document.createElement("br");
                    div.appendChild(br);
					div.appendChild(input);
					count++;
					break;
				case 1:
					let input1 = document.createElement("input");
                    input1.type = "number";
					input1.value = data[i];
					div.appendChild(input1);
					count++;
					break;
				case 2:
					let input2 = document.createElement("input");
					input2.value = data[i];
                    input2.type = "number";
					form.appendChild(input2);
					let deleteIcon = document.createElement("img");
					deleteIcon.src = "../assets/imgs/delete-icon.png";
					deleteIcon.className = "delete-icon";
					deleteIcon.setAttribute("onclick", "deleteTD(event)");
					div.appendChild(input2);
					div.appendChild(deleteIcon);
					form.appendChild(div);
					// let br = document.createElement("br");
					// form.appendChild(br);
					count = 0;
					div = document.createElement("div");
					break;

				default:
					// let input = document.createElement("input");
					// input.value = data[i];
					// div.appendChild(input);
					// form.appendChild(input);
					// let br = document.createElement("br");
					// form.appendChild("br");
					// console.log(count)
					// count++;
					break;
			}
			// const element = data[i];
			// console.log(element);
		}
	}
}

function saveEdit(event) {
	console.log("saved");
}

function createEdit() {
	console.log("created");
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
	div.appendChild(nome);
	div.appendChild(reps);
	div.appendChild(series);
	div.appendChild(deleteIcon);
	div.appendChild(br);
	form.appendChild(div);
}

function deleteTD(event) {
	let parent = event.target.parentElement;
	console.log(parent);
	parent.remove();
}
