async function ingresarIngrediente() {
    const form = document.getElementById('form-ingreso');
    const formData = new FormData(form);

    const response = await fetch('http://localhost:5001/api/ingredients', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Ingrediente ingresado con éxito');
        form.reset();  // Limpiar el formulario
    } else {
        const errorData = await response.json();
        alert('Error al ingresar el ingrediente: ' + errorData.error);
    }
}

async function cargarIngredientes() {
    const response = await fetch('http://localhost:5001/api/ingredients');
    const ingredientes = await response.json();

    const lista = document.getElementById('ingredientes-lista');
    lista.innerHTML = '';
    ingredientes.forEach(ingrediente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${ingrediente.nombre}</td>
            <td>${ingrediente.descripcion}</td>
            <td>${ingrediente.tipo}</td>
            <td>${ingrediente.precio}</td>
            <td><img src="http://localhost:5001/static/uploads/${ingrediente.imagen}" width="100" height="100"></td>
            <td><button onclick="eliminarIngrediente(${ingrediente.id})">Eliminar</button></td>
        `;
        lista.appendChild(fila);
    });
}

async function eliminarIngrediente(id) {
    const response = await fetch(`http://localhost:5001/api/ingredients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    /*if (response.ok) {
        cargarIngredientes();
    } else {
        alert('Error al eliminar el ingrediente');
    }*/
        if (response.ok) {
            // Elimina la fila correspondiente del DOM
            const fila = document.querySelector(`button[onclick="eliminarIngrediente(${id})"]`).closest('tr');
            fila.remove();
        } else {
            console.error('Error al eliminar el ingrediente');
        }

}

window.onload = function() {
    /*if (document.getElementById('ingredientes-lista')) {
        cargarIngredientes();
    }*/
        cargarIngredientes();
}



