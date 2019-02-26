import IElementFactory from "../IElementFactory";
import { CellState } from "./CellState";
import IPlaceable from "../IPlaceable";

export interface IPlayFieldHandlers {
	onBlocked: Function
}

export default class PlayField implements IPlaceable {
	private state: CellState[][]
	private nextState: CellState[][]
	private grid: HTMLElement;

	constructor(
		private factory: IElementFactory,
		private dimension: number,
		private handlers: IPlayFieldHandlers
	) { }

	placeAt(element: HTMLElement) {
		this._initialize();
		element.appendChild(this.grid);
	}

	step() {
		for (let row = 0; row < this.dimension; ++row) {
			for (let col = 0; col < this.dimension; ++col) {
				this._stepCell(row, col);
			}
		}

		this._applyState();
	}

	clear() {
		this._resetState(this.dimension);
		this._applyState(true);
	}

	private _applyState(force: boolean = false) {
		if (!this._hasChanges() && !force) {
			this.handlers.onBlocked();
			return;
		}

		this.state = JSON.parse(JSON.stringify(this.nextState));

		for (let row = 0; row < this.dimension; ++row) {
			let rowElement = this.grid.children.item(row);

			for (let col = 0; col < this.dimension; ++col) {

				rowElement.children
					.item(col)
					.classList
					.toggle(
						"gol-alive",
						this.state[row][col] === CellState.Alive
					)
			}
		}
	}

	private _stepCell(row: number, col: number) {
		let neighborsAlive = this._neighborsCount(row, col);

		switch (neighborsAlive) {
			case 2: {
				this.nextState[row][col] = this.state[row][col];
				break;
			}
			case 3: {
				this.nextState[row][col] = CellState.Alive
				break;
			}
			default: {
				this.nextState[row][col] = CellState.Dead
				break;
			}
		}
	}

	private _neighborsCount(cellRow: number, cellCol: number): number {
		let count = 0;

		for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
			for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
				let newRow = cellRow + rowOffset;
				let newCol = cellCol + colOffset;

				if (!(newRow === cellRow && newCol === cellCol)
					&& newRow >= 0 && newCol >= 0
					&& newRow < this.dimension && newCol < this.dimension
					&& this.state[newRow][newCol] === CellState.Alive) {
					count++;
				}
			}
		}

		return count;
	}

	private _initialize() {
		this._resetState(this.dimension);
		this._resetGrid(this.dimension);
	}

	private _resetState(dimension: Number) {
		this.state = [];

		for (let i = 0; i < dimension; ++i) {
			this.state[i] = [];
			for (let j = 0; j < dimension; ++j) {
				this.state[i][j] = CellState.Dead
			}
		}

		this.nextState = JSON.parse(JSON.stringify(this.state));
	}

	private _resetGrid(dimension: number) {
		this.grid = this.factory.clickableGrid(dimension, dimension, this._onCellClick.bind(this));
	}

	private _onCellClick(cell: HTMLElement, row: number, column: number) {
		cell.classList.toggle("gol-alive");
		this.state[row][column] = this.state[row][column] === CellState.Dead ? CellState.Alive : CellState.Dead;
	}

	private _hasChanges() {
		return JSON.stringify(this.state) !== JSON.stringify(this.nextState);
	}
}