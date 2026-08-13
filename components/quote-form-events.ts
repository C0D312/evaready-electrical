export const quoteFormOpenEventName = "evaready:open-quote-form";

export type QuoteFormOpenDetail = {
  historyEntryPrepared?: boolean;
  opener: HTMLElement;
};

export function requestQuoteFormOpen(
  opener: HTMLElement,
  options: Pick<QuoteFormOpenDetail, "historyEntryPrepared"> = {},
) {
  window.dispatchEvent(
    new CustomEvent<QuoteFormOpenDetail>(quoteFormOpenEventName, {
      detail: { opener, ...options },
    }),
  );
}
