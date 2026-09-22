/**
 * Tienda JuegosxChile - Script Principal
 */

// ==========================================
// ESTADO DE LA APLICACIÓN Y ELEMENTOS DEL DOM
// ==========================================

// Variables globales
let productos = [];
let carrito = [];

// Referencias a elementos del DOM
const contenedorProductos = document.getElementById('contenedor-productos');
const mensajeError = document.getElementById('mensaje-error');
const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('input-busqueda');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');

// ==========================================
// CARGA DE PRODUCTOS
// ==========================================

/**
 * Carga los productos desde el archivo JSON.
 */
async function obtenerProductos() {
    try {
        const respuesta = await fetch('productos.json');

        if (!respuesta.ok) {
            throw new Error(`Error en la carga: ${respuesta.status} ${respuesta.statusText}`);
        }

        productos = await respuesta.json();
        renderizarProductos(productos);
    } catch (error) {
        mostrarError('No se pudieron cargar los productos en este momento. Por favor, intenta de nuevo más tarde.');
        console.error('Error al obtener productos:', error);
    }
}

// ==========================================
// MANEJO DE ERRORES
// ==========================================

/**
 * Muestra un mensaje de error en la interfaz.
 * @param {string} mensaje - Texto explicativo para el usuario.
 */
function mostrarError(mensaje) {
    if (mensajeError) {
        mensajeError.textContent = mensaje;
        mensajeError.classList.remove('d-none');
    }
}

// ==========================================
// RENDERIZADO DEL CATÁLOGO
// ==========================================

/**
 * Renderiza los productos en el catálogo.
 * @param {Array} lista - Lista de productos a renderizar.
 */
function renderizarProductos(lista) {
    contenedorProductos.innerHTML = '';

    if (lista.length === 0) {
        contenedorProductos.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-secondary fs-5">No se encontraron productos que coincidan con tu búsqueda.</p>
                <button class="btn btn-outline-info btn-sm" onclick="restablecerCatalogo()">Ver todos los productos</button>
            </div>
        `;
        return;
    }

    lista.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col';

        col.innerHTML = `
            <div class="card h-100 card-theme">
                <div class="card-img-wrapper">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                </div>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 align-self-start">${producto.categoria}</span>
                    <h5 class="card-title fw-bold text-light">${producto.nombre}</h5>
                    <p class="card-text text-secondary small flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
                        <span class="precio">$${producto.precio.toLocaleString('es-CL')}</span>
                        <button class="btn btn-accent btn-sm btn-agregar" data-id="${producto.id}">
                            + Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(col);
    });

    asignarEventosBotones();
}

/**
 * Restablece el catálogo mostrando todos los productos.
 */
function restablecerCatalogo() {
    inputBusqueda.value = '';
    renderizarProductos(productos);
}

// ==========================================
// GESTIÓN DE EVENTOS DE BOTONES
// ==========================================

/**
 * Asigna el evento click a los botones de agregar producto.
 */
function asignarEventosBotones() {
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id, 10);
            agregarAlCarrito(id);
        });
    });
}

// ==========================================
// CARRITO DE COMPRAS
// ==========================================

/**
 * Agrega un producto al carrito según su ID.
 * @param {number} id - Identificador único del producto.
 */
function agregarAlCarrito(id) {
    const productoEncontrado = productos.find(item => item.id === id);

    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        renderizarCarrito();
    }
}

/**
 * Renderiza los productos y el total del carrito en el DOM.
 */
function renderizarCarrito() {
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="list-group-item cart-item text-secondary py-3 text-center">El carrito está vacío.</li>';
        totalCarrito.textContent = '$0';
        if (contadorCarrito) contadorCarrito.textContent = '0';
        return;
    }

    let sumaTotal = 0;

    carrito.forEach((item, index) => {
        sumaTotal += item.precio;

        const li = document.createElement('li');
        li.className = 'list-group-item cart-item d-flex justify-content-between align-items-center py-2';
        li.innerHTML = `
            <div>
                <span class="fw-semibold text-light">${item.nombre}</span>
                <span class="d-block text-secondary small">$${item.precio.toLocaleString('es-CL')}</span>
            </div>
            <button class="btn btn-outline-danger btn-sm py-0 px-2" title="Quitar producto" onclick="eliminarDelCarrito(${index})">
                &times;
            </button>
        `;
        listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = `$${sumaTotal.toLocaleString('es-CL')}`;
    if (contadorCarrito) contadorCarrito.textContent = carrito.length.toString();
}

/**
 * Elimina un producto del carrito por su índice.
 * @param {number} indice - Posición del elemento en el arreglo carrito.
 */
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    renderizarCarrito();
}

/**
 * Vacía por completo el carrito de compras.
 */
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

// ==========================================
// BÚSQUEDA Y FILTRADO
// ==========================================

if (formBusqueda) {
    formBusqueda.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const criterio = inputBusqueda.value.toLowerCase().trim();

        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(criterio) ||
            producto.categoria.toLowerCase().includes(criterio)
        );

        renderizarProductos(productosFiltrados);
    });
}

/**
 * Filtrar por categoría desde los enlaces de la navegación.
 * @param {string} categoria - Nombre de la categoría a filtrar.
 */
function filtrarPorCategoria(categoria) {
    if (!categoria || categoria === 'Todas') {
        renderizarProductos(productos);
        return;
    }

    const filtrados = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    renderizarProductos(filtrados);
}

if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
});
