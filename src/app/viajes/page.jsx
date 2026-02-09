import ListaViajes from '@/components/viajes/lista'
import { obtenerViajes } from '@/lib/data'
import Link from 'next/link'
import { Suspense } from 'react'

export default function PaginaViajes() {
    const promesaViajes = obtenerViajes()

    return (
        <div className='page-container'>
            <h1>
                <Link href="/">Viajes</Link>
            </h1>

            <Suspense fallback={<p className='loading'>Cargando viajes...</p>}>
                <ListaViajes promesaViajes={promesaViajes} />
            </Suspense>
        </div>
    )
}
