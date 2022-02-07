/**
 * @brief Implementation of Quick sort algorithm.
 * 
 * @file QuickSort.js
 * @author Jakub Šuráň
 */

import BaseAlgorithm from './BaseAlgorithm';

/**
 * @brief Class representing Quick sort algorithm.
 */
export default class QuickSort extends BaseAlgorithm {
    /**
     * @brief Initialize all shared values and other necessary variables
     * before run of algorithm.
     *
     * @param {array} values Array with representation of objects to sort.
     * @param {function} setValues 
     * @param {function} setItemColor Callback for setting color of blocks.
     */
    init(values, setValues, setItemsColor) {
        super.init(values, setValues, setItemsColor);

        this.pivotSwap = false;
        this.stack = [0, this.values.length - 1];
        this.top = 1;
        this.newIter = true;
        this.sorted = [];
    }

    /**
     * @brief Animation connected to run of Quick sort algorithm - swap
     * necessary items.
     */
    animate() {
        if(this.pivotSwap) {
            this.positionPivot();
        } else {
            this.swap(this.i, this.oldJ, false);
        }
    }

    /**
     * @brief Main logic of Merge Quick algorithm - pick pivot,
     * reorganize array according to value of this pivot and
     * keep applying same steps to remaining subarrays.
     */
    logic() {
        if(this.newIter) {
            // color newly sorted blocks
            this.setItemsColor('addSortedItems', this.sorted);
            this.sorted = [];

            this.resetValues();
        }

        // reorganize whole array according to current pivot
        this.partition()
    }

    /**
     * @brief Test if sorting is finished already.
     * 
     * @returns true if last step of algorithm has been made already,
     * false otherwise.
     */
    testEnd() {
        let ret = (this.newIter && this.top < 0);

        // color all remaining blocks
        if(ret) {
            this.setItemsColor('addSortedItems', this.sorted);
        }

        return ret;
    }

    /**
     * @brief Set necessary values and variables before next
     * iteration.
     */
    resetValues() {
        // pop h and l from stack
        this.h = this.stack[this.top--];
        this.l = this.stack[this.top--];

        // set current value of pivot and color it
        this.pivot = this.getValue(this.h);
        this.setItemsColor('setSpecialItems', [this.getIndex(this.h)])

        // rest necessary values
        this.i = this.l - 1;
        this.j = this.l;
        this.newIter = false;
    }

    /**
     * @brief Rearange current subarray according to current value
     * of pivot. Smaller blocks are put to the left, larger to the right.
     */
    partition() {
        // color current block
        this.setItemsColor('setActiveItems', [this.getIndex(this.j)]);

        if(this.j < this.h) {
            // put blocks smaler than pivot to the left from pivot's futere position
            if(this.getValue(this.j) <= this.pivot) {
                this.i++;
                this.animation = (this.i !== this.j);
                this.oldJ = this.j;
            }
            this.j++;
        // put pivot to right position
        } else {
            this.pivotSwap = true;
            this.animation = true;
        }
    }

    /**
     * @brief Put pivot block to correct position and handle
     * both remaining subarrays.
     */
    positionPivot() {
        this.pivotSwap = false;
        this.newIter = true;

        // put pivot on correct position
        this.finalChange = true;
        this.swap(this.h, this.i + 1);


        let p = this.i + 1;

        // left subarray is long enough => store its start and end
        if(p - 1 > this.l) {
            this.stack[++this.top] = this.l;
            this.stack[++this.top] = p - 1;
        // prepare only item from left subarray for coloring
        } else if(p - 1 === this.l) {
            this.sorted.push(this.getIndex(p - 1));
        }

        // right subarray is long enough => store its start and end
        if(p + 1 < this.h) {
            this.stack[++this.top] = p + 1;
            this.stack[++this.top] = this.h;
        // prepare only item from right subarray for coloring
        } else if(p + 1 === this.h) {
            this.sorted.push(this.getIndex(p + 1));
        }
    }

}