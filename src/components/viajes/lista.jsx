import Link from 'next/link'

export default async function ListaViajes({ promesaViajes }) {
    const viajes = await promesaViajes

    return (
        <div>
            <h2>Listado de Viajes</h2>

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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
