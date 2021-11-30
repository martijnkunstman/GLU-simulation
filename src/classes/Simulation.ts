import World from "./World"
import Invection from "./Invection"

export default class Simulation {

    public world : World

    public constructor(world: World, invection: Invection) {
        this.world = world
    }

}
