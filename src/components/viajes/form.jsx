'use client'
import { useActionState, useEffect, useId } from "react"
import { toast } from "sonner"

export default function FormViaje({
    action,
    viaje,
    conductores = [],
    pasajeros = [],
    disabled = false,
    textSubmit = "Enviar"
}) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})

    const pasajerosAsignados = viaje?.pasajeros?.map(vp => vp.pasajeroId || vp.pasajero?.id) || []

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog').close()
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state, formId])

    const formatearFecha = (fecha) => {
        if (!fecha) return ''
        const d = new Date(fecha)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    return (
        <form id={formId} action={faction} className="form-container">
            <input type="hidden" name="id" value={viaje?.id} />

            <div className="form-group">
                <label>Fecha y Hora</label>
                <input
                    type="datetime-local"
                    name="fechaHora"
                    defaultValue={formatearFecha(viaje?.fechaHora)}
                    disabled={disabled}
                    required
                />
            </div>

            <div className="form-group">
                <label>Origen</label>
                <input
                    type="text"
                    name="origen"
                    placeholder="Ej: Plaza Mayor"
                    defaultValue={viaje?.origen}
                    disabled={disabled}
                    required
                />
            </div>

            <div className="form-group">
                <label>Destino</label>
                <input
                    type="text"
                    name="destino"
                    placeholder="Ej: Estación de Tren"
                    defaultValue={viaje?.destino}
                    disabled={disabled}
                    required
                />
            </div>

            <div className="form-group">
                <label>Precio del Billete (€)</label>
                <input
                    type="number"
                    step="0.01"
                    name="precioBillete"
                    placeholder="Ej: 1.50"
                    defaultValue={viaje?.precioBillete}
                    disabled={disabled}
                    required
                />
            </div>

            {/* EJERCICIO 8: Relación 1:N con Conductor (Select) */}
            <div className="form-group relational-group">
                <label>Conductor Asignado:</label>
                <select name="conductorId" defaultValue={viaje?.conductorId || ''} disabled={disabled} required>
                    <option value="">-- Selecciona un conductor --</option>
                    {conductores.map(conductor => (
                        <option key={conductor.id} value={conductor.id}>
                            {conductor.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* EJERCICIO 8: Relación N:M con Pasajeros (Checkbox) */}
            <div className="form-group relational-group">
                <label>Pasajeros del Viaje:</label>
                <div className="checkbox-group">
                    {pasajeros.map(pasajero => (
                        <div key={pasajero.id} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={`pas-${pasajero.id}`}
                                name="pasajeros[]"
                                value={pasajero.id}
                                defaultChecked={pasajerosAsignados.includes(pasajero.id)}
                                disabled={disabled}
                            />
                            <label htmlFor={`pas-${pasajero.id}`}>
                                {pasajero.nombre} {pasajero.bonobus && '(Bonobus)'}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? 'Procesando...' : textSubmit}
            </button>
        </form>
    )
}
