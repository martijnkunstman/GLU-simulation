import Simulation from "./classes/Simulation";
import World from "./classes/World";
import Invection from "./classes/Invection";
//import { Chart, registerables } from 'chart.js';
//Chart.register(...registerables);

import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

document.body.style.display = "flex";

//SIR

//susceptible
//infectious
//recovered / removed

//vaccinated

console.log("start");
let invection = new Invection(100, 0.5, 0.5, 10);
let world = new World(700, 700, 0.0008, 10, invection);
let simulation: Simulation = new Simulation(world);

let canvas = document.createElement('canvas')
canvas.setAttribute("width", "700")
canvas.setAttribute("height", "700")
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d")



let graphData: Array<{ [key: string]: number }> = [];

function convertArrayLenght(inputArray: Array<number>, length: number): Array<number> {

    if (inputArray.length < length) {
        return inputArray;
    }

    let myNewArray: Array<number> = []
    for (let a: number = 0; a < length; a++) {
        let value
        myNewArray.push(value)
    }
    return myNewArray
}

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            //barPercentage: 1,
            // lineTension: 0,
            pointRadius: 0,
            label: 'uninfected',
            data: [],
            borderColor: '#0000ff',
        },
        {
            //barPercentage: 1,
            //lineTension: 0,
            pointRadius: 0,
            label: 'infected',
            data: [],
            borderColor: '#ffaf00'
        },

        {
            //barPercentage: 1,
            //lineTension: 0,
            pointRadius: 0,
            label: 'deceased',
            data: [],
            borderColor: '#ff0000'
        },
        {
            //barPercentage: 1,
            //lineTension: 0,
            pointRadius: 0,
            label: 'recovered',
            data: [],
            borderColor: '#00ff00',
        }]
    },
    options: {

        //tooltips: { enabled: false },
        hover: { mode: null },
        animation: {
            duration: 0
        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone'
            }
        },
        //responsiveAnimationDuration: 0,
        responsive: false,
        scales: {
            /*
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
            }]
            */
        }
    }
}
);

function updateChart() {
    let uninfected = 0;
    let infected = 0;
    let deceased = 0;
    let recovered = 0;

    for (let a = 0; a < world.boids.length; a++) {
        if (world.boids[a].state == 0) {
            uninfected++;
        }
        if (world.boids[a].state == 1) {
            infected++;
        }
        if (world.boids[a].state == 2) {
            recovered++;
        }
        if (world.boids[a].state == 3) {
            deceased++;
        }
    }
    if (infected != 0) {
        graphData.push({ "uninfected": uninfected, "infected": infected, "deceased": deceased, "recovered": recovered })

        let labels = []
        let uninfectedArray = []
        let infectedArray = []
        let deceasedArray = []
        let recoveredArray = []

        for (let a = 0; a < graphData.length; a++) {
            labels.push(a + "")
            uninfectedArray.push(graphData[a].uninfected)
            infectedArray.push(graphData[a].infected)
            deceasedArray.push(graphData[a].deceased)
            recoveredArray.push(graphData[a].recovered)
        }

        chart.data.labels = labels
        chart.data.datasets[0].data = uninfectedArray
        chart.data.datasets[1].data = infectedArray
        chart.data.datasets[2].data = deceasedArray
        chart.data.datasets[3].data = recoveredArray
        chart.update()
    }
}

setInterval(updateChart, 250);



