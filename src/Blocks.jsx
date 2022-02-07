/**
 * @brief Implementation of component representing objects that
 * are being sorted.
 * 
 * @file Blocks.js
 * @author Jakub Šuráň
 */

import { useState, useEffect } from 'react';

import { useMainContext } from './ContextProvider';
import * as constants from './constants';

import styles from './styles/block.module.css';

// helper functions

/**
 * @brief Find out current size of container with blocks. Calculation
 * is based on current size of window and maximum allowed widht of container.
 * 
 * @returns width of container with blocks.
 */
const getBlockContainerWidth = () => {
  return Math.min(document.documentElement.clientWidth - 1, constants.CONTAINER_WIDTH - 2 * constants.MIN_OFFSET);
}

/**
 * @brief Calculates current shared parameters for all blocks - width of the block,
 * width of the gap and size of margin.
 * 
 * @param {number} containerWidth Current width of container with blocks.
 * @param {number} count Currnet number of blocks.
 * @returns object with calculated parameters.
 */
const getCurrentParameters = (containerWidth, count) => {
  const currentSize = containerWidth / count;
  const width = parseInt(0.8 * currentSize);
  const gap = parseInt((containerWidth - (width * count)) / (count - 1));

  const parameters = {
    width: width,
    gap: gap,
    margin: (containerWidth - (count * width + (count - 1) * gap)) / 2
  };

  return parameters;
}

// REACT components

/**
 * Component representing one object (block) to sort.
 * 
 * @param {object} param0 Parameters for block component.
 */
function Block({ params, specifics }) {
  const [ state, ] = useMainContext();
  const offsetSize = constants.MIN_OFFSET + params.margin + (params.width + params.gap) * specifics.order;
  const interval = (constants.SIZE_COEF / state.blockCount) * constants.ANIMATION_SPEED_COEF * constants.SPEED_COEF / state.speed;

  const blockStyle = {
        width: params.width + 'px',
        height: specifics.height + 'px',
        transform: `translate(${offsetSize}px)`,
        backgroundColor: specifics.color,
        transition: (state.running)? `transform ${interval}ms` : ''
    };

    return (
        <div style={blockStyle} className={styles.block}></div>
    );
}

/**
 * @brief Component representing container with blocks to sort.
 */
export default function Blocks() {
  const [ state, ] = useMainContext();
  const [ currentWidth, setCurrentWidth ] = useState(getBlockContainerWidth());
  const sharedParameters = getCurrentParameters(currentWidth, state.blockCount);
  const BlockStyle = {
    maxWidth: constants.CONTAINER_WIDTH,
    height: constants.MAX_BLOCK_HEIGHT * constants.CONTAINER_HEIGHT_COEF
  };

  /**
   * @brief Callback to handle resize of window.
   */
  const handleResize = () => {
    setCurrentWidth(getBlockContainerWidth());
  }

  /**
   * @brief Find out how to color particular block.
   * 
   * @param {number} i Index of block to inspect.
   * @returns color for particular block.
   */
  const getColor = (i) => {
    if(state.swappedItems.includes(i)) {
      return constants.SWAP_ITEM_COLOR;
    } else if(state.sortedItems.includes(i)) {
      return constants.SORTED_ITEM_COLOR;
    } else if(state.activeItems.includes(i)) {
      return constants.ACTIVE_ITEM_COLOR;
    } else if(state.specialItems.includes(i)) {
      return constants.SPECIAL_ITEM_COLOR;
    } else {
      return constants.NORMAL_ITEM_COLOR;
    }
  }

  /**
   * @brief Find out parameters specific for particular block.
   * 
   * @param {object} item 
   * @param {number} index 
   * @returns object with parameters for particular block.
   */
  const getSpecificParameters = (item, index) => {
    return {
      color: getColor(index),
      height: item.value,
      order: item.index
    }
  }

  // assigns callback function to resize action
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {window.removeEventListener('resize', handleResize)};
  }, []);

  return (
    <div className={styles.container}>
      <div style={BlockStyle} className={styles.blockContainer}>
        {state.blockList.map((value, i) =>
          <Block key={i} params={sharedParameters} specifics={getSpecificParameters(value, i)} />
        )}
      </div>
    </div>
  );
}