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

    static vectorToAngle(vector: Vector): number {
        const radians = Math.atan2(vector.getX, -vector.getY);
        const degrees = radians * (180 / Math.PI);
        const angle = (degrees + 360) % 360;
        return angle;
    }

    static angleToVector(angle: number): Vector {
        const radians = angle * (Math.PI / 180);
        const x = Number.parseFloat(Math.sin(radians).toFixed(3));
        const y = Number.parseFloat(Math.cos(radians).toFixed(3));
        return new Vector(x, -y);
    }
}