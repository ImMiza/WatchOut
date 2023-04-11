export default class Location {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get getX(): number {
        return this.x;
    }

    set setX(x: number) {
        this.x = x;
    }

    get getY(): number {
        return this.y;
    }

    set setY(y: number) {
        this.y = y;
    }

    public toString(): string {
        return `${this.x}, ${this.y}`;
    }
}