'use client'
import { useActionState, useEffect, useId } from "react"
import { toast } from "sonner"

export default function FormConductor({ action, conductor, disabled = false, textSubmit = "Enviar" }) {
    const formId = useId()
    // EJERCICIO 9: Uso de useActionState en componente cliente
    const [state, faction, isPending] = useActionState(action, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog').close()
        }
        if (state.error) {
            toast.error(state.error)
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
