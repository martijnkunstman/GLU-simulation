export default class Infection {

    public duration:number //time the infection will be active (in simulation steps)
    public mortality:number //change of dieing within the duration of the infection
    public contagiousness:number; //change of spreading withing the duration of the inverction
    public transmittability:number //distance the infection will be able to spread

    public constructor(duration:number, mortality:number, contagiousness:number, transmittability:number) {
        this.duration = duration
        this.mortality = mortality
        this.contagiousness = contagiousness
        this.transmittability = transmittability
    }

}

