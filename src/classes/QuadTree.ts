import Rectangle from "./Rectangle";
import Vector from "./Vector";

export default class QuadTree {

    public boundary: Rectangle
    public capacity: Number;
    public points: Array<Vector>
    public northWest: QuadTree;
    public northEast: QuadTree;
    public southWest: QuadTree;
    public southEast: QuadTree;
    public devided: boolean;

    public constructor(boundary: Rectangle, n: Number) {
        this.boundary = boundary
        this.capacity = n;
        this.points = [];
        this.devided = false;
    }

    public insert(point: Vector): boolean {

        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point)
            return true
        }
        else {
            if (!this.devided) {
                this.subdivide()
                this.devided = true;
            }
        }
        if (this.northEast.insert(point)) { return true }
        else if (this.northWest.insert(point)) { return true }
        else if (this.southEast.insert(point)) { return true }
        else if (this.southWest.insert(point)) { return true }
    }

    public query(range:Rectangle){
        let found = [];
        if (!this.boundary.intersects(range)){
            return found;
        }
        else{

        }

    }

    public subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.northEast = new QuadTree(ne, this.capacity);
        this.northWest = new QuadTree(nw, this.capacity);
        this.southEast = new QuadTree(se, this.capacity);
        this.southWest = new QuadTree(sw, this.capacity);
    }

}

