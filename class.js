//Class definition , constructor, super , Inheritance , gettere setter , static

class Car{

    constructor(model,color){
        this.model = model;
        this.color = color;
    }

    age(){
        let date = new Date();
        return date.getFullYear();
    }

    get cname(){
        console.log(this.model);
    }
    set cname(value){
        this.model = value;
    }

    static branding(car){
        return (`${car.model} ${car.color}`);
    }
}


class Model extends Car{
    constructor(model,brand,color){
        super(model,color);
        this.brand = brand;
    }

    show(){
        return `${this.brand} ${this.color}`;
    }
}
let car = new Car("2021","black");


car.cname;
car.cname = "2022";
car.cname;

console.log(Car.branding(car));

let model= new Model("2021","Honda","red");

console.log(model.show());

