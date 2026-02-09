import Link from 'next/link'

export default async function ListaConductores({ promesaConductores }) {
    const conductores = await promesaConductores

    return (
        <div>
            <h2>Listado de Conductores</h2>

            <div className="lista-grid">
                {conductores.map(conductor => (
                    <div key={conductor.id} className="lista-card">
                        <div className="card-header">
                            <h3>{conductor.nombre}</h3>
                        </div>
                        <div className="card-body">
                            <p><strong>Teléfono:</strong> {conductor.telefono}</p>
                            <p><strong>Viajes realizados:</strong> {conductor.viajes?.length || 0}</p>
                        </div>
                        <div className="card-actions">
                            <Link href={`/conductores/${conductor.id}`} className="btn btn-ver">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
