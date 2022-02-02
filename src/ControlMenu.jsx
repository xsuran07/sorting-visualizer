import { useState } from 'react';

import { useMainContext } from './ContextProvider';

import SelectionSort from './algorithms/SelectionSort';
import BubbleSort from './algorithms/BubbleSort';
import InsertionSort from './algorithms/InsertionSort';
import QuickSort from './algorithms/QuickSort';

import styles from './styles/controlMenu.module.css';

function StartAnimation({ algo }) {
  const [ state, dispatch ] = useMainContext();
  const [ timer, setTimer ] = useState(null);

  function clear(t) {
    clearInterval(t);
    dispatch({type: 'setCurrent', payload: []});
    dispatch({type: 'toggleRunning'});
  }

  function algoStep(t) {
    if(algo.step()) {
      clear(t);
    }
  }

  function handleClick() {
    dispatch({type: 'toggleRunning'});
    algo.init(state.blockList, change, (arg) => dispatch({type: 'setCurrent', payload: arg}));
    let t = setInterval(() => algoStep(t), 1000);
    setTimer(t)
  }

  function change(a, b) {
    let arr = state.blockList.slice();

    let tmp = arr[a].index;
    arr[a].index = arr[b].index;
    arr[b].index = tmp;

    dispatch({type: 'setBlockList', payload: arr});
  }

  return (
    <button onClick={(state.running)? () => clear(timer) : handleClick}>
      {(state.running)? 'stop' : 'start'}
    </button>
  );
}

function GenericSlider({ config }) {
  const [ state, ] = useMainContext();

  const sliderStyle = (state.running && config.disable)? {
    opacity: '0.2',
    pointerEvents: 'none'
  } : {};


  return (
    <div className={styles.genericSlider} style={sliderStyle}>
      <label>{config.label}</label>
        <input id='slider' type='range'
            min={config.min} max={config.max}
            step={1}
            value={config.value}
            onChange={(e) => config.setValue(e.target.value)} />
        <p>{config.value}</p>
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
    <div className={styles.select} style={chooseAlgoStyle}>
      <label>Pick sorting algorithm:</label>
      <select value={algoIndex} onChange={handleChange}>
        <option value={0}>Selection sort</option>
        <option value={1}>Bubble sort</option>
        <option value={2}>Insertion sort</option>
        <option value={3}>QuickSort sort</option>
      </select>
    </div>
  );
}

export default function ControlMenu() {
  const [ state, dispatch ] = useMainContext();

  const blockCountConfig = {
    label: 'Choose number of blocks:',
    min: 1,
    max: 10,
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
      <div className={styles.container}>
        <div className={styles.controlMenu}>
            <GenericSlider config={blockCountConfig} />
            <ChooseAlgo />
            <GenericSlider config={speedSlider} />
            <StartAnimation algo={state.algorithm} />
        </div>
      </div>
  );
}