import BaseAlgorithm from './BaseAlgorithm';

export default class QuickSort extends BaseAlgorithm {
    init(values, setValues, setItemsColor) {
        super.init(values, setValues, setItemsColor);

        this.pivotSwap = false;
        this.stack = [0, this.values.length - 1];
        this.top = 1;
        this.newIter = true;
        this.sorted = [];
    }

    animate() {
        if(this.pivotSwap) {
            this.pivotSwap = false;

            this.finalChange = true;
            this.swap(this.h, this.i + 1);

            this.newIter = true;

            let p = this.i + 1;

            if(p - 1 > this.l) {
                this.stack[++this.top] = this.l;
                this.stack[++this.top] = p - 1;
            } else if(p - 1 === this.l) {
                this.sorted.push(this.getIndex(p - 1));
            }

            if(p + 1 < this.h) {
                this.stack[++this.top] = p + 1;
                this.stack[++this.top] = this.h;
            } else if(p + 1 === this.h) {
                this.sorted.push(this.getIndex(p + 1));
            }
        } else {
            this.swap(this.i, this.oldJ, false);
        }
    }

    resetValues() {
        // at the beginning of each iteration pop h + l from stack
        this.h = this.stack[this.top--];
        this.l = this.stack[this.top--];

        this.pivot = this.getValue(this.h);
        this.i = this.l - 1;
        this.j = this.l;
        this.newIter = false;

        this.setItemsColor('setSpecialItems', [this.getIndex(this.h)])
    }

    logic() {
        if(this.newIter) {
            this.setItemsColor('addSortedItems', this.sorted);
            this.sorted = [];

            this.resetValues();
        }

        this.partition()
    }

    testEnd() {
        let ret = (this.newIter && this.top < 0);

        if(ret) {
            this.setItemsColor('addSortedItems', this.sorted);
        }

        return ret;
    }

    partition() {
        this.setItemsColor('setActiveItems', [this.getIndex(this.j)]);

        if(this.j < this.h) {
            if(this.getValue(this.j) <= this.pivot) {
                this.i++;
                this.animation = (this.i !== this.j);
                this.oldJ = this.j;
            }
            this.j++;
            return true;
        } else {
            this.pivotSwap = true;
            this.animation = true;
            return false;
        }
    }
}