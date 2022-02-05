import { useMainContext } from './ContextProvider';
import * as constants from './constants';

import styles from './styles/block.module.css';

// helper functions

const getCurrentParameters = (count) => {
  const currentSize = constants.CONTAINER_WIDTH / count;
  const width = parseInt(0.8 * currentSize + (0.2 * currentSize / count));
  const gap = parseInt(0.2 * currentSize);

  const parameters = {
    width: width,
    gap: gap,
    margin: (constants.CONTAINER_WIDTH - (width * count + gap * (count - 1))) / 2
  };

  return parameters;
}

// REACT components

function Block({ params, specifics }) {

  let offset = 'translate(' + (params.margin + (params.width + params.gap) * specifics.order) + 'px)';

  const blockStyle = {
        width: params.width + 'px',
        height: specifics.height + 'px',
        transform: offset,
        backgroundColor: specifics.color,
        transition: 'transform 0.5s'
    };

    return (
        <div style={blockStyle} className={styles.block}></div>
    );
}

export default function Blocks({ blockList }) {
  const [ state, ] = useMainContext();
  const sharedParameters = getCurrentParameters(state.blockCount);
  const BlockStyle = {
    width: constants.CONTAINER_WIDTH,
  };

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