import { useState, useEffect } from 'react';

import { useMainContext } from './ContextProvider';
import * as constants from './constants';

import styles from './styles/block.module.css';

// helper functions

const getBlockContainerWidth = () => {
  return Math.min(document.documentElement.clientWidth - 1, constants.CONTAINER_WIDTH);
}

const getCurrentParameters = (containerWidth, count) => {
  const currentSize = containerWidth / count;
  const width = parseInt(0.8 * currentSize);

  const parameters = {
    width: width,
    gap: parseInt((containerWidth - (width * count)) / (count - 1)),
  };

  return parameters;
}

// REACT components

function Block({ params, specifics }) {
  const [ state, ] = useMainContext();
  let offset = 'translate(' + ((params.width + params.gap) * specifics.order) + 'px)';
  const interval = (constants.SIZE_COEF / state.blockCount) * constants.ANIMATION_SPEED_COEF * constants.SPEED_COEF / state.speed;

  const blockStyle = {
        width: params.width + 'px',
        height: specifics.height + 'px',
        transform: offset,
        backgroundColor: specifics.color,
        transition: (state.running)? `transform ${interval}ms` : ''
    };

    return (
        <div style={blockStyle} className={styles.block}></div>
    );
}

export default function Blocks({ blockList }) {
  const [ state, ] = useMainContext();
  const [ currentWidth, setCurrentWidth ] = useState(getBlockContainerWidth());
  const sharedParameters = getCurrentParameters(currentWidth, state.blockCount);
  const BlockStyle = {
    maxWidth: constants.CONTAINER_WIDTH
  };

  const handleResize = () => {
    setCurrentWidth(getBlockContainerWidth());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {window.removeEventListener('resize', handleResize)};
  }, []);

  const getColor = (i) => {
    if(state.swappedItems.includes(i)) {
      return constants.SWAP_ITEM_COLOR;
    } else if(state.activeItems.includes(i)) {
      return constants.ACTIVE_ITEM_COLOR;
    } else if(state.specialItems.includes(i)) {
      return constants.SPECIAL_ITEM_COLOR;
    } else if(state.sortedItems.includes(i)) {
      return constants.SORTED_ITEM_COLOR;
    } else {
      return constants.NORMAL_ITEM_COLOR;
    }
  }

  const getSpecificParameters = (item, index) => {
    return {
      color: getColor(index),
      height: item.value,
      order: item.index
    }
  }

  return (
    <div className={styles.container}>
      <div style={BlockStyle} className={styles.blockContainer}>
        {blockList.map((value, i) =>
          <Block key={i} params={sharedParameters} specifics={getSpecificParameters(value, i)} />
        )}
      </div>
    </div>
  );
}