import React, { FC } from 'react';

interface ModalProps {
    title?: string;
    onClose: (event: any) => void;
    open: boolean;
}

export const Modal: FC<ModalProps> = ({ children, title, onClose, open }) => {
    if (!open) {
        return null;
    }
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                
                <div className="fixed inset-0 transition-opacity" 
                    aria-hidden="true"
                    onClick={(event) => onClose(event)}>
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <header className="p-2 flex justify-end border-b">
                            {title && <h2 className="w-full">{title}</h2>}
                            <button onClick={(event) => onClose(event)}>✖️</button>
                        </header>
                        <div className="p-2">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
