export default class Vector {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    public add(vector: Vector): Vector {
        return new Vector(this.x + vector.getX(), this.y + vector.getY());
    }

    public subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.getX(), this.y - vector.getY());
    }

    public multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    public divide(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar);
    }
}