
window.addEventListener("load", () => {
  const f = document.querySelector("#form_insert_animal");
  f.addEventListener('submit', enviaFormInsert);
  document.querySelector("#form_insert_animal").onsubmit = async function (event) {
  };
  cargaAnimales();
});

async function enviaFormInsert(e) {
  e.preventDefault();

  document.querySelector("#mensaje_register_response").innerText = "";
  const name = document.querySelector("#name").value;
  const size = document.querySelector("#size").value;
  const species = document.querySelector("#species").value;

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
      const th = document.createElement('th');

      let html = '<th>nombre</th>';
      html += '<th>medida</th>';
      html += '<th>especie</th>';
      html += '<th>accion</th>';
      tr.innerHTML = html
      t.appendChild(tr);
    console.log(animals)
      html='<td>' + animals[0].name +'</td>';
       html+='<td>' + animals[0].size +'</td>';
        html+='<td>' + animals[0].species +'</td>';
      const tr1=document.createElement('tr');
      tr1.innerHTML=html;
      t.appendChild(tr1);
      c.appendChild(t);
    }

  }

}
function creaRowAnimal(animal) {
  if (animal) {
    const dr = document.createElement('tr');
    let html  = '<td>' + $(animal.name) + '</td>';
    html += '<td>' + $(animal.size) + '</td>';
    html = '<td>' + $(animal.species) + '</td>';
    dr.innerHTML = html;
    return dr;
  }else{
    return null;
  }
 

}