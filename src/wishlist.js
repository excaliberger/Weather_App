import Car from "./car";

class WishList {
    constructor () {
        this.nextId = 0;
        this.list = [];
    }
    add(make, model, year) {
        let myCarArgs = {
            id: this.nextId++,
            make: make,
            model: model,
            year: year,
        }
        let car = new Car(myCarArgs);
        this.list.push(car);
      }
    
    remove(carToRemove) {
        this.list = this.list.filter((car) => car.id != carToRemove);
      }
    }
    
    export default WishList;

