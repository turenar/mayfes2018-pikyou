export default class DottedLabel extends enchant.Label {
	public constructor(fontSize: number, text: string) {
		super(text);
		this.color = 'black';
		this.font = `${fontSize}px PixelMplus10`;
	}
}
