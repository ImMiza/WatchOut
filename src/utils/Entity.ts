import Location from "./Location";
import Vector from "./Vector";

export default class Entity {
    private location: Location;
    private vector: Vector;
    private width: number;
    private height: number;

    private image: string;

    constructor(location: Location, vector: Vector, image: string, width: number, height: number) {
        this.location = location;
        this.vector = vector;
        this.image = image;
        this.width = width;
        this.height = height;
    }

    get getLocation(): Location {
        return this.location;
    }

    public setLocation(value: Location) {
        this.location = value;
    }
    get getVector(): Vector {
        return this.vector;
    }
    public setVector(value: Vector) {
        this.vector = value;
    }

    set setWidth(value: number) {
        this.width = value;
    }

    get getWidth(): number {
        return this.width;
    }

    set setHeight(value: number) {
        this.height = value;
    }

    get getHeight(): number {
        return this.height;
    }
}