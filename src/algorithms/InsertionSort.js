import BaseAlgorithm from "./BaseAlgorithm";

export default class InsertionSort extends BaseAlgorithm {
    init(values, setValues, setItemsColor) {
        super.init(values, setValues, setItemsColor);

        this.i = 1;
        this.j = this.i - 1;
        this.sorted = [];
    }

    animate() {
        this.swap(this.oldJ, this.oldJ + 1);
    }

    logic() {
        if(this.j >= 0) {
            if(this.sorted.length) {
                this.setItemsColor('addSortedItems', this.sorted);
                this.sorted = [];
            }

            this.setItemsColor('setActiveItems', [this.getIndex(this.j + 1)]);
            this.setItemsColor('setSpecialItems', [this.getIndex(this.j)]);
        }

        if(this.j < 0 || this.getValue(this.j) <= this.getValue(this.j + 1)) {
            if(this.j < 0) {
                this.sorted = [this.getIndex(this.j + 1)];
            } else {
                this.sorted = [this.getIndex(this.j), this.getIndex(this.j + 1)];
            }

            this.i++;
            this.j = this.i - 1;
        } else {
            this.oldJ = this.j;
            this.animation = true;
            this.j--;
        }
    }

    testEnd() {
        let ret = this.i >= this.values.length;

        if(ret && this.sorted.length) {
            this.setItemsColor('addSortedItems', this.sorted);
            this.sorted = [];
        }
        
        return ret;
    }
}