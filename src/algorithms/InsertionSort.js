/**
 * @brief Implementation of Insertion sort algorithm.
 * 
 * @file InsertionSort.js
 * @author Jakub Šuráň
 */

import BaseAlgorithm from "./BaseAlgorithm";

/**
 * @brief Class representing Insertion sort algorithm.
 */
export default class InsertionSort extends BaseAlgorithm {
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

        this.i = 1;
        this.j = this.i - 1;
        this.sorted = [];
    }

    /**
     * @brief Animation connected to run of Insertion sort algorithm - swap two neighbour
     * blocks in wrong order.
     */
    animate() {
        this.swap(this.oldJ, this.oldJ + 1);
    }

    /**
     * @brief Main logic of Insertion sort algorithm - take current element
    and put it in right position in sorted part of array.
     */
    logic() {
        if(this.j >= 0) {
            // color newly sorted blocks
            if(this.sorted.length) {
                this.setItemsColor('addSortedItems', this.sorted);
                this.sorted = [];
            }

            // highlight the currently processed element (active) and its predecessor (special)
            this.setItemsColor('setActiveItems', [this.getIndex(this.j + 1)]);
            this.setItemsColor('setSpecialItems', [this.getIndex(this.j)]);
        }

        // current block is already at the right position
        if(this.j < 0 || this.getValue(this.j) <= this.getValue(this.j + 1)) {
            // left edge
            if(this.j < 0) {
                this.sorted = [this.getIndex(this.j + 1)];
            // greater than predecessor
            } else {
                this.sorted = [this.getIndex(this.j), this.getIndex(this.j + 1)];
            }

            this.i++;
            this.j = this.i - 1;
        // move block further left
        } else {
            this.oldJ = this.j;
            this.animation = true;
            this.j--;
        }
    }

    /**
     * @brief Test if sorting is finished already.
     * 
     * @returns true if last step of algorithm has been made already,
     * false otherwise.
     */
    testEnd() {
        let ret = this.i >= this.values.length;

        if(ret && this.sorted.length) {
            this.setItemsColor('addSortedItems', this.sorted);
            this.sorted = [];
        }
        
        return ret;
    }
}