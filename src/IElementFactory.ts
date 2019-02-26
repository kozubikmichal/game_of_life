export default interface IElementFactory {
	create(elementType: string): HTMLElement
	clickableGrid(rows: Number, cols: Number, onClick: Function): HTMLElement
	button(label: string, onClick: Function): HTMLElement
}