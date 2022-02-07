import BaseAlgorithm from './BaseAlgorithm';

export default class MergeSort extends BaseAlgorithm {
    init(values, setValues, setCurrent) {
        super.init(values, setValues, setCurrent);

        this.currSize = 1;
        this.leftStart = 0;
        this.merging = false;
    }

    animate() {
        this.setItemsColor('setActiveItems', []);
        this.setItemsColor('setSwappedItems', [this.getIndex(this.rightStart)]);

        let index = this.rightStart;
        let value = this.getIndex(this.rightStart);

        while(index !== this.currPos) {
            this.setIndex(index, this.getIndex(index - 1));
            index--;
        }

        this.setIndex(this.currPos, value);
        this.setItemsColor('addSortedItems', [this.getIndex(this.currPos)]);

        this.currPost++;
        this.mid++;
        this.rightStart++;
    }

    logic() {
        if(this.merging) {
            this.merge();
        } else {
            this.setItemsColor('setSortedItems', []);
            this.setItemsColor('setActiveItems', []);

            if(this.leftStart >= this.values.length) {
                this.leftStart = 0;
                this.currSize *= 2;
            }

            this.currPos = this.leftStart;
            this.mid = Math.min(this.leftStart + this.currSize - 1, this.values.length - 1);
            this.rightStart = this.mid + 1;
            this.end = Math.min(this.leftStart + 2 * this.currSize - 1, this.values.length - 1);

            let lenLeft = this.mid - this.leftStart + 1;
            let lenRight = this.end - this.mid;
            let tmpArr = [];

            // color left subarray
            for(let i = 0; i < lenLeft; i++) {
                tmpArr.push(this.getIndex(this.leftStart + i));
            }

            // color right subarray
            for(let i = 0; i < lenRight; i++) {
                tmpArr.push(this.getIndex(this.rightStart + i));
            }

            this.setItemsColor('setSpecialItems', tmpArr);

            if(this.rightStart >= this.values.length) {
                this.addSorted(this.leftStart, this.end);
                this.leftStart += 2 * this.currSize;
            } else {
                this.merging = true;
            }
        }
    }

    testEnd() {
        let ret = this.currSize >= this.values.length;

        if(ret) {
            this.addSorted(0, this.values.length - 1);
        }

        return ret;
    }

    getValueFromIndex(index) {
        return this.values[index].value;
    }

    merge() {
        if(this.currPos - 1 >= this.leftStart) {
            this.setItemsColor('addSortedItems', [this.getIndex(this.currPos - 1)]);
        }

        if(this.currPos > this.mid || this.rightStart > this.end) {
            this.addSorted(this.currPos, this.end);
            this.merging = false;
            this.leftStart += 2 * this.currSize;
            return;
        }

        // both subarrays are already sorted
        if(this.currPos === this.leftStart && this.getValue(this.mid) <= this.getValue(this.rightStart)) {
            this.addSorted(this.leftStart, this.end);
            this.merging = false;
            this.leftStart += 2 * this.currSize;
            return;
        }

        this.setItemsColor('setActiveItems', [this.getIndex(this.currPos)]);

        if(this.getValue(this.currPos) > this.getValue(this.rightStart)) {
            this.animation = true;
        } else {
            this.currPos++;
        }
    }

    addSorted(start, end) {
        let tmpArr = [];
        for(let i = start; i <= end; i++) {
            tmpArr.push(this.getIndex(i));
        }

        this.setItemsColor('addSortedItems', tmpArr);
    }

    setIndex(pos, value) {
        this.setValues('updateIndex', { item: value, index: pos });
        this.indices[pos] = value;
    }
}