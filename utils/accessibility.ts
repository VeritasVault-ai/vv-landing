/**
 * Utility functions for improving accessibility in React components
 */

/**
 * Creates props for keyboard-accessible elements that should behave like buttons
 * @param onClick The click handler function
 * @returns Props object with appropriate keyboard event handlers
 */
export function makeKeyboardAccessible(onClick: (event: React.MouseEvent | React.KeyboardEvent) => void) {
  return {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyDown: (e: React.KeyboardEvent) => {
      // Execute the handler on Enter or Space key press
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    },
  };
}

/**
 * Creates props for elements that should be announced by screen readers
 * @param message The message to announce
 * @param politeness The politeness level for the announcement
 * @returns Props object with appropriate ARIA attributes
 */
export function makeScreenReaderAnnouncement(
  message: string,
  politeness: "polite" | "assertive" = "polite"
): { props: React.AriaAttributes; content: string } {
  return {
    props: { "aria-live": politeness, "aria-atomic": true },
    content: message,
  };
export function makeScreenReaderAnnouncement(
  message: string,
  politeness: "polite" | "assertive" = "polite"
): { props: React.AriaAttributes; content: string } {
  return {
    props: { "aria-live": politeness, "aria-atomic": true },
    content: message,
  };
}

/**
 * Creates props for visually hidden elements that should be accessible to screen readers
 * @returns CSS class for visually hidden elements
 */
export function visuallyHidden() {
  return "sr-only";
}

/**
 * Creates props for elements that should be hidden from screen readers
 * @returns ARIA attributes for hiding from screen readers
 */
export function hideFromScreenReader() {
  return {
    "aria-hidden": true,
  };
}

/**
 * Creates props for describing relationships between elements
 * @param id The ID of the element being described
 * @returns ARIA attributes for establishing relationships
 */
export function describedBy(id: string) {
  return {
    "aria-describedby": id,
  };
}

/**
 * Creates props for labeling elements
 * @param id The ID of the element serving as a label
 * @returns ARIA attributes for labeling
 */
export function labeledBy(id: string) {
  return {
    "aria-labelledby": id,
  };
}

/**
 * Creates props for indicating the current state of a navigation item
 * @param isCurrent Whether the item is the current page/selection
 * @returns ARIA attributes for navigation
 */
export function currentPage(isCurrent: boolean) {
  return {
    "aria-current": isCurrent ? "page" : undefined,
  };
}

/**
 * Creates props for indicating expanded/collapsed state
 * @param isExpanded Whether the element is expanded
 * @returns ARIA attributes for expanded state
 */
export function expandedState(isExpanded: boolean) {
  return {
    "aria-expanded": isExpanded,
  };
}

/**
 * Creates props for indicating selected state
 * @param isSelected Whether the element is selected
 * @returns ARIA attributes for selected state
 */
export function selectedState(isSelected: boolean) {
  return {
    "aria-selected": isSelected,
  };
}