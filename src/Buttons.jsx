import { useState, useEffect } from 'react';

import { useMainContext } from './ContextProvider';
import * as constants from './constants';

import styles from './styles/buttons.module.css';

export function StartButton() {
  const [ state, dispatch ] = useMainContext();
  const [ timer, setTimer ] = useState(1);
  const [ animation, setAnimation ] = useState(1);
  const animationInterval = (constants.SIZE_COEF / state.blockCount) * constants.SPEED_COEF / state.speed;

  console.log(animationInterval)
  useEffect(() => {
      if(state.running) {
        let t = setTimeout(() => algoStep(timer, setAnimation), animationInterval);
        setTimer(t);
      }
  }, [animation]);

  /**
   * Stop animation and perform necessary cleanup.
   * 
   * @param {timeout object} t 
   */
  const clear = (t) => {
    // stop animations
    clearTimeout(t);

    // reset values of state variables
    dispatch({type: 'setSwappedItems', payload: []});
    dispatch({type: 'setActiveItems', payload: []});
    dispatch({type: 'setSpecialItems', payload: []});
    dispatch({type: 'toggleRunning'});
  }

  /**
   * Perform specified action on blocks.
   * 
   * @param {string} type 
   * @param {any} payload 
   */
  const updateBlocks = (type, payload) => {
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

  /**
   * Perform one step of sorting and plan another step if soritng isn't
   * finished.
   * 
   * @param {timeout object} t 
   */
  const algoStep = (t, setter) => {
    if(state.algorithm.step()) {
      clear(t);
    } else {
      setter(prev => -1 * prev);
    }
  }

  /**
   * Callback function for handling click of the button
   */
  const handleClick = () => {

    dispatch({type: 'setSortedItems', payload: []});
    dispatch({type: 'toggleRunning'});

    // initialize sorting algorithm
    state.algorithm.init(
      state.blockList,
      updateBlocks,
      (type, payload) => {
        dispatch({type: type, payload: payload
      })
    });

    algoStep(timer, setAnimation);
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