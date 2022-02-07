/**
 * @brief Implementation of Selection sort algorithm.
 * 
 * @file SelectionSort.js
 * @author Jakub Šuráň
 */

import BaseAlgorithm from "./BaseAlgorithm";

/**
 * @brief Class representing Selection sort algorithm.
 */
export default class SelectionSort extends BaseAlgorithm {
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
        this.j = 1;
        this.maxIndex = 0;
    }

    /**
     * @brief Animation connected to run of Selection sort algorithm - put block
     * with max value at the right place.
     */
    animate() {
        let last = this.values.length - this.i - 1;

        // put found maximum at the right place
        this.finalChange = true;
        this.swap(this.maxIndex, last);

        this.resetValues();
    }

    /**
     * @brief Main logic of Selection sort algorithm - find item with
     * max value in unsorted part and put it in the right position.
     */
    logic() {
        // highlight the currently processed element (active) and current maximum (special)
        this.setItemsColor('setActiveItems', [this.getIndex(this.j)]);
        this.setItemsColor('setSpecialItems', [this.getIndex(this.maxIndex)]);

        if(this.getValue(this.j) >= this.getValue(this.maxIndex)) {
            this.maxIndex = this.j;
        }

        this.j++;

        // end of one iteration
        if(this.j >= this.values.length - this.i) {
            this.animation = true;
        }
    }

    /**
     * @brief Test if sorting is finished already.
     * 
     * @returns true if last step of algorithm has been made already,
     * false otherwise.
     */
    testEnd() {
        let ret = this.i >= (this.values.length - 1);

        // set correct color to the last item in array
        if(ret) {
            this.setItemsColor('addSortedItems', [this.getIndex(0)]);
        }

        return ret;
    }

    /**
     * @brief Perform necessary preparation before new iteration.
     */
    resetValues() {
        this.maxIndex = 0;
        this.j = 1;
        this.i++;
    }
}