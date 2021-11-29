import World from "./World";

export default class Simulation {

    public world : World

    public constructor() {
        this.world = new World(500,500,100)
    }

}
