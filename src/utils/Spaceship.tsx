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

    public setIsMoving(isMoving: boolean) {
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
        if(this.getIsMoving === true) {
            const currentRotation = this.getRotation;
            const newRotation = (currentRotation + this.rotationSpeed)%360;
            this.setRotation(newRotation);
        } 
        return this;
    }

    displacement(distance: number, location: Location){
              let left = location.getX; // Coordonnée X du coin supérieur gauche
              let top = location.getY; // Coordonnée Y du coin supérieur gauche
              let middleX = left + (this.getWidth / 2); // Coordonnée X du milieu entre le coin supérieur gauche et le coin supérieur droit
              let middleY = top + (this.getWidth / 2); // Coordonnée Y du milieu entre le coin supérieur gauche et le coin inférieur gauche
                console.log(left, top);
                console.log(middleX, middleY)
              let pointX = middleX
              let pointY = top
                console.log(pointX, pointY)
    
                if (pointX < middleX) {
                console.log("Le point se trouve à gauche du milieu du carré.");
                let x = location.getX - distance;
                let y = location.getY;
                location.setX = x;
                location.setY = y;
                } else if (pointX > middleX) {
                console.log("Le point se trouve à droite du milieu du carré.");
                let x = this.getLocation.getX + distance;
                let y = this.getLocation.getY;
                location.setX = x;
                location.setY = y;
                } else {
                console.log("Le point se trouve sur la même verticale que le milieu du carré.");
                }

                if (pointY < middleY) {
                console.log("Le point se trouve au-dessus du milieu du carré.");
                let x = this.getLocation.getX;
                let y = this.getLocation.getY + distance;
                location.setX = x;
                location.setY = y;
                } else if (pointY > middleY) {
                console.log("Le point se trouve en-dessous du milieu du carré.");
                let x = this.getLocation.getX;
                let y = this.getLocation.getY - distance;
                location.setX = x;
                location.setY = y;
                } else {
                console.log("Le point se trouve sur la même horizontale que le milieu du carré.");
                }
             
            
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
            location.setY = 1;
        } else if (location.getY  < bordGaucheEcran) {
            // Si le carré dépasse le bord supérieur, le ramener à la position du bord inférieur
            location.setX = bordSupérieur;
        }


    }

    getJsxSpaceship():JSX.Element {
        return (
            <div
                id="spaceship"
                style={{
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