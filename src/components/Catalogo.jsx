import React from 'react'
import ProductoCard from './ProductoCard.jsx'

/**
 * Componente Catalogo: Muestra el listado de productos y los filtros por categoria.
 */
function Catalogo({
  productos,
  carrito,
  categoriaActiva,
  onSeleccionarCategoria,
  onAgregar,
}) {
  const categorias = ['Todas', 'Consolas', 'Accesorios', 'Periféricos']

  // Filtrado de productos segun la categoria seleccionada
  const productosFiltrados =
    categoriaActiva === 'Todas'
      ? productos
      : productos.filter((p) => p.categoria.toLowerCase() === categoriaActiva.toLowerCase())

  return (
    <section id="catalogo" className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="h3 fw-bold mb-0">Catálogo de Productos</h2>

        {/* Botonera de filtro rapido por categoria */}
        <div className="btn-group btn-group-sm" role="group" aria-label="Filtro de categorías">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn ${
                categoriaActiva === cat ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary'
              }`}
              onClick={() => onSeleccionarCategoria(cat)}
            >
              {cat === 'Todas' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla responsiva de productos */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productosFiltrados.map((producto) => {
          // Verificamos si el producto ya esta en el carrito para pasarlo por prop
          const yaEnCarrito = carrito.some((item) => item.id === producto.id)

          return (
            <ProductoCard
              key={producto.id}
              producto={producto}
              enCarrito={yaEnCarrito}
              onAgregar={onAgregar}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Catalogo
