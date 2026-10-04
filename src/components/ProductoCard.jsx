import React from 'react'

/**
 * Componente ProductoCard: Tarjeta individual para cada producto.
 */
function ProductoCard({ producto, enCarrito, onAgregar }) {
  return (
    <div className="col">
      <div className="card h-100 card-theme">
        <div className="card-img-wrapper">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
            onError={(e) => {
              // Imagen de respaldo por si falla la ruta
              e.target.src = 'https://via.placeholder.com/300x200?text=JuegosxChile'
            }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 align-self-start">
            {producto.categoria}
          </span>
          <h5 className="card-title fw-bold text-light">{producto.nombre}</h5>
          <p className="card-text text-secondary small flex-grow-1">
            {producto.descripcion}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
            <span className="precio">${producto.precio.toLocaleString('es-CL')}</span>

            {/* Cambia el texto y estilo del boton si ya esta en el carrito */}
            {enCarrito ? (
              <button className="btn btn-outline-success btn-sm fw-semibold" disabled>
                ✓ En el carrito
              </button>
            ) : (
              <button
                className="btn btn-accent btn-sm fw-semibold"
                onClick={() => onAgregar(producto)}
              >
                + Agregar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductoCard
