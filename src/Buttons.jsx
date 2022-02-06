import { useState } from 'react';

import { useMainContext } from './ContextProvider';

import styles from './styles/buttons.module.css';

export function StartButton() {
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
      if(state.algorithm.step()) {
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

    state.algorithm.init(state.blockList, change, setItemsolor);
    let t = setInterval(() => algoStep(t), 1000);
    setTimer(t)
  }

  return (
    <button className={styles.startButton + ' ' + styles.genericButton}
      onClick={(state.running)? () => clear(timer) : handleClick}
    >
      {((state.running)? 'Stop' : 'Sort')}
    </button>
  );
}

export function ShuffleButton() {
    return (
      <button className={styles.genericButton + ' ' + styles.shuffleButton}>
        Shuffle
      </button>
    );
}