import { expect, type Page } from "@playwright/test";

export async function observeQuoteEnhancement(page: Page) {
  await page.addInitScript(() => {
    const listeners = new Set<EventListenerOrEventListenerObject>();
    const add = window.addEventListener.bind(window);
    const remove = window.removeEventListener.bind(window);
    Object.defineProperty(window, "__evQuoteEnhancementReady", {
      get: () => listeners.size > 0,
    });
    // Observe the real effect registration without dispatching an event or opening a modal.
    Object.defineProperty(window, "addEventListener", {
      configurable: true,
      value(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        add(type, listener, options);
        if (type === "evaready:open-quote-form") listeners.add(listener);
      },
    });
    Object.defineProperty(window, "removeEventListener", {
      configurable: true,
      value(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
        remove(type, listener, options);
        if (type === "evaready:open-quote-form") listeners.delete(listener);
      },
    });
  });
}

export async function expectQuoteEnhancementReady(page: Page) {
  await expect.poll(() => page.evaluate(() =>
    (window as unknown as { __evQuoteEnhancementReady?: boolean }).__evQuoteEnhancementReady,
  ), { message: "The real quote modal listener must be installed before enhanced-modal interaction" }).toBe(true);
}
