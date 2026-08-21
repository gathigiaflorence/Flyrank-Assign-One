import { useEffect, useId, useRef, type ReactNode } from 'react';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	titleId?: string;
	children: ReactNode;
}

const focusableSelector = [
	'a[href]',
	'area[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[contenteditable="true"]',
	'[tabindex]:not([tabindex="-1"])',
].join(', ');

export function Modal({ isOpen, onClose, title, titleId, children }: ModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const previouslyFocusedElement = useRef<HTMLElement | null>(null);
	const generatedTitleId = useId();
	const titleElementId = titleId ?? `${generatedTitleId}-title`;

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		previouslyFocusedElement.current = document.activeElement instanceof HTMLElement
			? document.activeElement
			: null;

		const dialog = dialogRef.current;
		dialog?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				onClose();
				return;
			}

			if (event.key !== 'Tab' || !dialog) {
				return;
			}

			const focusableElements = Array.from(
				dialog.querySelectorAll<HTMLElement>(focusableSelector),
			);

			if (focusableElements.length === 0) {
				event.preventDefault();
				dialog.focus();
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey && (document.activeElement === dialog || document.activeElement === firstElement)) {
				event.preventDefault();
				lastElement.focus();
			} else if (!event.shiftKey && (document.activeElement === dialog || document.activeElement === lastElement)) {
				event.preventDefault();
				firstElement.focus();
			}
		};

		dialog?.addEventListener('keydown', handleKeyDown);

		return () => {
			dialog?.removeEventListener('keydown', handleKeyDown);

			const elementToRestore = previouslyFocusedElement.current;
			if (elementToRestore?.isConnected) {
				elementToRestore.focus();
			}
			previouslyFocusedElement.current = null;
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			style={{
				alignItems: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				inset: 0,
				justifyContent: 'center',
				position: 'fixed',
			}}
		>
			<div
				aria-labelledby={titleElementId}
				aria-modal="true"
				ref={dialogRef}
				role="dialog"
				tabIndex={-1}
			>
				<h2 id={titleElementId}>{title}</h2>
				{children}
				<button type="button" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
}
