import path from 'node:path';

import { default as jsLoader } from './js-loader';
import { Resource } from '../types';

const LOADERS = [
  jsLoader,
]

export function loadResource(source: string): Resource {
  const loader = LOADERS.find(loader => loader.rule.test(path.basename(source)));

  if (!loader) {
    throw new Error(`No loader found for: ${path.extname(source)}`);
  }

  return loader.transform(source);
}
