import Link from 'next/link'
import Modal from '@/components/Modal'
import FormViaje from '@/components/viajes/form'
import { insertarViaje, modificarViaje, eliminarViaje } from '@/lib/actions'
import { obtenerConductoresIdNombre, obtenerPasajerosIdNombre } from '@/lib/data'

export default async function ListaViajes({ promesaViajes }) {
    const viajes = await promesaViajes

    const conductores = await obtenerConductoresIdNombre()
    const pasajeros = await obtenerPasajerosIdNombre()

    return (
        <div>
            <div className="page-header">
                <h2>Listado de Viajes</h2>
                <Modal openElement={<button className="btn btn-insertar">+ Nuevo Viaje</button>}>
                    <h3>Insertar Viaje</h3>
                    <FormViaje
                        action={insertarViaje}
                        conductores={conductores}
                        pasajeros={pasajeros}
                        textSubmit="Crear"
                    />
                </Modal>
            </div>

            <div className="lista-grid">
                {viajes.map(viaje => (
                    <div key={viaje.id} className="lista-card">
                        <div className="card-header">
                            <h3>{viaje.origen} → {viaje.destino}</h3>
                        </div>
                        <div className="card-body">
                            <p><strong>Fecha:</strong> {new Date(viaje.fechaHora).toLocaleString()}</p>
                            <p><strong>Conductor:</strong> {viaje.conductor?.nombre}</p>
                            <p><strong>Precio:</strong> {viaje.precioBillete}€</p>
                            <p><strong>Pasajeros:</strong> {viaje.pasajeros?.length || 0}</p>
                        </div>
                        <div className="card-actions">
                            <Link href={`/viajes/${viaje.id}`} className="btn btn-ver">
                                Ver Detalles
                            </Link>
                            <Modal openElement={<button className="btn btn-editar">Editar</button>}>
                                <h3>Modificar Viaje</h3>
                                <FormViaje
                                    action={modificarViaje}
                                    viaje={viaje}
                                    conductores={conductores}
                                    pasajeros={pasajeros}
                                    textSubmit="Modificar"
                                />
                            </Modal>
                            <Modal openElement={<button className="btn btn-eliminar">Eliminar</button>}>
                                <h3>Eliminar Viaje</h3>
                                <p>¿Estás seguro de eliminar este viaje?</p>
                                <FormViaje
                                    action={eliminarViaje}
                                    viaje={viaje}
                                    conductores={conductores}
                                    pasajeros={pasajeros}
                                    disabled={true}
                                    textSubmit="Eliminar"
                                />
                            </Modal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
