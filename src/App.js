/**
 * @brief Base file of sorting visualizer application.
 * 
 * @file App.js
 * @author Jakub Šuráň
 */

import { useEffect } from 'react';

import { ContextProvider, useMainContext, generateBlock } from './ContextProvider';
import Blocks from './Blocks';
import ControlMenu from './ControlMenu';

import './styles/sharedStyles.css';

/**
 * @brief Component representing sorting visualizer.
 */
function SortingVisializer() {
  const [ state, dispatch ] = useMainContext();

  // handle change in number of blocks
  useEffect(() =>
    {
      const arr = state.blockList.filter(obj => obj.index < state.blockCount);

      // generate parameters for new blocks
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
        <Blocks />
      </div>
  );
}

export default function App() {
  return (
    <ContextProvider>
          <SortingVisializer />
    </ContextProvider>
  );
}