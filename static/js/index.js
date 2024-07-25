
window.addEventListener("load", () => {
  document.querySelector("#form_insert_animal").onsubmit = async function (event) {

    event.preventDefault();

    const name = document.querySelector("#text_name").value;
    const size = document.querySelector("#text_size").value;
    const species = document.querySelector("#text_species").value;

    if (!name || !size || !species) {
      alert("Faltan datos para guardar");
      return;
    }
    try {
      const response1 = await fetch("enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, size, species }),
      });
      const data1 = await response1.json();

      if (data1) {
        document.querySelector("#mensaje_register_response").innerText = data1.mensaje;
      }
      document.querySelector("#text_name").value = '';
      document.querySelector("#text_size").value = '';
      document.querySelector("#text_species").value = '';

      const response2 = await fetch("listar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await response2.json();
      alert (data2.mensaje[0]);

    } catch (e) {
      alert(e);
    }
  };
});

function enviaFormInsert(){

}