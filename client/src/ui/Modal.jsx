import React, {
	useContext,
	useState,
	cloneElement,
	createContext,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);
	return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);
	const ref = useOutsideClick(close);

	if (name !== openName) return null;

	return createPortal(
		<div className="fixed inset-0 bg-backdrop-color backdrop-blur-sm z-50 transition-all">
			<div
				className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fcfaf8] rounded-lg shadow-lg p-8 transition-all"
				ref={ref}
			>
				<button
					className="absolute top-3 right-4 p-1 bg-transparent rounded-sm transition"
					onClick={close}
					type="button"
				>
					<HiXMark className="w-6 h-6 text-gray-500" />
				</button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</div>
		</div>,
		document.body,
	);
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
