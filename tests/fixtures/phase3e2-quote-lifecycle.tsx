import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import { QuoteFormModal } from "../../components/quote-form-modal";

let root: Root | null = null;
let mounts = 0;
let unmounts = 0;

const lifecycle = {
  mount() {
    if (root) throw new Error("The previous React root is still mounted");
    // The production dialog is a body child. A wrapping fixture div would
    // incorrectly become inert together with the dialog it contains.
    root = createRoot(document.body);
    flushSync(() => root!.render(<>
      <a href="#quote-fixture" data-quote-trigger="true">Open isolated quote fixture</a>
      <button type="button" id="independent-owner">Independent fixture focus owner</button>
      <QuoteFormModal />
    </>));
    mounts++;
  },
  unmount() {
    if (!root) throw new Error("No React root is mounted");
    root.unmount();
    root = null;
    unmounts++;
  },
  snapshot() { return { mounted: root !== null, mounts, unmounts }; },
};

Object.assign(window, { __evQuoteLifecycle: lifecycle });
lifecycle.mount();
