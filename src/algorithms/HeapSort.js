/**
 * @brief Implementation of Heap sort algorithm.
 * 
 * @file HeapeSort.js
 * @author Jakub Šuráň
 */

import BaseAlgorithm from "./BaseAlgorithm";

/**
 * @brief Class representing Heap sort algorithm.
 */
export default class HeapSort extends BaseAlgorithm {
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

        this.buildHeap = true;
        this.i = 1;
        this.j = 1;
        this.leftStart = 0;
        this.swapping = false;
        this.swapMax = true;
        this.parent = parseInt((this.i - 1) / 2);
    }

    /**
     * @brief Animation connected to run of Heap sort algorithm - swap two blocks when
     * needed.
     */
    animate() {
        // animation when building heap
        if(this.buildHeap) {
            this.swap(this.j, this.parent);
            this.j = this.parent;
            this.parent = parseInt((this.j - 1) / 2);
        // animation when swapping maximum with last item
        } else if(this.swapMax) {
            this.swapMax = false;
            this.finalChange = true;
            this.swap(0, this.i);
            this.j = 0;
            this.index = 1;
            this.swapping = this.index < this.i;
        // animation when restoring heap
        } else {
            this.swap(this.oldJ, this.oldIndex);
        }
    }

    /**
     * @brief Main logic of Heap sort algorithm - creates max-heap,
     * take block with maximum value, restore max-heap and repeat this process.
     */
    logic() {
        // reset coloring of the blokcs
        this.setItemsColor('setSpecialItems', []);
        this.setItemsColor('setActiveItems', []);

        // build max-heap
        if(this.buildHeap) {
            this.buildMaxHeap();
        } else {
            // restore max-heap
            if(this.swapping) {
                this.restoreHeap();
            // swap max value (index 0) with last unsorted item
            } else {
                this.swapMax = true;
                this.i--;
                this.animation = true;

                // color max block
                this.setItemsColor('setActiveItems', [this.getIndex(0)]);
            }
        }
    }

    /**
     * @brief Test if sorting is finished already.
     * 
     * @returns true if last step of algorithm has been made already,
     * false otherwise.
     */
    testEnd() {
        let ret = !this.buildHeap && this.i <= 0;

        // color the last block
        if(ret) {
            this.setItemsColor('addSortedItems', [this.getIndex(0)]);
        }

        return ret;
    }

    /**
     * @brief Creates max-heap from given array.
     */
    buildMaxHeap() {
        this.setItemsColor('setSpecialItems', [this.getIndex(this.j), this.getIndex(this.parent)])

        if(this.getValue(this.j) > this.getValue(this.parent)) {
            this.animation = true;
        } else {
            this.i++;
            this.parent = parseInt((this.i - 1) / 2);
            this.j = this.i;
        }

        // check for end of building part
        if(this.i >= this.values.length) {
            this.buildHeap = false;
            this.i = this.values.length;
        }
    }

    /**
     * @brief Changes given array again to max-heap
     */
    restoreHeap() {
        // get index of larger child
        if(this.index + 1 < this.i && this.getValue(this.index) < this.getValue(this.index + 1)) {
            this.index++;
        }

        // check if child is greater than parent
        if(this.getValue(this.j) < this.getValue(this.index)) {
            this.animation = true;
        }

        this.setItemsColor('setSpecialItems', [this.getIndex(this.index), this.getIndex(this.j)]);

        this.oldJ = this.j;
        this.oldIndex = this.index;
        this.j = this.index;
        this.index = 2 * this.j + 1;

        // whole unsorted part of array has been checked already
        if(this.index >= this.i) {
            this.swapping = false;        
        }
    }
}