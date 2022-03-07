import Producer from "./Producer"

class Province {
  private _name: string
  private _producers: Array<Producer>
  private _totalProduction: number
  private _demand: number
  private _price:number
  
  constructor(doc) {
    this._name = doc._name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc._price;
    doc.producers.forEach((d) =>
      this.addProducer(new Producer(this, d))
    )
  }
  addProducer(arg: Producer){
    this._producers.push(arg)
    this._totalProduction += arg.production;
  }

  get name() { return this._name }
  get producers() { return this._producers.slice(); }
  get totalProduction() { return this._totalProduction }
  set totalProduction(arg) { this._totalProduction = arg}
  get demand() { return this._demand }
  set demand(arg) { this._demand = parseInt(arg) }
  get price() { return this._price }
  set price(arg) { this._price = parseInt(arg) }
  get shortfall(){
    return this._demand - this.totalProduction
  }
  
}


export default Province;