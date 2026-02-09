import ListaPasajeros from '@/components/pasajeros/lista'
import { obtenerPasajeros } from '@/lib/data'
import Link from 'next/link'
import { Suspense } from 'react'

export default function PaginaPasajeros() {
    const promesaPasajeros = obtenerPasajeros()

    return (
        <div className='page-container'>
            <h1>
                <Link href="/"> Pasajeros</Link>
            </h1>

            <Suspense fallback={<p className='loading'>Cargando pasajeros...</p>}>
                <ListaPasajeros promesaPasajeros={promesaPasajeros} />
            </Suspense>
        </div>
    )
}
