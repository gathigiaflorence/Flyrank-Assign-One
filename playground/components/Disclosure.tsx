import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface DisclosureProps {
	title: ReactNode;
	children: ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
	panelId?: string;
}

export function Disclosure({
	title,
	children,
	defaultOpen = false,
	open,
	onOpenChange,
	panelId,
}: DisclosureProps) {
	const generatedId = useId();
	const contentId = panelId ?? `${generatedId}-panel`;
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isOpen = open ?? internalOpen;

	const toggle = () => {
		const nextOpen = !isOpen;

		if (open === undefined) {
			setInternalOpen(nextOpen);
		}
		onOpenChange?.(nextOpen);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		event.preventDefault();
		toggle();
	};

	return (
		<div>
			<button
				aria-controls={contentId}
				aria-expanded={isOpen}
				onClick={toggle}
				onKeyDown={handleKeyDown}
				type="button"
			>
				{title}
			</button>
			<div hidden={!isOpen} id={contentId}>
				{children}
			</div>
		</div>
	);
}
