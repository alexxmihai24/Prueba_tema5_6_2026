import Link from 'next/link'

export default function Home() {
    return (
        <main className="home-container">
            <div className="home-header">
                <h1> Sistema de Gestión de Transporte Urbano</h1>
                <p>Administra conductores, viajes y pasajeros de forma eficiente</p>
            </div>

            <div className="home-grid">
                <Link href="/conductores" className="home-card conductores-card">
                    <div className="card-icon"></div>
                    <h2>Conductores</h2>
                    <p>Gestiona los conductores del servicio</p>
                </Link>

                <Link href="/viajes" className="home-card viajes-card">
                    <div className="card-icon"></div>
                    <h2>Viajes</h2>
                    <p>Administra los viajes realizados</p>
                </Link>

                <Link href="/pasajeros" className="home-card pasajeros-card">
                    <div className="card-icon"></div>
                    <h2>Pasajeros</h2>
                    <p>Control de pasajeros registrados</p>
                </Link>
            </div>
        </main>
    )
}
