/**
 * @brief Implementation of Bubble sort algorithm.
 * 
 * @file BubbleSort.js
 * @author Jakub Šuráň
 */

import BaseAlgorithm from "./BaseAlgorithm";

/**
 * @brief Class representing Bubble sort algorithm.
 */
export default class Bubble extends BaseAlgorithm {
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

        this.i = 0;
        this.j = 0;
        this.oldJ = 0;
    }

    /**
     * @brief Animation connected to run of Bubble sort algorithm - swap two neighbour
     * blocks in wrong order.
     */
    animate() {
        this.swap(this.oldJ, this.oldJ + 1);
    }

    /**
     * @brief Main logic of Bubble sort algorithm - find item with
     * max value in unsorted part and put it in the right position.
     */
    logic() {
        // color newly sorted block
        if(this.oldJ === -1) {
            this.oldJ = 0;
            this.setItemsColor('addSortedItems', [this.getIndex(this.values.length - this.i)]);
        }

        // highlight the currently processed element (active) and its right neighbour (special)
        this.setItemsColor('setActiveItems', [this.getIndex(this.j)]);
        this.setItemsColor('setSpecialItems', [this.getIndex(this.j + 1)]);

        if(this.getValue(this.j) > this.getValue(this.j + 1)) {
            this.animation = true;
            this.oldJ = this.j;
            this.finalChange = this.j + 1 === this.values.length - this.i - 1;
        }

        this.j++;

        // test for end of one iteration
        if(this.j >= this.values.length - this.i - 1) {
            if(!this.finalChange) {
                this.oldJ = -1;
            }
            this.i++;
            this.j = 0;
        }
    }

    /**
     * @brief Test if sorting is finished already.
     * 
     * @returns true if last step of algorithm has been made already,
     * false otherwise.
     */
    testEnd() {
        // to ensure finish of last animation
        if(this.animation) {
            return false;
        }

        let ret = this.i >= (this.values.length - 1);

        // correctly color last the blocks
        if(ret) {
            if(this.oldJ === -1) {
                this.setItemsColor('addSortedItems', [this.getIndex(this.values.length - this.i)]);
            }

            this.setItemsColor('addSortedItems', [this.getIndex(this.j)]);
        }

        return ret;
    }
}