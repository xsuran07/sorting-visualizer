import { useState, useEffect } from 'react';

import { ContextProvider, useMainContext, generateBlock } from './ContextProvider';
import Blocks from './Blocks';
import ControlMenu from './ControlMenu';

import './styles/sharedStyles.css';

function Visializer() {
  const [ state, dispatch ] = useMainContext();
//  const [ algorithm, ] = useState(new BubbleSort());

  useEffect(() =>
    {
      const arr = state.blockList.filter(obj => obj.index < state.blockCount);

      for(let i = state.blockList.length; i < state.blockCount; i++) {
        arr.push({
          value: generateBlock(),
          index: i
        });
      }

      dispatch({type: 'setSortedItems', payload: []});
      dispatch({type: 'setBlockList', payload: arr});
    },
    [state.blockCount]
    );


  return (
      <div>
        <ControlMenu />
        <Blocks blockList={state.blockList} />
      </div>
  );
}

export default function App() {
  return (
    <ContextProvider>
          <Visializer />
    </ContextProvider>
  );
}