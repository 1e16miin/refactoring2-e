import Province from './Province';

class Producer{

    private _province: Province
    private _cost: number
    private _name : string
    private _production :number
    constructor(aProvince:Province, data){
        this._province = aProvince
        this._cost = data.cost
        this._name = data.name
        this._production = data.production || 0;
    }
    get name(){return this._name}
    public get cost(){return this._cost}
    public set cost(arg:string) {this._cost = parseInt(arg)}
    get production(){
        return this._production
    }
    set production(amountStr){
        const amount = parseInt(amountStr)
        const newProduction = Number.isNaN(amount) ? 0 : amount
        this._province.totalProduction += newProduction - this._production
        this._production = newProduction
    }
}

export default Producer