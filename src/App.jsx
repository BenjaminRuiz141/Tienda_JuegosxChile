import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Catalogo from './components/Catalogo.jsx'
import Carrito from './components/Carrito.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'

/**
 * Componente Principal App
 */
function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [categoria, setCategoria] = useState('Todas')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Carga los productos al montar el componente
  useEffect(() => {
    fetch('./productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo de productos')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setProductos(datos)
        setCargando(false)
      })
      .catch((err) => {
        console.error('Error al obtener productos:', err)
        setError('Ocurrió un error al cargar los productos. Intenta nuevamente más tarde.')
        setCargando(false)
      })
  }, [])

  // 3. FUNCIONES PARA MODIFICAR EL ESTADO DEL CARRITO
  // Agrega un producto seleccionado al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto])
  }

  // Elimina un producto del carrito segun su posicion en la lista
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((_, indice) => indice !== indiceAEliminar)
    )
  }

  // Vacia por completo el carrito de compras
  const vaciarCarrito = () => {
    setCarrito([])
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Barra de navegacion con contador del carrito */}
      <Navbar
        totalCarrito={carrito.length}
        categoriaActiva={categoria}
        onSeleccionarCategoria={setCategoria}
      />

      {/* Contenido Principal */}
      <main className="container py-5">
        {/* Mensaje en caso de error */}
        {error && (
          <div className="alert alert-danger shadow-sm mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Indicador de carga */}
        {cargando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Cargando catálogo...</span>
            </div>
            <p className="text-secondary mt-3">Cargando productos...</p>
          </div>
        ) : (
          /* Catalogo de productos */
          <Catalogo
            productos={productos}
            carrito={carrito}
            categoriaActiva={categoria}
            onSeleccionarCategoria={setCategoria}
            onAgregar={agregarAlCarrito}
          />
        )}

        {/* Seccion del Carrito de Compras */}
        <Carrito
          carrito={carrito}
          onEliminar={eliminarDelCarrito}
          onVaciar={vaciarCarrito}
        />

        {/* Seccion de Contacto */}
        <Contacto />
      </main>

      {/* Pie de pagina */}
      <Footer />
    </div>
  )
}

export default App
