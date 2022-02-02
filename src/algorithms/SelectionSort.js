import BaseAlgorithm from "./BaseAlgorithm";

export default class SelectionSort extends BaseAlgorithm {
    init(values, setValues, setItemsColor) {
        super.init(values, setValues, setItemsColor);

        this.i = 0;
        this.j = 1;
        this.maxIndex = 0;
    }

    animate() {
        let last = this.values.length - this.i - 1;

        // put found maximum at the right place
        this.finalChange = true;
        this.swap(this.maxIndex, last);

        this.maxIndex = 0;
        this.j = 1;
        this.i++;
    }

    logic() {
        this.setItemsColor('setActiveItems', [this.getIndex(this.j)]);
        this.setItemsColor('setSpecialItems', [this.getIndex(this.maxIndex)]);

        if(this.getValue(this.j) >= this.getValue(this.maxIndex)) {
            this.maxIndex = this.j;
        }

        this.j++;

        // end of one iteration
        if(this.j >= this.values.length - this.i) {
            this.animation = true;
        }
    }

    testEnd() {
        let ret = this.i >= (this.values.length - 1);

        if(ret) {
            this.setItemsColor('addSortedItems', [this.getIndex(0)]);
        }

        return ret;
    }
}