import IElementFactory from "./IElementFactory";
import ElementFactory from "./ElementFactory";
import PlayField from "./gol/PlayField";
import IPlaceable from "./IPlaceable";
import Controls from "./gol/Controls";

const DIMENSION = 40;
const NO_INTERVAL = 0;

export default class GoL implements IPlaceable {
	private runInterval = NO_INTERVAL;

	private ui: HTMLElement
	private playField: PlayField
	private controls: Controls

	private get isRunning(): Boolean {
		return this.runInterval !== NO_INTERVAL;
	}

	constructor(
		private factory: IElementFactory = new ElementFactory()
	) {
		this.playField = new PlayField(factory, DIMENSION, {
			onBlocked: () => this.onBlocked()
		});
		this.controls = new Controls(factory, {
			onStart: this.onStart.bind(this),
			onStop: this.onStop.bind(this),
			onStep: this.onStep.bind(this),
			onClear: this.onClear.bind(this)
		});
	}

	placeAt(element: HTMLElement) {
		this._initialize();

		this.controls.placeAt(this.ui);
		this.playField.placeAt(this.ui);

		element.appendChild(this.ui);
	}

	private _initialize() {
		this.ui = this.factory.create("div");
	}

	private onStart(interval: number) {
		if (this.isRunning) {
			clearInterval(this.runInterval)
		}

		this.runInterval = setInterval(() => this.playField.step(), interval);
	}

	private onStop() {
		if (this.isRunning) {
			clearInterval(this.runInterval);
			this.runInterval = NO_INTERVAL;
		}
	}

	private onStep() {
		this.onStop();
		this.playField.step();
	}

	private onBlocked() {
		this.onStop();
	}

	private onClear() {
		this.onStop();
		this.playField.clear();
	}
}