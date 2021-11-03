import Producer from "./Producer"

class Province {
  constructor(doc) {
    this._name = doc._name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc._price;
    doc.producers.forEach((element) => {
      this.addProducer(new Producer(this, d));
    });
  }
  get name() { return this._name }
  get producers() { return this._producers.slice(); }
  get totalProduction() { return this._totalProduction }
  set totalProduction(arg) { this._totalProduction = arg;}
  get demand() { return this._demand }
  set demand(arg) { this._demand = parseInt(arg) }
  get price() { this._price }
  set price(arg) { this._price = parseInt(arg) }
  
}


export default Province;