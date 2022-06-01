import { loadResource } from './loaders';

export function build(source: string) {
  const entryResource = loadResource(source);
  console.log(entryResource);
}
