export default class Util {

    private static seed: number = 123456 % 2147483647

    public static random(): number {
        this.seed = this.seed * 16807 % 2147483647
        return (this.seed - 1) / 2147483646
    }

    public static randomBetween(a: number, b: number) {
        return Math.floor(this.random() * (b - a + 1) + a)
    }

}