export default class Invection {

    public duration:number //time in simulation cycles
    public mortality:number //change of dieing withing the duration of the invection
    public contagiousness:number; //change of spreading withing the duration of the inverction
    public transmittability:number //distance the invection will be able to spread

    public constructor(duration:number, mortality:number, contagiousness:number, transmittability:number) {
        this.duration = duration
        this.mortality = mortality
        this.contagiousness = contagiousness
        this.transmittability = transmittability
    }

}

