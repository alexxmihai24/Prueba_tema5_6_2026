import ListaConductores from '@/components/conductores/lista'
import { obtenerConductores } from '@/lib/data'
import Link from 'next/link'
import { Suspense } from 'react'

export default function PaginaConductores() {
    const promesaConductores = obtenerConductores()

    return (
        <div className='page-container'>
            <h1>
                <Link href="/"> Conductores</Link>
            </h1>

            <Suspense fallback={<p className='loading'>Cargando conductores...</p>}>
                <ListaConductores promesaConductores={promesaConductores} />
            </Suspense>
        </div>
    )
}
