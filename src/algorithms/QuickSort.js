import BaseAlgorithm from './BaseAlgorithm';

export default class QuickSort extends BaseAlgorithm {
    init(values, setValues, setCurrent) {
        super.init(values, setValues, setCurrent);

        this.stack = [0, this.values.length - 1];
        this.top = 1;
        this.newIter = true;
    }

    animate() {
        this.setCurrent([this.getIndex(this.i), this.getIndex(this.oldJ)]);

        this.swap(this.i, this.oldJ);
        this.setValues(this.getIndex(this.i), this.getIndex(this.oldJ));
    }

    resetValues() {
        // at the beginning of each iteration pop h + l from stack
        this.h = this.stack[this.top--];
        this.l = this.stack[this.top--];

        this.pivot = this.getValue(this.h);
        this.i = this.l - 1;
        this.j = this.l;
        this.newIter = false;
    }

    logic() {
        if(this.newIter) {
            this.resetValues();
        }

        if(!this.partition()) {
            this.newIter = true;

            let p = this.i + 1;

            if(p - 1 > this.l) {
                this.stack[++this.top] = this.l;
                this.stack[++this.top] = p - 1;
            }

            if(p + 1 < this.h) {
                this.stack[++this.top] = p + 1;
                this.stack[++this.top] = this.h;
            }
        }
    }

    testEnd() {
        return (this.newIter && this.top < 0);
    }

    partition() {
        this.setCurrent([this.getIndex(this.j)]);

        if(this.j < this.h) {
            if(this.getValue(this.j) <= this.pivot) {
                this.i++;
                this.animation = (this.i !== this.j);
                this.oldJ = this.j;
            }
            this.j++;
            return true;
        } else {
            this.setCurrent([this.getIndex(this.h), this.getIndex(this.i + 1)]);

            this.swap(this.h, this.i + 1);
            this.setValues(this.getIndex(this.h), this.getIndex(this.i + 1));

            return false;
        }
    }

}