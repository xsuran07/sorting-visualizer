/**
 * @brief Base class for all sorting algorithms.
 * @file BaseAlgorithm.js
 */

export default class BaseAlgorithm {
    /**
     * Initialize necessary values before run of algorithm.
     *
     * @param {array} values 
     * @param {function} setValues 
     * @param {function} setItemColor
     */
    init(values, setValues, setItemsColor) {
        // flag which signals active animation
        this.animation = false;

        this.finalChange = false;
 
        // set values with values to sort + two callbacks
        this.values = values;
        this.setValues = setValues;
        this.setItemsColor = setItemsColor;

        // initialize initialize array with block's indices
        this.indices = [];
        for(let i = 0; i < values.length; i++) {
            this.indices.push(values.indexOf(values.find(obj => obj.index === i)));
        }
    }

    /**
     * Animation connected to run of algorithm. This method should be
     * reimplemented by particular algorithm.
     */
    animate() {
        return;
    }

    /**
     * Main logic of particular sorting algorithm.
     */
    logic() {
        return;
    }

    /**
     * Test if sorting is finished.
     * 
     * @returns true if algorithm is over, false otherwise.
     */
    testEnd() {
        return false;
    }

    /**
     * Perform one step of algorithm.
     * 
     * @returns true if last step has been performed, false otherwise.
     */
    step() {
        this.setItemsColor('setSwappedItems', []);

        // test for end of algorithm
        if(this.testEnd()) {
            return true;
        }

        // array is too short => no sorting is necessary
        if(this.values.length < 2) {
            return false;
        } else if(this.animation) {
            this.animation = false;
            this.animate();
        } else {
            this.logic();
        }

        return false;
    }

    /**
     * Swaps two items in indices array and propagete this swap
     * to main state variable.
     * 
     * @param {number} a 
     * @param {number} b
     * @param {boolean} hideSpecial
     */
    swap(a, b, hideSpecial = true) {
        if(this.finalChange) {
            this.finalChange = false;
            this.setItemsColor('addSortedItems', [this.getIndex(a)]);
        }

        if(hideSpecial) {
            this.setItemsColor('setSpecialItems', []);
        }
        
        this.setItemsColor('setSwappedItems', [this.getIndex(a), this.getIndex(b)]);

        // propagate changes to main state variable
        this.setValues('swap', { a: this.getIndex(a), b: this.getIndex(b) });

        // swap items in indices array
        let tmp = this.indices[a];
        this.indices[a] = this.indices[b];
        this.indices[b] = tmp;
    }

    /**
     * Convenient method to access items from indices array.
     *
     * @param {number} index 
     * @returns 
     */
    getIndex(index) {
        return this.indices[index];
    }

    /**
     * Convenient method to access items from values array.
     * 
     * @param {number} index 
     * @returns 
     */
    getValue(index) {
        return this.values[this.indices[index]].value;
    }
}