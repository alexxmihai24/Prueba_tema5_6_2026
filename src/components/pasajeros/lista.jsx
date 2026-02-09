import Link from 'next/link'

export default async function ListaPasajeros({ promesaPasajeros }) {
    const pasajeros = await promesaPasajeros

    return (
        <div>
            <h2>Listado de Pasajeros</h2>

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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
