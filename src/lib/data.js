
'use server'

import prisma from '@/lib/prisma'

// ==================== CONDUCTORES ====================

export async function obtenerConductores() {
    try {
        const conductores = await prisma.conductor.findMany({
            include: {
                viajes: {
                    select: {
                        id: true,
                        origen: true,
                        destino: true
                    }
                }
            }
        })
        return conductores
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}

export async function obtenerConductor(id) {
    try {
        const conductor = await prisma.conductor.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                viajes: true
            }
        })
        return conductor
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}

export async function obtenerConductoresIdNombre() {
    try {
        const conductores = await prisma.conductor.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return conductores
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}

// ==================== VIAJES ====================

export async function obtenerViajes() {
    try {
        const viajes = await prisma.viaje.findMany({
            include: {
                conductor: {
                    select: {
                        id: true,
                        nombre: true
                    }
                },
                pasajeros: {
                    select: {
                        pasajero: {
                            select: {
                                id: true,
                                nombre: true,
                                bonobus: true
                            }
                        }
                    }
                }
            }
        })
        return viajes
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}

export async function obtenerViaje(id) {
    try {
        const viaje = await prisma.viaje.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                conductor: true,
                pasajeros: {
                    include: {
                        pasajero: true
                    }
                }
            }
        })
        return viaje
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}

// ==================== PASAJEROS ====================

export async function obtenerPasajeros() {
    try {
        const pasajeros = await prisma.pasajero.findMany({
            include: {
                viajes: {
                    select: {
                        viaje: {
                            select: {
                                id: true,
                                origen: true,
                                destino: true
                            }
                        }
                    }
                }
            }
        })
        return pasajeros
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}

export async function obtenerPasajero(id) {
    try {
        const pasajero = await prisma.pasajero.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                viajes: {
                    include: {
                        viaje: true
                    }
                }
            }
        })
        return pasajero
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}

export async function obtenerPasajerosIdNombre() {
    try {
        const pasajeros = await prisma.pasajero.findMany({
            select: {
                id: true,
                nombre: true,
                bonobus: true
            }
        })
        return pasajeros
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}
