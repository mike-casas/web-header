/* eslint-disable import/prefer-default-export */

export const isNode =
  typeof process !== 'undefined' &&
  typeof process.release !== 'undefined' &&
  process.release.name === 'node';
