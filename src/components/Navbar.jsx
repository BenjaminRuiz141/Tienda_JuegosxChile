import React from 'react'

/**
 * Componente Navbar: Barra de navegacion superior.
 * Recibe el total de productos en el carrito y la categoria activa.
 */
function Navbar({ totalCarrito, categoriaActiva, onSeleccionarCategoria }) {
  const categorias = ['Todas', 'Consolas', 'Accesorios', 'Periféricos']

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#catalogo">
          Tienda <span className="brand-accent">JuegosxChile</span>
        </a>

        {/* Boton para menu responsive en moviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContenido"
          aria-controls="navbarContenido"
          aria-expanded="false"
          aria-label="Alternar navegacion"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContenido">
          {/* Categorias del catalogo */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categorias.map((cat) => (
              <li className="nav-item" key={cat}>
                <button
                  type="button"
                  className={`nav-link btn btn-link text-decoration-none ${
                    categoriaActiva === cat ? 'active text-info fw-bold' : ''
                  }`}
                  onClick={() => onSeleccionarCategoria(cat)}
                >
                  {cat === 'Todas' ? 'Catálogo' : cat}
                </button>
              </li>
            ))}
            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                Contacto
              </a>
            </li>
          </ul>

          {/* Boton y contador del Carrito */}
          <div className="ms-lg-3 mt-2 mt-lg-0">
            <a
              href="#seccion-carrito"
              className="btn btn-outline-light position-relative"
              title="Ver carrito de compras"
            >
              🛒 Carrito
              <span className="badge bg-danger rounded-pill ms-2">
                {totalCarrito}
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
