import {number} from "yargs";

export default class Location {
    private x: number;
    private y: number;
    private rotation: number;

    constructor(x: number, y: number, rotation: number = 0) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
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

    set setRotation(rotation: number) {
        this.rotation = rotation;
    }

    get getRotation(): number {
        return this.rotation;
    }

    public toString(): string {
        return `${this.x}, ${this.y}, ${this.rotation}`;
    }
}