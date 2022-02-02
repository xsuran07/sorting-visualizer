import styles from './styles/block.module.css';
import { useMainContext } from './ContextProvider';

const BLOCK_WIDTH = 50;
const GAP = 20;

function Block({ order, height, active }) {
  let offset = 'translate(' + ((GAP + BLOCK_WIDTH) * order) + 'px)';

  const blockStyle = {
        width: BLOCK_WIDTH + 'px',
        height: height + 'px',
        transform: offset,
        backgroundColor: (active)? 'red' : 'black'
    };

    return (
        <div style={blockStyle} className={styles.block}>{height}</div>
    );
}

export default function Blocks({ blockList }) {
  const [ state, ] = useMainContext();
  console.log(blockList)
  return (
    <div className={styles.container}>
      <div className={styles.blockContainer}>
        {blockList.map((value, i) =>
          <Block key={i} order={value.index} height={value.value} active={state.current.includes(i)} />
        )}
      </div>
    </div>
  );
}
