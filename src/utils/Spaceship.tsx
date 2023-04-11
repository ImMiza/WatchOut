import Location from "./Location";
import Vector from "./Vector";
import Entity from "./Entity";
import { number } from "yargs";

export default class Spaceship extends Entity {
    private isMoving: boolean;
    private rotation: number;
    private rotationSpeed: number;

    constructor(location: Location, vector: Vector, image: string,  width: number, height: number, isMoving: boolean, rotationSpeed: number) {
        super(location, vector, image, width, height);
        this.isMoving = isMoving;
        this.rotation = 0;
        this.rotationSpeed = rotationSpeed;
    }

    set setIsMoving(isMoving: boolean) {
        this.isMoving = isMoving;
    }

    get getIsMoving(): boolean {
        return this.isMoving;
    }

    public setRotation(rotation: number) {
        this.rotation = rotation;
    }

    get getRotation(): number {
        return this.rotation;
    }

    set setRotationSpeed(rotationSpeed: number) {
        this.rotationSpeed = rotationSpeed;
    }

    get getRotationSpeed(): number {
        return this.rotationSpeed;
    }

    startRotation(): Spaceship {
        const currentRotation = this.getRotation;
        const newRotation = (currentRotation + this.rotationSpeed)%360;
        this.setRotation(newRotation);
        return this;
    }

    getJsxSpaceship():JSX.Element {
    console.log(this.getWidth);
        return (
            <div style={{
                width: `${this.getWidth}px`,
                height: `${this.getHeight}px`,
                backgroundColor: 'red',
                position: 'fixed',
                left: `${this.getLocation.getX}px`,
                top:  `${this.getLocation.getY}px`,
                transform: `rotate(${this.getRotation}deg)`,
              }}>
            </div>
        )
    }
}