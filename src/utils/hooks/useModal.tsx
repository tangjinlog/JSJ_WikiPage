import { createPortal } from 'react-dom';
import React, { Children, isValidElement, useCallback, useState } from 'react';
import { useKeyDwon } from '.';

interface ModalDefaultPropsType {
	children: React.ReactNode;
}

interface ExecuteButtonPropsType {
	children: React.ReactNode;
	unBlockingWithCallback: (callback?: undefined | (() => void)) => void;
}

type ModalType = {
	(props: { children: React.ReactNode }): React.ReactPortal | null;
	Overlay: () => React.JSX.Element;
	Title: (props: ModalDefaultPropsType) => React.JSX.Element;
	Desc: (props: ModalDefaultPropsType) => React.JSX.Element;
	CancelButton: (props: ModalDefaultPropsType) => React.JSX.Element;
	ExecuteButton: (props: ExecuteButtonPropsType) => React.JSX.Element;
};

type ReturnType = [
	Modal: ModalType,
	handleOpen: () => void,
	handleClose: () => void,
];

function useModal(): ReturnType {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleOpen = useCallback(() => {
		setIsOpen(true);
		document.body.style.overflowY = 'hidden';
	}, [isOpen]);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		document.body.style.overflowY = 'auto';
	}, [isOpen]);

	useKeyDwon(handleClose);

	const keyDownHandler = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === `Escape`) {
				e.preventDefault();
				setIsOpen(false);
			}
		},
		[isOpen],
	);

	const overlayStyle = {
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	} as const;

	const buttonStyle = {
		fontSize: '16px',
		fontWeight: 'bold',
		border: 'none',
		background: 'none',
		cursor: 'pointer',
	} as const;

	const Overlay = () => {
		return <div style={overlayStyle}></div>;
	};

	const Title = ({ children }: { children: React.ReactNode }) => {
		return <h3>{children}</h3>;
	};

	const Description = ({ children }: { children: React.ReactNode }) => {
		return <p style={{ color: 'gray' }}>{children}</p>;
	};

	const CancelButton = ({ children }: { children: React.ReactNode }) => {
		return (
			<button
				style={{ ...buttonStyle, color: '#3492f1' }}
				onClick={handleClose}
			>
				{children}
			</button>
		);
	};

	const ExecuteButton = ({
		children,
		unBlockingWithCallback,
	}: ExecuteButtonPropsType) => {
		return (
			<button
				style={{ ...buttonStyle, color: '#cf454a' }}
				onClick={() => unBlockingWithCallback()}
			>
				{children}
			</button>
		);
	};

	type PropsType<T extends string> = { children: React.ReactNode } & {
		[K in T]: () => void;
	} & ExecuteButtonPropsType;

	const findChildren = (
		children: React.ReactNode,
		targetChildren: <T extends string>(
			props: PropsType<T>,
		) => React.JSX.Element,
	) => {
		const childrenArray = Children.toArray(children);
		return childrenArray
			.filter((child) => isValidElement(child) && child.type == targetChildren)
			.slice(0, 2);
	};

	const Modal = ({ children }: { children: React.ReactNode }) => {
		if (!isOpen) {
			return null;
		}

		const modalOverlay = findChildren(children, Overlay);
		const modalTitle = findChildren(children, Title);
		const modalDesc = findChildren(children, Description);
		const modalCancelButton = findChildren(children, CancelButton);
		const modalExecuteButton = findChildren(children, ExecuteButton);

		return createPortal(
			<div
				style={{
					position: 'fixed',
					top: '0',
					width: '100%',
					height: '100%',
					zIndex: '999',
				}}
				onKeyDown={keyDownHandler}
			>
				{modalOverlay ? <>{modalOverlay}</> : null}
				<div
					style={{
						position: 'fixed',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						top: '50%',
						left: '50%',
						width: '300px',
						height: '150px',
						zIndex: '999',
						padding: '18px',
						backgroundColor: 'white',
						borderRadius: '18px',
						transform: 'translate3d(-50%,-50%,0)',
					}}
				>
					{modalTitle ? <>{modalTitle}</> : null}
					{modalDesc ? <>{modalDesc}</> : null}
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							gap: '18px',
						}}
					>
						{modalCancelButton ? <>{modalCancelButton}</> : null}
						{modalExecuteButton ? <>{modalExecuteButton}</> : null}
					</div>
				</div>
			</div>,
			document.getElementById('modal')!,
		);
	};
	Modal.Overlay = Overlay;
	Modal.Title = Title;
	Modal.Desc = Description;
	Modal.CancelButton = CancelButton;
	Modal.ExecuteButton = ExecuteButton;

	return [Modal, handleOpen, handleClose];
}

export default useModal;
