import { useMainContext } from './ContextProvider';
import * as constants from './constants';
import SelectAlgo from './SelectAlgo';
import { StartButton, ShuffleButton } from './Buttons';

import styles from './styles/controlMenu.module.css';

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

function ChooseAlgo() {
  return (
    <ItemContainer>
      <label>Pick sorting algorithm:</label>
      <SelectAlgo />
    </ItemContainer>
  );
}

const ShuffleBlocks = () => {
  return (
    <ItemContainer>
      <label>Shuffle blocks:</label>
      <ShuffleButton />
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