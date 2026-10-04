import React from 'react'

/**
 * Componente Contacto: Seccion informativa de soporte.
 */
function Contacto() {
  return (
    <section id="contacto" className="text-center py-4 mb-4">
      <div className="card card-theme p-4 mx-auto shadow-sm" style={{ maxWidth: '550px' }}>
        <h3 className="h4 fw-bold mb-2">¿Necesitas ayuda?</h3>
        <p className="text-secondary mb-1">
          Escríbenos directamente a nuestro canal de soporte:
        </p>
        <p className="mb-0">
          <a href="mailto:contacto@tiendajuegosxchile.cl" className="footer-link fw-semibold">
            contacto@tiendajuegosxchile.cl
          </a>
        </p>
      </div>
    </section>
  )
}

export default Contacto
