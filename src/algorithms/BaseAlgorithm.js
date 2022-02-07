/**
 * @brief Base class for all sorting algorithms.
 * 
 * @file BaseAlgorithm.js
 * @author Jakub Šuráň
 */

/**
 * @brief Base class for all sorting algorithm. It implements all
 * shared methods.
 */
export default class BaseAlgorithm {
    /**
     * @brief Initialize necessary values before run of algorithm.
     *
     * @param {array} values Array with representation of objects to sort.
     * @param {function} setValues 
     * @param {function} setItemColor Callback for setting color of blocks.
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
     * @brief Animation connected to run of algorithm. This method should be
     * reimplemented by particular algorithm.
     */
    animate() {
        return;
    }

    /**
     * @brief Main logic of particular sorting algorithm.
     */
    logic() {
        return;
    }

    /**
     * @brief Test if sorting is finished already.
     * 
     * @returns true if algorithm is over, false otherwise.
     */
    testEnd() {
        return false;
    }

    /**
     * @brief Perform one step of algorithm.
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
     * @brief Swaps two items in indices array and propagete this swap
     * to main state variable.
     * 
     * @param {number} a Position of the first object to swap.
     * @param {number} b Position of the second object to swap.
     * @param {boolean} hideSpecial Simple flag - when set, removes color from
     * special items (default value is true).
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
     * @brief Convenient method to access items from indices array.
     *
     * @param {number} index Position of item to inspect.
     * @returns index of item on specified posiotion.
     */
    getIndex(index) {
        return this.indices[index];
    }

    /**
     * @brief Convenient method to access items from values array.
     * 
     * @param {number} index Position of item to inspect.
     * @returns value of item on specified posiotion.
     */
    getValue(index) {
        return this.values[this.getIndex(index)].value;
    }
}