import { obtenerViaje } from '@/lib/data'
import Link from 'next/link'

export default async function DetalleViaje({ params }) {
    const { id } = await params
    const viaje = await obtenerViaje(id)

    return (
        <div className='page-container'>
            <Link href="/viajes" className="btn btn-volver">← Volver</Link>

            <div className="item-container">
                <div className="item-header">
                    <h2>{viaje.origen} → {viaje.destino}</h2>
                </div>
                <div className="item-body">
                    <p><strong>ID:</strong> {viaje.id}</p>
                    <p><strong>Fecha y Hora:</strong> {new Date(viaje.fechaHora).toLocaleString()}</p>
                    <p><strong>Precio del Billete:</strong> {viaje.precioBillete}€</p>
                    <p><strong>Conductor:</strong>
                        <Link href={`/conductores/${viaje.conductor.id}`}>
                            {viaje.conductor.nombre}
                        </Link>
                    </p>

                    {viaje.pasajeros && viaje.pasajeros.length > 0 && (
                        <div className="item-section">
                            <h3>Pasajeros</h3>
                            <ul className="item-list">
                                {viaje.pasajeros.map(vp => (
                                    <li key={vp.pasajero.id}>
                                        <Link href={`/pasajeros/${vp.pasajero.id}`}>
                                            {vp.pasajero.nombre} {vp.pasajero.bonobus && '(Bonobus)'}
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
