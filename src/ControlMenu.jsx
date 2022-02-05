import { useState } from 'react';

import { useMainContext } from './ContextProvider';
import * as constants from './constants';

import SelectionSort from './algorithms/SelectionSort';
import BubbleSort from './algorithms/BubbleSort';
import InsertionSort from './algorithms/InsertionSort';
import QuickSort from './algorithms/QuickSort';
import MergeSort from './algorithms/MergeSort';
import HeapSort from './algorithms/HeapSort';

import styles from './styles/controlMenu.module.css';

function StartAnimation({ algo }) {
  const [ state, dispatch ] = useMainContext();
  const [ timer, setTimer ] = useState(null);

  function clear(t) {
    // stop animations
    clearInterval(t);

    // reset values of state variables
    dispatch({type: 'setSwappedItems', payload: []});
    dispatch({type: 'setActiveItems', payload: []});
    dispatch({type: 'setSpecialItems', payload: []});
    dispatch({type: 'toggleRunning'});
  }

  const handleClick = () => {
    const algoStep = (t) => {
      if(algo.step()) {
        clear(t);
      }
    }

    const change = (type, payload) => {
      let arr = state.blockList.slice();

      switch(type) {
      case 'swap':
        let tmp = arr[payload.a].index;
        arr[payload.a].index = arr[payload.b].index;
        arr[payload.b].index = tmp;
        break;
      case 'updateIndex':
        arr[payload.item].index = payload.index;
        break;
      default:
        return;
      }

      dispatch({type: 'setBlockList', payload: arr});
    }

    const setItemsolor = (type, payload) => {
        dispatch({type: type, payload: payload});
    }

    dispatch({type: 'setSortedItems', payload: []});
    dispatch({type: 'toggleRunning'});

    algo.init(state.blockList, change, setItemsolor);
    let t = setInterval(() => algoStep(t), 1000);
    setTimer(t)
  }


  return (
    <button className={styles.startButton} onClick={(state.running)? () => clear(timer) : handleClick}>
      {((state.running)? 'Stop' : 'Start') + ' sorting'}
    </button>
  );
}

function GenericSlider({ config }) {
  const [ state, ] = useMainContext();

  const sliderStyle = (state.running && config.disable)? {
    opacity: '0.1',
    pointerEvents: 'none'
  } : {};

  return (
    <div className={styles.itemContainer} style={sliderStyle}>
      <label>{config.label}</label>
        <input className={styles.genericSlider}
            type='range'
            min={config.min} max={config.max}
            step={1}
            value={config.value}
            onChange={(e) => config.setValue(e.target.value)} />
    </div>
  );
}

const getAlgorithm = (index) => {
    switch(index) {
    case 0:
      return new SelectionSort();
    case 1:
      return new BubbleSort();
    case 2:
      return new InsertionSort();
    case 3:
      return new QuickSort();
    case 4:
      return new MergeSort();
    case 5:
      return new HeapSort();
    default:
      return null;
    }
}

function ChooseAlgo() {
  const [ state, dispatch ] = useMainContext();
  const [ algoIndex, setAlgoIndex ] = useState();

  const chooseAlgoStyle = (state.running)? {
    opacity: '0.2',
    pointerEvents: 'none'
  } : {};

  const handleChange = (e) => {
    setAlgoIndex(parseInt(e.target.value));

    let algo = getAlgorithm(parseInt(e.target.value));

    if(algo) {
      dispatch({type: 'setAlgorithm', payload: algo});
    }
  }

  return (
    <div className={styles.itemContainer} style={chooseAlgoStyle}>
      <label>Pick sorting algorithm:</label>
      <select value={algoIndex} onChange={handleChange}>
        <option value={0}>Selection sort</option>
        <option value={1}>Bubble sort</option>
        <option value={2}>Insertion sort</option>
        <option value={3}>QuickSort sort</option>
        <option value={4}>MergeSort sort</option>
        <option value={5}>HeapSort sort</option>
      </select>
    </div>
  );
}

export default function ControlMenu() {
  const [ state, dispatch ] = useMainContext();

  const blockCountConfig = {
    label: 'Choose number of blocks:',
    min: constants.MIN_BLOCKS,
    max: constants.MAX_BLOCKS,
    value: state.blockCount,
    setValue: (arg) => dispatch({type: 'setBlockCount', payload: arg}),
    disable: true
  };

  const speedSlider = {
    label: 'Choose speed:',
    min: 0,
    max: 2,
    value: state.speed,
    setValue: (arg) => dispatch({type: 'setSpeed', payload: arg}),
    disable: false
  };

  return (
      <div className={styles.mainContainer}>
        <h1>Sorting algorithms visualization</h1>
        <div className={styles.controlMenuContainer}>
          <div className={styles.controlMenu}>
              <GenericSlider config={blockCountConfig} />
              <ChooseAlgo />
              <GenericSlider config={speedSlider} />
              <StartAnimation algo={state.algorithm} />
          </div>
        </div>
      </div>
  );
}