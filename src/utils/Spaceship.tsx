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

    public setIsMoving(isMoving: boolean) {
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

    changeImage(value: string): Spaceship {
        this.setImage = value;
        return this;
    }

    startRotation(): Location {
        if(this.getIsMoving === true) {
            const currentRotation = this.getLocation.getRotation;
            const newRotation = (currentRotation + this.rotationSpeed)%360;
            return new Location(this.getLocation.getX, this.getLocation.getY, newRotation);
        }
        return Object.create(this.getLocation);
    }



    displacement(angle: number, distance: number){
      const directionVector = Vector.angleToVector(angle);
      const displacementVector = directionVector.multiply(distance);
      const currentX = this.getLocation.getX;
      const currentY = this.getLocation.getY;
      this.getLocation.setX = currentX + displacementVector.getX;
      this.getLocation.setY = currentY + displacementVector.getY;
    }

    screenLimit(location: Location) {
        var bordSupérieur = window.innerHeight;
         // Vérifier si le carré atteint le bord supérieur ou inférieur de l'écran
        if (location.getY  > bordSupérieur) {
            // Si le carré dépasse le bord inférieur, le ramener à la position du bord supérieur
            location.setY = 1;
        } else if (location.getY  < 0) {
            // Si le carré dépasse le bord supérieur, le ramener à la position du bord inférieur
            location.setY = bordSupérieur;
        }
        var largeurEcran = window.innerWidth;
        // Coordonnées du bord gauche de l'écran
        var bordGaucheEcran = 0;
        // Coordonnées du bord droit de l'écran
        var bordDroitEcran = largeurEcran
        if (location.getX > bordDroitEcran) {
            // Si le carré dépasse le bord inférieur, le ramener à la position du bord supérieur
            location.setX = 1;
        } else if (location.getX  < bordGaucheEcran) {
            // Si le carré dépasse le bord supérieur, le ramener à la position du bord inférieur
            location.setX = bordSupérieur;
        }
    }

    getJsxSpaceship(): JSX.Element {
        return (
            <img
                src={this.getImage}
                style={{
                    transition: 'left 0.3s, top 0.3s',
                    width: `${this.getWidth}px`,
                    height: `${this.getHeight}px`,
                    position: 'fixed',
                    left: `${this.getLocation.getX}px`,
                    top:  `${this.getLocation.getY}px`,
                    transform: `rotate(${this.getLocation.getRotation}deg)`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'initial',
                    backgroundSize: 'cover'
                }}
            />
        )
    }
}