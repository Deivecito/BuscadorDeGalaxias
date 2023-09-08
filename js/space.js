let nasaArray = [];

function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < nasaArray.length; i++) {
        let product = nasaArray[i];
        htmlContentToAppend += `
            <div class="row cursor-active" onclick="redirectToInfo()">
                <div class="col-3">
                    <img src="${product.links[0].href}" alt="${product.data[0].title}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.data[0].title} - ${product.data[0].date_created}</h4>
                        <small class="text-muted">${product.data[0].description}</small>
                    </div>
                </div>
            </div>`;
    }
    
    document.getElementById('contenedor').innerHTML = htmlContentToAppend;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnBuscar').addEventListener('click', () => {
        let busqueda = document.getElementById('inputBuscar').value;

        fetch(`https://images-api.nasa.gov/search?q=${busqueda}`)
            .then(response => response.json())
            .then(data => {
                nasaArray = data.collection.items;
                showProductsList();
            })
            .catch(error => {
                console.error("Error al cargar los productos:", error);
            });
    });
});

