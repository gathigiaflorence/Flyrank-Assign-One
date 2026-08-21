import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem {
	id: string;
	label: string;
	content: ReactNode;
}

export interface TabsProps {
	tabs: TabItem[];
	defaultActiveTabId?: string;
	activeTabId?: string;
	onActiveTabChange?: (tabId: string) => void;
}

export function Tabs({
	tabs,
	defaultActiveTabId,
	activeTabId,
	onActiveTabChange,
}: TabsProps) {
	const generatedId = useId();
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const [internalActiveTabId, setInternalActiveTabId] = useState(
		defaultActiveTabId ?? tabs[0]?.id ?? '',
	);

	if (tabs.length === 0) {
		return null;
	}

	const selectedTabId = activeTabId ?? internalActiveTabId;
	const selectedTab = tabs.find((tab) => tab.id === selectedTabId) ?? tabs[0];
	const selectedTabIndex = tabs.indexOf(selectedTab);

	const selectTab = (tabId: string) => {
		if (activeTabId === undefined) {
			setInternalActiveTabId(tabId);
		}
		onActiveTabChange?.(tabId);
	};

	const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		let nextIndex: number | undefined;

		if (event.key === 'ArrowRight') {
			nextIndex = (index + 1) % tabs.length;
		} else if (event.key === 'ArrowLeft') {
			nextIndex = (index - 1 + tabs.length) % tabs.length;
		}

		if (nextIndex === undefined) {
			return;
		}

		event.preventDefault();
		tabRefs.current[nextIndex]?.focus();
		selectTab(tabs[nextIndex].id);
	};

	return (
		<div>
			<div aria-label="Tabs" role="tablist">
				{tabs.map((tab, index) => {
					const tabId = `${generatedId}-tab-${index}`;
					const panelId = `${generatedId}-tabpanel-${index}`;
					const isSelected = index === selectedTabIndex;

					return (
						<button
							aria-controls={panelId}
							aria-selected={isSelected}
							id={tabId}
							key={tab.id}
							onClick={() => selectTab(tab.id)}
							onKeyDown={(event) => handleTabKeyDown(event, index)}
							ref={(element) => {
								tabRefs.current[index] = element;
							}}
							role="tab"
							tabIndex={isSelected ? 0 : -1}
							type="button"
						>
							{tab.label}
						</button>
					);
				})}
			</div>

			<div
				aria-labelledby={`${generatedId}-tab-${selectedTabIndex}`}
				id={`${generatedId}-tabpanel-${selectedTabIndex}`}
				role="tabpanel"
				tabIndex={0}
			>
				{selectedTab.content}
			</div>
		</div>
	);
}
