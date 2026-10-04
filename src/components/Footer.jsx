import React from 'react'

/**
 * Componente Footer: Pie de pagina de la tienda.
 */
function Footer() {
  return (
    <footer className="footer py-4 mt-auto">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <p className="mb-0 text-secondary small">
          © 2026 Tienda JuegosxChile - Proyecto Académico Frontend.
        </p>
        <div className="d-flex gap-3 small">
          <a href="#catalogo" className="footer-link">
            Catálogo
          </a>
          <a href="#seccion-carrito" className="footer-link">
            Carrito
          </a>
          <a href="#contacto" className="footer-link">
            Contacto
          </a>
          <a href="#catalogo" className="footer-link">
            Volver arriba ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
