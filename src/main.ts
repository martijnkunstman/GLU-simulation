import Simulation from "./classes/Simulation";
import World from "./classes/World";
import Invection from "./classes/Invection";

//SIR

//susceptible
//infectious
//recovered / removed

//vaccinated

let world = new World(500,500,100);
let invection = new Invection(1,1,1,1);


let simulation: Simulation = new Simulation(world, invection);


