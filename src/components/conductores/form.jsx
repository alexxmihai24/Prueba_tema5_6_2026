'use client'
import { useActionState, useEffect, useId } from "react"

export default function FormConductor({ action, conductor, disabled = false, textSubmit = "Enviar" }) {
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
            <input type="hidden" name="id" value={conductor?.id} />

            <div className="form-group">
                <label>Nombre del Conductor</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ej: Juan Pérez"
                    defaultValue={conductor?.nombre}
                    disabled={disabled}
                    required
                />
            </div>

            <div className="form-group">
                <label>Teléfono</label>
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Ej: 666123456"
                    defaultValue={conductor?.telefono}
                    disabled={disabled}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? 'Procesando...' : textSubmit}
            </button>
        </form>
    )
}
