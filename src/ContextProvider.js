import React, { useContext, useReducer } from "react";

import SelectionSort from "./algorithms/SelectionSort";

const INITIAL_COUNT = 5;
const INITIAL_SPEED = 1;

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext);
}

const reducer = (state, action) => {
    switch(action.type) {
    case 'setBlockCount':
        return {...state, blockCount: parseInt(action.payload)};
    case 'setBlockList':
        return {...state, blockList: action.payload};
    case 'setSwappedItems':
        return {...state, swappedItems: action.payload};
    case 'setSortedItems':
        return {...state, sortedItems: action.payload};
    case 'addSortedItems':
        let arr = [...state.sortedItems, ...action.payload]
        return {...state, sortedItems: arr};
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
        blockCount: INITIAL_COUNT,
        speed: INITIAL_SPEED,
        algorithm: new SelectionSort(),
        blockList: [],
        swappedItems: [],
        sortedItems: [],
        activeItems: [],
        specialItems: [],
        running: false
    };

    for(let i = 0; i < INITIAL_COUNT; i++) {
        initialState.blockList.push({
            value: Math.floor(80 * Math.random() + 40),
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