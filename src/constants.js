/**
 * @brief File with constants for all components.
 * 
 * @file constants.js
 * @author Jakub Šuráň
 */

// parameters related to number of blocks
export const MIN_BLOCKS = 10;
export const MAX_BLOCKS = 100;
export const INITIAL_BLOCK_COUNT = parseInt((MIN_BLOCKS + MAX_BLOCKS) / 2);

// parameters related to blocks proporsions
export const MIN_OFFSET = 2;
export const MAX_BLOCK_HEIGHT = 300;
export const MIN_BLOCK_HEIGHT = 45;
export const BLOCK_HEIGHT_RANGE = MAX_BLOCK_HEIGHT - MIN_BLOCK_HEIGHT;
export const CONTAINER_WIDTH = 800;
export const CONTAINER_HEIGHT_COEF = 1.2;

// aliases for possible colors of block
export const SWAP_ITEM_COLOR = 'red';
export const ACTIVE_ITEM_COLOR = 'yellow';
export const SPECIAL_ITEM_COLOR = 'lightgreen';
export const SORTED_ITEM_COLOR = 'blue';
export const NORMAL_ITEM_COLOR = 'black';

// parameters related to animation speec
export const MIN_SPEED = 100;
export const MAX_SPEED = 500;
export const SPEED_COEF = 100000;
export const INITIAL_SPEED = parseInt((MIN_SPEED + MAX_SPEED) / 2);
export const ANIMATION_SPEED_COEF = 0.8;
export const SIZE_COEF = 10;