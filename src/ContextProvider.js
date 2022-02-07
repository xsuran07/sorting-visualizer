import React, { useContext, useReducer } from "react";

import SelectionSort from "./algorithms/SelectionSort";
import * as constants from './constants';

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext);
}

export function generateBlock() {
    return Math.floor(constants.MAX_BLOCK_HEIGHT * Math.random() + constants.MIN_BLOCK_HEIGHT);
}

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

    for(let i = 0; i < constants.INITIAL_BLOCK_COUNT; i++) {
        initialState.blockList.push({
            value: generateBlock(),
            index: i
        });
    }

    return initialState;
}

export function ContextProvider({ children }) {
    const [ state, dispatch ] = useReducer(reducer, null, init);

    return (
        <MainContext.Provider value={[state, dispatch]}>
            {children}
        </MainContext.Provider>
    );
}