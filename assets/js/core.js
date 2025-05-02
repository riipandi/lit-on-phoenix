import { LitElement } from "lit";
import tailwindcss from "../css/app.css";

/**
 * Base element class that extends LitElement and includes Tailwind CSS
 */
export class BaseElement extends LitElement {
	/**
	 * Finalizes styles by combining element styles with provided styles
	 * @param {import('lit').CSSResultGroup} styles Optional CSS styles to include
	 * @returns {Array<import('lit').CSSResultOrNative>} Array of finalized CSS styles
	 */
	static finalizeStyles(styles) {
		const elementStyles = LitElement.finalizeStyles(styles);
		return [...elementStyles, tailwindcss];
	}
}
