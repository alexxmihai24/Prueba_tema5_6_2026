import { PrismaClient } from '@prisma/client'

// Datos falsos (se importan automáticamente si usan modules, pero aquí lo haré inline para simplificar o puedo leer los JSON)
// Como en tu proyecto usas .mjs, vamos a importar los JSONs con 'assert' o 'with' si Node es moderno.
// Para evitar líos de versiones de Node, voy a leerlos con 'fs' que es más estándar.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()

// Helper para leer JSON
const readJson = (file) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const filePath = path.join(__dirname, 'data', file)
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

const conductores = readJson('conductores.json')
const pasajeros = readJson('pasajeros.json')
const viajes = readJson('viajes.json')

async function main() {
    console.log('🌱 Iniciando seed...')

    // 1. Borrar datos existentes (orden inverso para respetar FKs)
    await prisma.viajePasajero.deleteMany()
    await prisma.viaje.deleteMany()
    await prisma.pasajero.deleteMany()
    await prisma.conductor.deleteMany()

    // 2. Reiniciar contadores (MySQL)
    try {
        await prisma.$executeRaw`ALTER TABLE Conductor AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE Pasajero AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE Viaje AUTO_INCREMENT = 1;`
    } catch (e) {
        console.log('Nota: No se pudieron reiniciar los auto_increment (puede que no sea MySQL o permisos)')
    }

    // 3. Insertar Conductores
    console.log('   Insertando conductores...')
    await prisma.conductor.createMany({
        data: conductores
    })

    // 4. Insertar Pasajeros
    console.log('   Insertando pasajeros...')
    await prisma.pasajero.createMany({
        data: pasajeros
    })

    // 5. Insertar Viajes
    console.log('   Insertando viajes...')
    // createMany no soporta relaciones en la misma Query fácilmente, así que voy uno a uno para conectar
    // O puedo usar createMany si tengo los IDs fijos (que sí los tengo en el JSON)
    await prisma.viaje.createMany({
        data: viajes.map(v => ({
            ...v,
            fechaHora: new Date(v.fechaHora) // Convertir string a Date
        }))
    })

    // 6. Relacionar N:M (Viaje <-> Pasajero)
    // Vamos a añadir algunos pasajeros a los viajes creados
    console.log('   Relacionando viajes y pasajeros...')
    await prisma.viajePasajero.createMany({
        data: [
            { viajeId: 1, pasajeroId: 1 }, // Lucía va al Hospital
            { viajeId: 1, pasajeroId: 2 }, // Pedro va al Hospital
            { viajeId: 2, pasajeroId: 3 }, // Laura va al Centro Comercial
        ]
    })

    console.log('✅ Seed completado con éxito')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
