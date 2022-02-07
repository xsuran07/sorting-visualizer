/**
 * @brief Implementation of component for picking sorting algorithm.
 * 
 * @file SelectAlgo.jsx
 * @author Jakub Šuráň
 */

import { useState, useEffect } from "react";

import { useMainContext } from './ContextProvider';
import SelectionSort from './algorithms/SelectionSort';
import BubbleSort from './algorithms/BubbleSort';
import InsertionSort from './algorithms/InsertionSort';
import QuickSort from './algorithms/QuickSort';
import MergeSort from './algorithms/MergeSort';
import HeapSort from './algorithms/HeapSort';

import styles from './styles/selectAlgo.module.css';

// helper functions

/**
 * @brief According to given string returns
 * object representing particular algorithm.
 * 
 * @param {string} name Name of sorting algorithm.
 * @returns object representing particular sorting algorithm.
 */
const getAlgorithm = (name) => {
    switch(name) {
    case 'Selection':
      return new SelectionSort();
    case 'Bubble':
      return new BubbleSort();
    case 'Insertion':
      return new InsertionSort();
    case 'Quick':
      return new QuickSort();
    case 'Merge':
      return new MergeSort();
    case 'Heap':
      return new HeapSort();
    default:
      return null;
    }
}

// REACT components

/**
 * @brief Component representing select - allows user to pick
 * sorting algorithm.
 */
export default function SelectAlgo() {
    const [ showOptions, setShowOptions ] = useState(false);
    const [ chosenOption, setChosenOption ] = useState('Selection');
    const [ , dispatch ] = useMainContext();
    const options = [
        'Selection',
        'Bubble',
        'Insertion',
        'Quick',
        'Merge',
        'Heap',
    ];

    // add callback to document
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    // toggle showing of options list
    const handleDisplay = () => {
        setShowOptions(prev => !prev);
    }

    // handle click on particular sorting algorithm
    const handleOptionClick = (e) => {
        const name = e.target.getAttribute('name');

        if(name !== chosenOption) {
            const algo = getAlgorithm(name);

            if(algo) {
                dispatch({type: 'setAlgorithm', payload: algo});
                setChosenOption(name);
                setShowOptions(false);
            }
        }
    }

    // handles clicks outside of this component
    const handleClickOutside = (e) => {
        if(!e.target.classList.contains(styles.selectAlgo) && !e.target.classList.contains(styles.algorithm)) {
            setShowOptions(false);
        }
    }

    return (
        <div className={styles.selectAlgoContainer}>
            <div onClick={handleDisplay}
                className={(showOptions)? styles.selectAlgo + ' ' + styles.active : styles.selectAlgo}    
            >
                {chosenOption + ' sort'}
            </div>
            {showOptions && 
                <ul>
                    {options.map((item, i) =>
                        <li style={(item === chosenOption)? {backgroundColor: 'hsl(205, 96%, 35%)'} : {}}
                            className={styles.algorithm}
                            key={i}
                            onClick={handleOptionClick}
                            name={item}
                        >
                            {item + ' sort'}
                        </li>
                    )}
                </ul>
            }
        </div>
    );
}