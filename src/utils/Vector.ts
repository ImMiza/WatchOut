export default class Vector {
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
        return `(${this.x}, ${this.y})`;
    }

    public add(vector: Vector): Vector {
        return new Vector(this.x + vector.getX, this.y + vector.getY);
    }

    public subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.getX, this.y - vector.getY);
    }

    public multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    public divide(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar);
    }
}