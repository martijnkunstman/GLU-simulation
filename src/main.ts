import Simulation from "./classes/Simulation";
import World from "./classes/World";
import Invection from "./classes/Invection";

//SIR

//susceptible
//infectious
//recovered / removed

//vaccinated

console.log("start");

let world = new World(700,700,0.001);
let invection = new Invection(1,1,1,1);


let simulation: Simulation = new Simulation(world, invection);


