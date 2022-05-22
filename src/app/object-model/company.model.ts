export class CompanyDetails{
    code:string|undefined;
    name:string|undefined;
    ceo:string|undefined;
    trunOver:number|undefined;
    website:string|undefined;
    stockExchange:string|undefined;
    constructor(code:string,name:string,ceo:string,turnOver:number,website:string,stockExchange:string){
        this.code=code;
        this.name=name;
        this.ceo=ceo;
        this.trunOver=turnOver;
        this.website=website;
        this.stockExchange=stockExchange;
    }
}