import BaseAlgorithm from "./BaseAlgorithm";

export default class Bubble extends BaseAlgorithm {
    init(values, setValues, setCurrent) {
        super.init(values, setValues, setCurrent);

        this.i = 0;
        this.j = 0;
        this.oldJ = 0;
    }

    animate() {
        this.setCurrent([this.getIndex(this.oldJ), this.getIndex(this.oldJ + 1)]);

        this.swap(this.oldJ, this.oldJ + 1);
        this.setValues(this.getIndex(this.oldJ), this.getIndex(this.oldJ + 1));
    }

    logic() {
        this.setCurrent([this.getIndex(this.j), this.getIndex(this.j + 1)]);

        if(this.getValue(this.j) > this.getValue(this.j + 1)) {
            this.animation = true;
            this.oldJ = this.j;
        }

        this.j++;

        if(this.j >= this.values.length - this.i - 1) {
            this.i++;
            this.j = 0;
        }
    }

    testEnd() {
        return this.i >= (this.values.length - 1);
    }
}