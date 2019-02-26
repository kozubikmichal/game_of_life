export default class ElementFactory {
	create(elementType: string): HTMLElement {
		return this._createElement(elementType);
	}

	clickableGrid(rows: Number, cols: Number, onClick: Function): HTMLElement {
		let grid = this._createElement("table");
		grid.classList.add("gol-grid");

		for (let r = 0; r < rows; ++r) {
			let row = grid.appendChild(this._createElement("tr"));

			for (let c = 0; c < cols; ++c) {
				let cell = row.appendChild(this._createElement("td"));

				cell.addEventListener("click", () => onClick(cell, r, c));
			}
		}

		return grid;
	}

	button(label: string, onClick: Function): HTMLElement {
		let element = this._createElement("button");
		element.classList.add("btn");
		element.classList.add("gol-button");
		element.textContent = label;
		element.onclick = () => onClick();

		return element;
	}

	private _createElement(elementType: string): HTMLElement {
		return document.createElement(elementType);
	}
}
