import Link from 'next/link'
import Modal from '@/components/Modal'
import FormPasajero from '@/components/pasajeros/form'
import { insertarPasajero, modificarPasajero, eliminarPasajero } from '@/lib/actions'

export default async function ListaPasajeros({ promesaPasajeros }) {
    const pasajeros = await promesaPasajeros

    return (
        <div>
            <div className="page-header">
                <h2>Listado de Pasajeros</h2>
                <Modal openElement={<button className="btn btn-insertar">+ Nuevo Pasajero</button>}>
                    <h3>Insertar Pasajero</h3>
                    <FormPasajero action={insertarPasajero} textSubmit="Crear" />
                </Modal>
            </div>

            <div className="lista-grid">
                {pasajeros.map(pasajero => (
                    <div key={pasajero.id} className="lista-card">
                        <div className="card-header">
                            <h3>{pasajero.nombre}</h3>
                        </div>
                        <div className="card-body">
                            <p><strong>Bonobus:</strong> {pasajero.bonobus ? 'Sí' : 'No'}</p>
                            <p><strong>Viajes realizados:</strong> {pasajero.viajes?.length || 0}</p>
                        </div>
                        <div className="card-actions">
                            <Link href={`/pasajeros/${pasajero.id}`} className="btn btn-ver">
                                Ver Detalles
                            </Link>
                            <Modal openElement={<button className="btn btn-editar">Editar</button>}>
                                <h3>Modificar Pasajero</h3>
                                <FormPasajero action={modificarPasajero} pasajero={pasajero} textSubmit="Modificar" />
                            </Modal>
                            <Modal openElement={<button className="btn btn-eliminar">Eliminar</button>}>
                                <h3>Eliminar Pasajero</h3>
                                <p>¿Estás seguro de eliminar a <strong>{pasajero.nombre}</strong>?</p>
                                <FormPasajero action={eliminarPasajero} pasajero={pasajero} disabled={true} textSubmit="Eliminar" />
                            </Modal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
