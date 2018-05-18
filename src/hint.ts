export default class Hint {
	private hints: string[];
	private nextDisplayNumber: number;

	public constructor(hints: string[]) {
		this.hints = hints ? hints : ['ヒントはありません'];
		this.reset();
	}

	public show() {
		document.getElementById('hint-container').classList.remove('hidden');
	}

	public hide() {
		document.getElementById('hint-container').classList.add('hidden');
	}

	public nextHint() {
		if (this.nextDisplayNumber < this.hints.length) {
			document.getElementById(`hint-${this.nextDisplayNumber}`).classList.remove('hidden');
		}
		this.nextDisplayNumber++;
		if (this.nextDisplayNumber >= this.hints.length) {
			document.getElementById('next-hint').classList.add('hidden');
		}
	}

	public reset() {
		this.nextDisplayNumber = 0;
		this.initHtml();
		this.hide();
	}

	private initHtml() {
		const hintList = this.hints
			.map((hint, idx) => `<li class="hint-list-element hidden" id="hint-${idx}">${hint}</li>`)
			.join('');
		let hintNext;
		if (this.hints.length > 0) {
			hintNext = '<li class="hint-list-element" id="next-hint">ここを押すと次のヒントを表示するよ！</li>';
		} else {
			hintNext = '';
		}
		document.getElementById('hint-list').innerHTML = hintList + hintNext;
		document.getElementById('next-hint').addEventListener('click', () => this.nextHint());
	}
}
