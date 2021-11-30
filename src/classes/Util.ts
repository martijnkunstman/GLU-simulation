export default class Util {

    public randomBetween(a: number, b: number) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    };

}