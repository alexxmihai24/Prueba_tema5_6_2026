import { obtenerConductor } from '@/lib/data'
import Link from 'next/link'

export default async function DetalleConductor({ params }) {
    const { id } = await params
    const conductor = await obtenerConductor(id)

    return (
        <div className='page-container'>
            <Link href="/conductores" className="btn btn-volver">← Volver</Link>

            <div className="item-container">
                <div className="item-header">
                    <h2>{conductor.nombre}</h2>
                </div>
                <div className="item-body">
                    <p><strong>ID:</strong> {conductor.id}</p>
                    <p><strong>Teléfono:</strong> {conductor.telefono}</p>

                    {conductor.viajes && conductor.viajes.length > 0 && (
                        <div className="item-section">
                            <h3>Viajes Realizados</h3>
                            <ul className="item-list">
                                {conductor.viajes.map(viaje => (
                                    <li key={viaje.id}>
                                        <Link href={`/viajes/${viaje.id}`}>
                                            {viaje.origen} → {viaje.destino} ({new Date(viaje.fechaHora).toLocaleDateString()})
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
