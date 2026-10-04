import React from 'react'

/**
 * Componente Carrito: Gestiona la lista de compras del usuario.
 */
function Carrito({ carrito, onEliminar, onVaciar }) {
  // Calculo del total acumulado de los productos en el carrito
  const total = carrito.reduce((acumulador, item) => acumulador + item.precio, 0)

  return (
    <section id="seccion-carrito" className="mb-5">
      <div className="card cart-card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h3 className="h4 fw-bold mb-0">🛒 Carrito de Compras</h3>

          {/* Boton para vaciar el carrito */}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onVaciar}
            disabled={carrito.length === 0}
          >
            Vaciar Carrito
          </button>
        </div>

        {/* Lista de productos en el carrito */}
        <ul className="list-group list-group-flush mb-3">
          {carrito.length === 0 ? (
            <li className="list-group-item cart-item text-secondary py-3 text-center">
              El carrito está vacío.
            </li>
          ) : (
            carrito.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className="list-group-item cart-item d-flex justify-content-between align-items-center py-2"
              >
                <div>
                  <span className="fw-semibold text-light">{item.nombre}</span>
                  <span className="d-block text-secondary small">
                    ${item.precio.toLocaleString('es-CL')}
                  </span>
                </div>

                {/* Boton para eliminar un producto individual del carrito */}
                <button
                  className="btn btn-outline-danger btn-sm py-0 px-2"
                  title="Quitar producto"
                  onClick={() => onEliminar(index)}
                >
                  &times;
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Total a pagar */}
        <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
          <span className="fs-5 fw-bold">Total a Pagar:</span>
          <span className="fs-4 fw-bold text-info">
            ${total.toLocaleString('es-CL')}
          </span>
        </div>
      </div>
    </section>
  )
}

export default Carrito
