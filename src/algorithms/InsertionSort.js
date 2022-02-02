import BaseAlgorithm from "./BaseAlgorithm";

export default class InsertionSort extends BaseAlgorithm {
    init(values, setValues, setCurrent) {
        super.init(values, setValues, setCurrent);

        this.i = 1;
        this.j = this.i - 1;
    }

    animate() {
        this.setCurrent([this.getIndex(this.oldJ), this.getIndex(this.oldJ + 1)]);

        this.swap(this.oldJ, this.oldJ + 1);
        this.setValues(this.getIndex(this.oldJ), this.getIndex(this.oldJ + 1));
    }

    logic() {
        if(this.j >= 0) {
            this.setCurrent([this.getIndex(this.j), this.getIndex(this.j + 1)]);
        }

        if(this.j < 0 || this.getValue(this.j) <= this.getValue(this.j + 1)) {
            this.i++;
            this.j = this.i - 1;
        } else {
            this.oldJ = this.j;
            this.animation = true;
            this.j--;
        }
    }

    testEnd() {
        return this.i >= this.values.length;
    }
}