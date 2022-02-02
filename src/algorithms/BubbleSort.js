import BaseAlgorithm from "./BaseAlgorithm";

export default class Bubble extends BaseAlgorithm {
    init(values, setValues, setItemsColor) {
        super.init(values, setValues, setItemsColor);

        this.i = 0;
        this.j = 0;
        this.oldJ = 0;
    }

    animate() {
        this.swap(this.oldJ, this.oldJ + 1);
    }

    logic() {
        if(this.oldJ === -1) {
            this.oldJ = 0;
            this.setItemsColor('addSortedItems', [this.getIndex(this.values.length - this.i)]);
        }

        this.setItemsColor('setActiveItems', [this.getIndex(this.j)]);
        this.setItemsColor('setSpecialItems', [this.getIndex(this.j + 1)]);

        if(this.getValue(this.j) > this.getValue(this.j + 1)) {
            this.animation = true;
            this.oldJ = this.j;
            this.finalChange = this.j + 1 === this.values.length - this.i - 1;
        }

        this.j++;

        if(this.j >= this.values.length - this.i - 1) {
            if(!this.finalChange) {
                this.oldJ = -1;
            }
            this.i++;
            this.j = 0;
        }
    }

    testEnd() {
        if(this.animation) {
            return false;
        }

        let ret = this.i >= (this.values.length - 1);

        if(ret) {
            if(this.oldJ === -1) {
                this.setItemsColor('addSortedItems', [this.getIndex(this.values.length - this.i)]);
            }

            this.setItemsColor('addSortedItems', [this.indices[this.j]]);
        }

        return ret;
    }
}