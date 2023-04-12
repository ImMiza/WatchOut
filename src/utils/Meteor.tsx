import Entity from "./Entity";
import Location from "./Location";
import Vector from "./Vector";

export default class Meteor extends Entity {
   constructor(targetLocation: Location, image: string, width: number, height: number, speed: number = 4) {
       const location = Meteor.generateRandomPosition();
       const vector = Meteor.getVector(location, targetLocation);
       location.setRotation = Vector.vectorToAngle(vector);
       console.log(location.getRotation)
       super(location, vector.multiply(speed), image, width, height);
   }

   get jsxElement(): JSX.Element {
      return (
          <div style={{
              width: '50px',
              height: '50px',
              position: 'fixed',
              left: this.getLocation.getX,
              top: this.getLocation.getY,
              background: `url('${this.getImage}')`,
              transform: `rotate(${this.getLocation.getRotation}deg)`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
          }}>
          </div>
      )
   }

   move(): void {
       this.setLocation = new Location(this.getLocation.getX + this.getVector.getX, this.getLocation.getY + this.getVector.getY, this.getLocation.getRotation)
   }

   static generateRandomPosition(): Location {
       let randomX, randomY;
       if(Math.random() > 0.5) {
           randomX = Math.random() < 0.5 ? Math.random() * -100 : window.innerWidth + 100;
           randomY = Math.random() * window.innerHeight;
       }
       else {
           randomX = Math.random() * window.innerWidth;
           randomY = Math.random() < 0.5 ? Math.random() * -100 : window.innerHeight + 100;
       }
      return new Location(randomX, randomY);
   }

    static getVector(entity1: Location, entity2: Location): Vector {
        const x = entity2.getX - entity1.getX;
        const y = entity2.getY - entity1.getY;
        const length = Math.sqrt(x*x + y*y);
        const directionX = x / length;
        const directionY = y / length;
        return new Vector(directionX, directionY);
    }
}
