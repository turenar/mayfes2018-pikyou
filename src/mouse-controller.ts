export default class MouseController {
    private x: number;
    private y: number;

    public constructor() {
        let x: number;
        let y: number;
        const self = this;
        document.body.addEventListener("mousemove", function(e){

			//座標を取得する
			x = e.pageX;  //X座標
            y = e.pageY;  //Y座標

            self.setPoint(x, y);
        });
    }

    public getPoint() {
        return {x: this.x, y: this.y};
    }

    private setPoint(x: number, y: number) {
        // console.log(`mouse point: (${x - 10}, ${y - 10})`);
        this.x = x - 10;
        this.y = y - 10;
    }
}