import Location from "./Location";
import Vector from "./Vector";

export default class Entity {
    private location: Location;
    private vector: Vector;
    private image: string;

    constructor(location: Location, vector: Vector, image: string) {
        this.location = location;
        this.vector = vector;
        this.image = image;
    }

    get getLocation(): Location {
        return this.location;
    }

    set setLocation(value: Location) {
        this.location = value;
    }
    get getVector(): Vector {
        return this.vector;
    }
    set setVector(value: Vector) {
        this.vector = value;
    }
}