'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function insertarConductor(prevState, formData) {
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')

    try {
        await prisma.conductor.create({
            data: {
                nombre,
                telefono
            }
        })
        revalidatePath('/conductores')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function modificarConductor(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')

    try {
        await prisma.conductor.update({
            where: { id },
            data: {
                nombre,
                telefono
            }
        })
        revalidatePath('/conductores')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function eliminarConductor(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.conductor.delete({
            where: { id }
        })
        revalidatePath('/conductores')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function insertarViaje(prevState, formData) {
    const fechaHora = new Date(formData.get('fechaHora'))
    const origen = formData.get('origen')
    const destino = formData.get('destino')
    const precioBillete = parseFloat(formData.get('precioBillete'))
    const conductorId = Number(formData.get('conductorId'))

    const pasajeros = formData
        .getAll('pasajeros[]')
        .map(id => ({ pasajeroId: Number(id) }))

    try {
        await prisma.viaje.create({
            data: {
                fechaHora,
                origen,
                destino,
                precioBillete,
                conductorId,
                pasajeros: { create: pasajeros }
            }
        })
        revalidatePath('/viajes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function modificarViaje(prevState, formData) {
    const id = Number(formData.get('id'))
    const fechaHora = new Date(formData.get('fechaHora'))
    const origen = formData.get('origen')
    const destino = formData.get('destino')
    const precioBillete = parseFloat(formData.get('precioBillete'))
    const conductorId = Number(formData.get('conductorId'))

    const pasajeros = formData
        .getAll('pasajeros[]')
        .map(id => ({ pasajeroId: Number(id) }))

    try {
        await prisma.viajePasajero.deleteMany({
            where: { viajeId: id }
        })

        await prisma.viaje.update({
            where: { id },
            data: {
                fechaHora,
                origen,
                destino,
                precioBillete,
                conductorId,
                pasajeros: { create: pasajeros }
            }
        })
        revalidatePath('/viajes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function eliminarViaje(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.viaje.delete({
            where: { id }
        })
        revalidatePath('/viajes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function insertarPasajero(prevState, formData) {
    const nombre = formData.get('nombre')
    const bonobus = formData.get('bonobus') === 'true'

    try {
        await prisma.pasajero.create({
            data: {
                nombre,
                bonobus
            }
        })
        revalidatePath('/pasajeros')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function modificarPasajero(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const bonobus = formData.get('bonobus') === 'true'

    try {
        await prisma.pasajero.update({
            where: { id },
            data: {
                nombre,
                bonobus
            }
        })
        revalidatePath('/pasajeros')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function eliminarPasajero(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.pasajero.delete({
            where: { id }
        })
        revalidatePath('/pasajeros')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}
