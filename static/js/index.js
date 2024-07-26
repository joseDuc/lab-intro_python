
window.addEventListener("load", () => {
  const f = document.querySelector("#form_insert_animal");
  f.addEventListener('submit', enviaFormInsert);

  cargaTitulo();
  const name = document.querySelector('#name');
  name.addEventListener('focus', borraMensaje);
  const size = document.querySelector('#size');
  size.addEventListener('focus', borraMensaje);
  const species = document.querySelector('#species');
  species.addEventListener('focus', borraMensaje);
  cargaAnimales();
});

function borraMensaje(e) {
  e.preventDefault();
  let m = document.querySelector("#mensaje_register_response");
  m.innerHTML = '';
  e.target.classList.remove('errorInput');

}
async function enviaFormInsert(e) {
  e.preventDefault();

  document.querySelector("#mensaje_register_response").innerText = "";
  const inputName = document.querySelector("#name");
  const inputSize = document.querySelector("#size");
  const inputSpecies = document.querySelector("#species");
  const name = inputName.value;
  const size = inputSize.value;
  const species = inputSpecies.value;
  inputName.classList.remove('errorInput');
  inputSize.classList.remove('errorInput');
  inputSpecies.classList.remove('errorInput');
  if (!name) {
    inputName.classList.toggle('errorInput');
  }
  if (!size) {
    inputSize.classList.toggle('errorInput');
  }
  if (!species) {
    inputSpecies.classList.toggle('errorInput');
  }
  if (!name || !size || !species) {
    alert("Faltan datos para guardar");
    return;
  }

  try {
    const response = await fetch("enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, size, species }),
    });
    const data = await response.json();

    document.querySelector("#name").value = '';
    document.querySelector("#size").value = '';
    document.querySelector("#species").value = '';

    if (data) {
      document.querySelector("#mensaje_register_response").innerText = data.message;
    }

    cargaAnimales();
  } catch (e) {
    alert(e);
  }

}

async function cargaAnimales() {
  try {
    const response = await fetch("cargaAnimales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    installAnimals(data.message);

  } catch (e) {
    alert(e);
  }
}

function installAnimals(animals) {
  if (animals) {
    const l = document.querySelector('#list_animal');
    const c = l.querySelector('.container');
    if (c) {
      c.innerHTML = '';
      const t = document.createElement('table');
      const tr = document.createElement('tr');

      let html = '<th>nombre</th>';
      html += '<th>medida mts</th>';
      html += '<th>especie</th>';
      html += '<th>accion</th>';
      tr.innerHTML = html
      t.appendChild(tr);
      for (i = 0; i < animals.length; ++i) {
        t.appendChild(creaRowAnimal(animals[i]));
      }
      c.appendChild(t);
    }

  }

}
function creaRowAnimal(animal) {
  if (animal) {
    const tr = document.createElement('tr');
    let html = '<td>' + animal.name + '</td>';
    html += '<td>' + animal.size + '</td>';
    html += '<td>' + animal.species + '</td>';
    tr.innerHTML = html;
    return tr;
  } else {
    return null;
  }


}
async function cargaTitulo() {
  try {
    const response = await fetch("nombreTerrario", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const titulo = document.querySelector('.title_header');
    titulo.innerHTML = data.message;

  } catch (e) {
    alert(e);
  }
}