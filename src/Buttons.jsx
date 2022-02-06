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
    const [ state, dispatch ] = useMainContext();

    // Fisher-Yates algoritm to shuffle array
    const shuffleArray = () => {
        let arr = state.blockList.slice();

        for(let i = state.blockCount - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            const tmp = arr[i].index;
            arr[i].index = arr[j].index;
            arr[j].index = tmp;
        }

        dispatch({ type: 'setBlockList', payload: arr });
        dispatch({type: 'setSortedItems', payload: []});
    }   

    return (
      <button className={styles.genericButton + ' ' + styles.shuffleButton}
        onClick={shuffleArray}
      >
        Shuffle
      </button>
    );
}