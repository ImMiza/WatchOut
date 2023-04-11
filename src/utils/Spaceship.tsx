import Location from "./Location";
import Vector from "./Vector";
import Entity from "./Entity";

export default class Spaceship extends Entity {
    private isMoving: boolean;

    private rotationSpeed: number;

    constructor(location: Location, vector: Vector, image: string,  width: number, height: number, isMoving: boolean, rotationSpeed: number) {
        super(location, vector, image, width, height);
        this.isMoving = isMoving;
        this.rotationSpeed = rotationSpeed;
    }

    set setIsMoving(isMoving: boolean) {
        this.isMoving = isMoving;
    }

    get getIsMoving(): boolean {
        return this.isMoving;
    }

    set setRotationSpeed(rotationSpeed: number) {
        this.rotationSpeed = rotationSpeed;
    }

    get getRotationSpeed(): number {
        return this.rotationSpeed;
    }

    startRotation(): Spaceship {
        const currentRotation = this.getLocation.getRotation;
        const newRotation = (currentRotation + this.rotationSpeed)%360;
        this.getLocation.setRotation = newRotation;
        return this;
    }

    getJsxSpaceship():JSX.Element {
        return (
            <div style={{
                width: `${this.getWidth}px`,
                height: `${this.getHeight}px`,
                position: 'fixed',
                left: `${this.getLocation.getX}px`,
                top:  `${this.getLocation.getY}px`,
                transform: `rotate(${this.getLocation.getRotation}deg)`,
                background: `url('${this.getImage}')`
              }}>
            </div>
        )
    }
}