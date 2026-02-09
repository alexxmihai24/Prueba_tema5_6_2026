'use client'
import { useRef } from 'react'

const Modal = ({ children, openElement }) => {
    const dialogRef = useRef(null)

    const openDialog = () => dialogRef.current?.showModal()
    const closeDialog = () => dialogRef.current?.close()

    const handleClickOutside = (e) => {
        if (dialogRef.current) {
            const rect = dialogRef.current.getBoundingClientRect()
            const isInDialog = (rect.top <= e.clientY
                && e.clientY <= rect.top + rect.height
                && rect.left <= e.clientX
                && e.clientX <= rect.left + rect.width)
            if (!isInDialog) {
                dialogRef.current.close()
            }
        }
    }

    return (
        <>
            <div onClick={openDialog} className='inline-block'>
                {openElement}
            </div>

            <dialog
                ref={dialogRef}
                onMouseDown={handleClickOutside}
                className="modal-dialog"
            >
                {children}
                <div onClick={closeDialog} className="modal-close-btn">❌</div>
            </dialog>
        </>
    )
}

export default Modal
