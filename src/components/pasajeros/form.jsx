'use client'
import { useActionState, useEffect, useId } from "react"

export default function FormPasajero({ action, pasajero, disabled = false, textSubmit = "Enviar" }) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})

    useEffect(() => {
        if (state.success) {
            alert(state.success)
            document.getElementById(formId).closest('dialog').close()
        }
        if (state.error) {
            alert(state.error)
        }
    }, [state, formId])

    return (
        <form id={formId} action={faction} className="form-container">
            <input type="hidden" name="id" value={pasajero?.id} />

            <div className="form-group">
                <label>Nombre del Pasajero</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ej: María García"
                    defaultValue={pasajero?.nombre}
                    disabled={disabled}
                    required
                />
            </div>

            <div className="form-group">
                <label>Bonobus</label>
                <select name="bonobus" defaultValue={pasajero?.bonobus ? 'true' : 'false'} disabled={disabled}>
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? 'Procesando...' : textSubmit}
            </button>
        </form>
    )
}
