import styles from './styles/block.module.css';
import { useMainContext } from './ContextProvider';

const BLOCK_WIDTH = 50;
const GAP = 20;

function Block({ order, height, color }) {
  let offset = 'translate(' + ((GAP + BLOCK_WIDTH) * order) + 'px)';

  const blockStyle = {
        width: BLOCK_WIDTH + 'px',
        height: height + 'px',
        transform: offset,
        backgroundColor: color
    };

    return (
        <div style={blockStyle} className={styles.block}>{height}</div>
    );
}

export default function Blocks({ blockList }) {
  const [ state, ] = useMainContext();

  const getColor = (i) => {
    if(state.swappedItems.includes(i)) {
      return 'red';
    } else if(state.activeItems.includes(i)) {
      return 'green';
    } else if(state.specialItems.includes(i)) {
      return 'lightgreen';
    } else if(state.sortedItems.includes(i)) {
      return 'blue';
    } else {
      return 'black';
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.blockContainer}>
        {blockList.map((value, i) =>
          <Block key={i} order={value.index} height={value.value} color={getColor(i)} />
        )}
      </div>
    </div>
  );
}
