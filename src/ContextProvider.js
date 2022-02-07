/**
 * @brief Provider of shared context for all components.
 * 
 * @file ContextProvider.js
 * @author Jakub Šuráň
 */

import React, { useContext, useReducer } from "react";

import SelectionSort from "./algorithms/SelectionSort";
import * as constants from './constants';

// instance of shared context
const MainContext = React.createContext();

/**
 * Generates value of the new block.
 * 
 * @returns new value of the block.
 */
export function generateBlock() {
    return Math.floor(constants.MAX_BLOCK_HEIGHT * Math.random() + constants.MIN_BLOCK_HEIGHT);
}

/**
 * @brief Hook which allows access to shared context.
 * 
 * @returns array representing shared state.
 */
export function useMainContext() {
    return useContext(MainContext);
}

/**
 * @brief Callback reducer to update shared state.
 * 
 * @param {object} state Object representing current state.
 * @param {object} action Object representing action to be performed.
 * @returns updated state object.
 */
const reducer = (state, action) => {
    switch(action.type) {
    case 'setBlockCount':
        return {...state, blockCount: parseInt(action.payload)};
    case 'setBlockList':
        return {...state, blockList: action.payload};
    case 'addSwappedItems':
        return {...state, swappedItems: [...state.swappedItems, ...action.payload]};
    case 'setSwappedItems':
        return {...state, swappedItems: action.payload};
    case 'setSortedItems':
        return {...state, sortedItems: action.payload};
    case 'addSortedItems':
        return {...state, sortedItems: [...state.sortedItems, ...action.payload]};
    case 'setActiveItems':
        return {...state, activeItems: action.payload};
    case 'setSpecialItems':
        return {...state, specialItems: action.payload};
    case 'setSpeed':
        return {...state, speed: parseInt(action.payload)};
    case 'setAlgorithm':
        return {...state, algorithm: action.payload};
    case 'toggleRunning':
        return {...state, running: !state.running};
    default:
        return state;
    }
}

/**
 * @brief Set initial values to the shared context.
 * 
 * @returns initialized shared context.
 */
const init = () => {
    let initialState = {
        blockCount: constants.INITIAL_BLOCK_COUNT,
        speed: constants.INITIAL_SPEED,
        algorithm: new SelectionSort(),
        blockList: [],
        swappedItems: [],
        sortedItems: [],
        activeItems: [],
        specialItems: [],
        running: false
    };

    // generates values for all blocks
    for(let i = 0; i < constants.INITIAL_BLOCK_COUNT; i++) {
        initialState.blockList.push({
            value: generateBlock(),
            index: i
        });
    }

    return initialState;
}

/**
 * @brief Component which provides shared context to all its childs.
 * 
 * @param {any} Child elements
 */
export function ContextProvider({ children }) {
    const [ state, dispatch ] = useReducer(reducer, null, init);

    return (
        <MainContext.Provider value={[state, dispatch]}>
            {children}
        </MainContext.Provider>
    );
}