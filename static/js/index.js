
window.addEventListener("load",()=>{
    document.querySelector("#form_insert_animal").onsubmit = async function (event) {
        
        event.preventDefault();
        console.log(event)

        const name = document.querySelector("#text_name").value;
        const size = document.querySelector("#text_size").value;
        const species = document.querySelector("#text_species").value;

        if (!name || !size || !species){
            alert ("Faltan datos para guardar");
            return;
        }
        try{
            const response = await fetch("enviar", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, size, species }),
              });
              const data = await response.json();

              if (data) {
                document.querySelector("#mensaje_register_response").innerText = data.mensaje;
              }
              document.querySelector("#text_name").value='';
              document.querySelector("#text_size").value='';
              document.querySelector("#text_species").value='';

        }catch(e){
            alert(e);
        }
      };
});
