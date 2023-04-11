import Entity from "./Entity";
import Location from "./Location";
import Vector from "./Vector";

export default class Meteorite extends Entity {
   constructor(location: Location, vector: Vector, image: string, width: number, height: number) {
       super(location, vector, image, width, height);
   }

   static generateRandomPosition(): Location {
      const randomX = Math.random() < 0.5 ? Math.random() * -100 : window.innerWidth + Math.random() * 100;
      const randomY = Math.random() * window.innerHeight;
      return new Location(randomX, randomY);
   }
}
