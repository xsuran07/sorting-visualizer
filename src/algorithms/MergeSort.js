/**
 * @brief Implementation of Merge sort algorithm.
 * 
 * @file MergeSort.js
 * @author Jakub Šuráň
 */

import BaseAlgorithm from './BaseAlgorithm';

/**
 * @brief Class representing Merge sort algorithm.
 */
export default class MergeSort extends BaseAlgorithm {
    /**
     * @brief Initialize all shared values and other necessary variables
     * before run of algorithm.
     *
     * @param {array} values Array with representation of objects to sort.
     * @param {function} setValues 
     * @param {function} setItemColor Callback for setting color of blocks.
     */
    init(values, setValues, setCurrent) {
        super.init(values, setValues, setCurrent);

        this.currSize = 1;
        this.leftStart = 0;
        this.merging = false;
    }

    /**
     * @brief Animation connected to run of Merge sort algorithm - put currently
     * first item in right subarray to current position and move all items before it.
     */
    animate() {
        // color item to be put to right position (swapped) and reset active items
        this.setItemsColor('setSwappedItems', [this.getIndex(this.rightStart)]);
        this.setItemsColor('setActiveItems', []);

        let index = this.rightStart;
        let value = this.getIndex(this.rightStart);

        // move all items before swapped item
        while(index !== this.currPos) {
            this.setIndex(index, this.getIndex(index - 1));
            index--;
        }

        // put swapped item to right position
        this.setIndex(this.currPos, value);
        this.setItemsColor('addSortedItems', [this.getIndex(this.currPos)]);

        this.currPost++;
        this.mid++;
        this.rightStart++;
    }

    /**
     * @brief Main logic of Merge sort algorithm - start with temporary arrays with
     *  one item and progressively merge them together while updating size of
     * temporary arrays.
     */
    logic() {
        if(this.merging) {
            this.merge();
        } else {
            // reset color of blocks
            this.setItemsColor('setSortedItems', []);
            this.setItemsColor('setActiveItems', []);

            // all subarrays of current size has been processed => update size of subarrays
            if(this.leftStart >= this.values.length) {
                this.leftStart = 0;
                this.currSize *= 2;
            }

            // set parameters for current subarrays
            this.currPos = this.leftStart;
            this.mid = Math.min(this.leftStart + this.currSize - 1, this.values.length - 1);
            this.rightStart = this.mid + 1;
            this.end = Math.min(this.leftStart + 2 * this.currSize - 1, this.values.length - 1);

            this.colorSubarrays();

            // right subbarray doesn't exist => no need to do merge
            if(this.rightStart >= this.values.length) {
                this.addSorted(this.leftStart, this.end);
                this.leftStart += 2 * this.currSize;
            // merge both subarrays
            } else {
                this.merging = true;
            }
        }
    }

    /**
     * @brief Color all blocks from temporary subarrays.
     */
    colorSubarrays() {
        let lenLeft = this.mid - this.leftStart + 1;
        let lenRight = this.end - this.mid;
        let tmpArr = [];

        // color blocks from left subarray
        for(let i = 0; i < lenLeft; i++) {
            tmpArr.push(this.getIndex(this.leftStart + i));
        }

        for(let i = 0; i < lenRight; i++) {
            tmpArr.push(this.getIndex(this.rightStart + i));
        }

        this.setItemsColor('setSpecialItems', tmpArr);

    }

    /**
     * @brief Test if sorting is finished already.
     * 
     * @returns true if last step of algorithm has been made already,
     * false otherwise.
     */
    testEnd() {
        let ret = this.currSize >= this.values.length;

        // color the last block
        if(ret) {
            this.addSorted(0, this.values.length - 1);
        }

        return ret;
    }

    /**
     * @brief Merge two temporary arrays into one. Merging
     * is done in place.
     */
    merge() {
        // color lastly sorted item
        if(this.currPos - 1 >= this.leftStart) {
            this.setItemsColor('addSortedItems', [this.getIndex(this.currPos - 1)]);
        }

        // both subarrays are already sorted
        if(this.currPos > this.mid || this.rightStart > this.end) {
            this.addSorted(this.currPos, this.end);
            this.merging = false;
            this.leftStart += 2 * this.currSize;
            return;
        }

        // subarrays are sorted at the beggining => no need to do changes
        if(this.currPos === this.leftStart && this.getValue(this.mid) <= this.getValue(this.rightStart)) {
            this.addSorted(this.leftStart, this.end);
            this.merging = false;
            this.leftStart += 2 * this.currSize;
            return;
        }

        // color currently processed element
        this.setItemsColor('setActiveItems', [this.getIndex(this.currPos)]);

        if(this.getValue(this.currPos) > this.getValue(this.rightStart)) {
            this.animation = true;
        } else {
            this.currPos++;
        }
    }

    /**
     * Correctly color all items from given range.
     * 
     * @param {number} start Starting index.
     * @param {number} end Ending index.
     */
    addSorted(start, end) {
        let tmpArr = [];
        for(let i = start; i <= end; i++) {
            tmpArr.push(this.getIndex(i));
        }

        this.setItemsColor('addSortedItems', tmpArr);
    }

    /**
     * Put given value to given position in indices array + propagate
     * this change to main state array.
     * 
     * @param {number} pos Position of adjusted item.
     * @param {number} value New value to be set.
     */
    setIndex(pos, value) {
        this.setValues('updateIndex', { item: value, index: pos });
        this.indices[pos] = value;
    }
}