import BaseAlgorithm from './BaseAlgorithm';

export default class MergeSort extends BaseAlgorithm {
    init(values, setValues, setCurrent) {
        super.init(values, setValues, setCurrent);

        this.currSize = 1;
        this.leftStart = 0;
    }

    animate() {
        this.merge()
        this.leftStart += 2 * this.currSize;
    }

    logic() {
        this.setItemsColor('setSortedItems', []);

        if(this.leftStart >= this.values.length) {
            this.leftStart = 0;
            this.currSize *= 2;
        }

        // get start index of first subarrray, 
        this.mid = Math.min(this.leftStart + this.currSize - 1, this.values.length - 1);
        this.rightStart = this.mid + 1;
        this.end = Math.min(this.leftStart + 2 * this.currSize - 1, this.values.length - 1);

        this.lenLeft = this.mid - this.leftStart + 1;
        this.lenRight = this.end - this.mid;

        this.leftArr = Array(this.lenLeft);
        this.rightArr = Array(this.lenRight);

        // copy left subarray
        for(let i = 0; i < this.lenLeft; i++) {
            this.leftArr[i] = this.getIndex(this.leftStart + i);
        }

        this.setItemsColor('setActiveItems', this.leftArr);

        // copy right subarray
        for(let i = 0; i < this.lenRight; i++) {
            this.rightArr[i] = this.getIndex(this.rightStart + i);
        }

        this.setItemsColor('setSpecialItems', this.rightArr);

        this.animation = true;
    }

    testEnd() {
        let ret = this.currSize >= this.values.length;

        if(ret) {
            this.setItemsColor('setSortedItems', this.leftArr);
        }

        return ret;
    }

    getValueFromIndex(index) {
        return this.values[index].value;
    }

    merge() {
        let i = 0;
        let j = 0;
        let k = this.leftStart;

        while (i < this.lenLeft && j < this.lenRight) {
            if (this.getValueFromIndex(this.leftArr[i]) <= this.getValueFromIndex(this.rightArr[j])) {
                this.setIndex(k, this.leftArr[i]);
                i++;
            } else {
                this.setIndex(k, this.rightArr[j]);
                j++;
            }

            k++;
        }

        while(i < this.lenLeft) {
            this.setIndex(k, this.leftArr[i]);
            i++;
            k++;
        }

        while(j < this.lenRight) {
            this.setIndex(k, this.rightArr[j]);
            j++;
            k++;
        }
    }

    setIndex(pos, value) {
        this.setValues('updateIndex', { item: value, index: pos });

        if(this.indices[pos] !== value) {
            this.setItemsColor('addSwappedItems', [value]);
        }

        this.indices[pos] = value;
    }
}