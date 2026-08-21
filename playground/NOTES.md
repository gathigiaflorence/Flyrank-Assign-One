# shadcn/ui comparison notes

## What shadcn handled that I missed

The generated components are mostly typed wrappers around Radix primitives from `radix-ui`. The primitives provide the difficult interaction and accessibility behavior; the generated files add styling, composition, and convenient exports.

### Dialog

The generated Dialog component gets these behaviors from `DialogPrimitive`:

- Focus is moved into the dialog when it opens and restored when it closes.
- Focus is trapped while the dialog is open.
- Escape closes the dialog.
- The dialog gets the correct ARIA relationships through `DialogTitle`, `DialogDescription`, and the primitive content.
- Content and the overlay render through a portal, so the dialog is not constrained by its parent's layout or stacking context.
- The overlay, close controls, animations, and responsive layout are already composed.
- The API supports controlled and uncontrolled open state through the Radix root.

My `Modal.tsx` covers the requested focus trap, Escape handling, focus restoration, and core dialog attributes, but it does not provide a portal, overlay-click behavior, scroll locking, background inertness, primitive-managed nested focus behavior, or the broader composable API.

### Tabs

The generated Tabs component gets these behaviors from `TabsPrimitive`:

- Tab, tablist, and tabpanel ARIA state and relationships are managed by the primitive.
- Keyboard navigation is built in, including roving focus and orientation support.
- Controlled and uncontrolled values are supported.
- Disabled tabs and focus/activation state are handled consistently.
- `TabsList`, `TabsTrigger`, and `TabsContent` compose into one coordinated widget.
- Styling variants and class merging are provided without mixing interaction logic into the styles.

My `Tabs.tsx` implements the requested left/right navigation and ARIA attributes, but it only supports horizontal navigation, does not model disabled tabs, and keeps the widget in one monolithic component. It also does not expose the richer primitive behavior such as orientation and manual activation options.

## Other generated infrastructure

- `components.json` records aliases and the Tailwind/CSS setup so components can be regenerated consistently.
- `playground/lib/utils.ts` provides the `cn` helper for merging conditional Tailwind classes.
- `playground/components/ui/button.tsx` provides a reusable typed button with variants and Radix `Slot` support.
- The generated props use `React.ComponentProps` and `VariantProps`; they do not need `any`.
