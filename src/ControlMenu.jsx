import { useState } from 'react';

import { useMainContext } from './ContextProvider';
import * as constants from './constants';
import SelectAlgo from './SelectAlgo';

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
  return (
    <ItemContainer>
      <label>{config.label}</label>
        <input className={styles.genericSlider}
            type='range'
            min={config.min} max={config.max}
            step={1}
            value={config.value}
            onChange={(e) => config.setValue(e.target.value)} />
    </ItemContainer>
  );
}

const ItemContainer = ({ children }) => {
  const [ state, ] = useMainContext();

  const containerStyle = (state.running)? {
    opacity: '0.1',
    pointerEvents: 'none'
  } : {};

  return (
    <div className={styles.itemContainer} style={containerStyle}>
      {children}
    </div>
  );
}

function ChooseAlgo() {
  return (
    <ItemContainer>
      <label>Pick sorting algorithm:</label>
      <SelectAlgo />
    </ItemContainer>
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