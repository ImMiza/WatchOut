import Entity from "./Entity";
import Location from "./Location";
import Vector from "./Vector";

export default class Meteor extends Entity {
   constructor(targetLocation: Location, image: string, width: number, height: number) {
       const location = Meteor.generateRandomPosition();
       super(location, Meteor.getVector(location, targetLocation).multiply(4), image, width, height);
   }

   get jsxElement(): JSX.Element {
      return (
          <div style={{
             width: '50px',
             height: '50px',
             position: 'fixed',
             backgroundColor: 'red',
             left: this.getLocation.getX,
             top: this.getLocation.getY
          }}>
          </div>
      )
   }

   move(): void {
       this.setLocation = new Location(this.getLocation.getX + this.getVector.getX, this.getLocation.getY + this.getVector.getY)
   }

   static generateRandomPosition(): Location {
      const randomX = Math.random() < 0.5 ? Math.random() * -100 : window.innerWidth + Math.random() * 100;
      const randomY = Math.random() * window.innerHeight;
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
