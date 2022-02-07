/**
 * @brief Implementation of component representing menu
 * to control the application.
 * 
 * @file ControlMenu.js
 * @author Jakub Šuráň
 */

import { useMainContext } from './ContextProvider';
import * as constants from './constants';
import SelectAlgo from './SelectAlgo';
import { StartButton, ShuffleButton } from './Buttons';

import styles from './styles/controlMenu.module.css';

/**
 * @brief Component representing general container for items
 * in control menu.
 * 
 * @param {object} param0 Children of this component + flag to determine
 * if childs should be hidden during animations. 
 */
const ItemContainer = ({ children, hide = true }) => {
  const [ state, ] = useMainContext();

  const containerStyle = (hide && state.running)? {
    opacity: '0.1',
    pointerEvents: 'none'
  } : {};

  return (
    <div className={styles.itemContainer} style={containerStyle}>
      {children}
    </div>
  );
}

/**
 * @brief Component representing general slider. It could be parametrized
 * with configuration object.
 * 
 * @param {object} param0 Object with configuration for component.
 */
function GenericSlider({ config }) {
  return (
    <ItemContainer hide={config.disable}>
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

/**
 * @brief Wrapper for component representing algorithm select.
 */
function ChooseAlgo() {
  return (
    <ItemContainer>
      <label>Pick sorting algorithm:</label>
      <SelectAlgo />
    </ItemContainer>
  );
}

/**
 * @brief Wrapper for component represenint button which allow
 * shuffle of the blocks.
 */
const ShuffleBlocks = () => {
  return (
    <ItemContainer>
      <label>Shuffle blocks:</label>
      <ShuffleButton />
    </ItemContainer>
  );
}

/**
 * @brief Component representing control menu.
 */
export default function ControlMenu() {
  const [ state, dispatch ] = useMainContext();

  // parameters for slider to pick number of blocks
  const blockCountConfig = {
    label: 'Choose number of blocks:',
    min: constants.MIN_BLOCKS,
    max: constants.MAX_BLOCKS,
    value: state.blockCount,
    setValue: (arg) => dispatch({type: 'setBlockCount', payload: arg}),
    disable: true
  };

  // parameters for slidr to pick speed of animation
  const speedSlider = {
    label: 'Choose speed:',
    min: constants.MIN_SPEED,
    max: constants.MAX_SPEED,
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
              <ShuffleBlocks />
              <ChooseAlgo />
              <GenericSlider config={speedSlider} />
              <StartButton />
          </div>
        </div>
      </div>
  );
}