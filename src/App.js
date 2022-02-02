import { useState, useEffect } from 'react';

import { ContextProvider, useMainContext } from './ContextProvider';
import Blocks from './Blocks';
import ControlMenu from './ControlMenu';

function Visializer() {
  const [ state, dispatch ] = useMainContext();
//  const [ algorithm, ] = useState(new BubbleSort());

  useEffect(() =>
    {
      const arr = state.blockList.filter(obj => obj.index < state.blockCount);

      for(let i = state.blockList.length; i < state.blockCount; i++) {
        arr.push({
          value: Math.floor(80 * Math.random() + 40),
          index: i
        });
      }

      console.log('fsdfs', arr)
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