import React, { useEffect } from "react";

/**
 * Custom hook to detect clicks outside of a specified DOM element.
 * Useful for closing modals, dropdowns, or expanded components when clicking away.
 *
 * @param ref - A React ref object pointing to the DOM element to monitor.
 * @param callback - The function to execute when an outside click is detected.
 */
export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>, // Changed to HTMLElement for broader applicability
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Added TouchEvent for mobile compatibility
      // Do nothing if the element being clicked is the target element or one of its children
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    // Attach event listeners for both mouse and touch events
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]); // Dependencies: ref and callback to re-run effect if they change
};
