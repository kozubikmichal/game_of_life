import IPlaceable from "../IPlaceable";
import IElementFactory from "../IElementFactory";

const INTERVAL_SLOW = 200;
const INTERVAL_FAST = 100;

export interface IControlsHandlers {
	onStart: Function,
	onStep: Function,
	onStop: Function,
	onClear: Function
}

export default class Controls implements IPlaceable {
	private ui: HTMLElement;
	private startSlow: HTMLElement;
	private startFast: HTMLElement;
	private step: HTMLElement;
	private stop: HTMLElement;
	private clear: HTMLElement;

	constructor(
		private factory: IElementFactory,
		private handlers: IControlsHandlers
	) { }

	placeAt(element: HTMLElement) {
		this._initialize();

		element.appendChild(this.ui);
	}

	private _initialize() {
		this.ui = this.factory.create("div");

		this.startSlow = this.factory.button("Slow", () => this.handlers.onStart(INTERVAL_SLOW));
		this.startFast = this.factory.button("Fast", () => this.handlers.onStart(INTERVAL_FAST));
		this.stop = this.factory.button("Stop", () => this.handlers.onStop());
		this.step = this.factory.button("Step", () => this.handlers.onStep());
		this.clear = this.factory.button("Clear", () => this.handlers.onClear());

		this.startSlow.classList.add("btn-primary");
		this.startFast.classList.add("btn-primary");
		this.stop.classList.add("btn-danger");
		this.step.classList.add("btn-secondary");
		this.clear.classList.add("btn-secondary");

		this.ui.appendChild(this.startSlow);
		this.ui.appendChild(this.startFast);
		this.ui.appendChild(this.stop);
		this.ui.appendChild(this.step);
		this.ui.appendChild(this.clear);
	}
}