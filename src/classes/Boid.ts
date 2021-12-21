import Vector from "./Vector";
import Infection from "./Infection";
import Util from "./Util";

enum State {
    Susceptible = 0,
    Infectious = 1,
    Recovered = 2,
    Removed = 3
}

export default class Boid {
    public location: Vector;
    public direction: Vector;
    public bounds: Vector;
    public infection: Infection;
    public radius: number;
    public id: number;
    public state: State;
    public startSeperationAtDistance: number;
    private overlap: boolean;

    private speed = 1;
    private infectionDuration: number = 0;

    public constructor(location: Vector, bounds: Vector, id: number, infection: Infection, state: State, startSeperationAtDistance: number, radius: number) {
        this.radius = radius;
        this.infection = infection;
        this.location = location;
        this.bounds = bounds;
        this.id = id;
        this.state = state;
        this.startSeperationAtDistance = startSeperationAtDistance;
        this.direction = new Vector((Util.random() - 0.5) * this.speed, (Util.random() - 0.5) * this.speed)
    }

    private updateInfection() {
        if (this.state == State.Infectious) {
            this.infectionDuration++;
        }
        if (this.infectionDuration > this.infection.duration) {
            this.state = State.Recovered;
        }
        //todo: die...        
    }


    private separate(boids: Array<Boid>) {

        this.overlap = false;
        let startSeperationAtDistance = this.startSeperationAtDistance;
        for (let i: number = 0; i < boids.length; i++) {
            if (this.id != boids[i].id) {
                let distanceBetween = this.location.distance(boids[i].location);
                //todo: optimise if statment based on distances...
                if (distanceBetween < this.radius + boids[i].radius) {
                    this.overlap = true;
                }
                if (this.state == State.Susceptible) {
                    if (distanceBetween < this.radius + boids[i].infection.transmittability) {
                        //todo build in contagiousness
                        if (boids[i].state == State.Infectious) {
                            this.state = State.Infectious;
                        }

                    }
                }
                if (distanceBetween < startSeperationAtDistance) {
                    let affectFactor = (startSeperationAtDistance - distanceBetween) / startSeperationAtDistance;
                    let affectVector = new Vector(this.location.x - boids[i].location.x, this.location.y - boids[i].location.y);
                    affectVector.setMagnitude(affectFactor);
                    this.direction = this.direction.add(affectVector);
                }
            }
        }
        //checkborder//
        this.direction.setMaxMagnitude(2);
    }



    private updateLocation() {

        this.location.x = this.location.x + this.direction.x
        this.location.y = this.location.y + this.direction.y

        //flip direction on border
        if (this.location.x < 0) { this.location.x = -this.location.x; this.direction.x = -this.direction.x }
        if (this.location.y < 0) { this.location.y = -this.location.y; this.direction.y = -this.direction.y }
        if (this.location.x > this.bounds.x) { this.location.x = this.bounds.x - (this.location.x - this.bounds.x); this.direction.x = -this.direction.x }
        if (this.location.y > this.bounds.y) { this.location.y = this.bounds.y - (this.location.y - this.bounds.y); this.direction.y = -this.direction.y }

    }

    public cycle(ctx: CanvasRenderingContext2D, boids: Array<Boid>) {
        this.updateInfection();
        this.separate(boids);
        this.updateLocation();
        this.render(ctx);
    }



    private render(ctx: CanvasRenderingContext2D) {

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        if (this.overlap) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
        }

        if (this.state == State.Infectious) {

            ctx.beginPath();
            ctx.arc(this.location.x, this.location.y, this.infection.transmittability, 0, 2 * Math.PI);
            //ctx.stroke();
            ctx.fillStyle = "rgba(255,0,0,0.5)";
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();


        let color = "#ffffff";

        if (this.state == State.Infectious) {
            color = "#ff0000";
        }
        if (this.state == State.Recovered) {
            color = "#bbbbbb";
        }

        ctx.fillStyle = color;
        ctx.fill();

    }
}