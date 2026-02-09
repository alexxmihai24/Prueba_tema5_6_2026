import { obtenerPasajero } from '@/lib/data'
import Link from 'next/link'

export default async function DetallePasajero({ params }) {
    const { id } = await params
    const pasajero = await obtenerPasajero(id)

    return (
        <div className='page-container'>
            <Link href="/pasajeros" className="btn btn-volver">← Volver</Link>

            <div className="item-container">
                <div className="item-header">
                    <h2>{pasajero.nombre}</h2>
                </div>
                <div className="item-body">
                    <p><strong>ID:</strong> {pasajero.id}</p>
                    <p><strong>Bonobus:</strong> {pasajero.bonobus ? 'Sí' : 'No'}</p>

                    {pasajero.viajes && pasajero.viajes.length > 0 && (
                        <div className="item-section">
                            <h3>Viajes Realizados</h3>
                            <ul className="item-list">
                                {pasajero.viajes.map(vp => (
                                    <li key={vp.viaje.id}>
                                        <Link href={`/viajes/${vp.viaje.id}`}>
                                            {vp.viaje.origen} → {vp.viaje.destino} ({new Date(vp.viaje.fechaHora).toLocaleDateString()})
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
