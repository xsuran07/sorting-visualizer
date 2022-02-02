import BaseAlgorithm from "./BaseAlgorithm";

export default class SelectionSort extends BaseAlgorithm {
    init(values, setValues, setCurrent) {
        super.init(values, setValues, setCurrent);

        this.i = 0;
        this.j = 0;
        this.maxIndex = 0;
    }

    animate() {
        let last = this.values.length - this.i - 1;
        this.setCurrent([this.getIndex(last), this.getIndex(this.maxIndex)]);

        // put found maximum at the right place
        this.swap(this.maxIndex, last);
        this.setValues(this.getIndex(last), this.getIndex(this.maxIndex));

        this.maxIndex = 0;
        this.j = 0;
        this.i++;
    }

    logic() {
        this.setCurrent([this.indices[this.j]]);

        if(this.getValue(this.j) > this.getValue(this.maxIndex)) {
            this.maxIndex = this.j;
        }

        this.j++;

        // end of one iteration
        if(this.j >= this.values.length - this.i) {
            this.animation = true;
        }
    }

    testEnd() {
        return this.i >= (this.values.length - 1);
    }
}