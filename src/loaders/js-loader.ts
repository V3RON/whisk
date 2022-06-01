import fs from 'node:fs';
import { parseSync as getAST, ParseResult } from '@babel/core';
import { ImportDeclaration } from '@babel/types';

import {
  Loader,
  Resource,
} from '../types';
import { resolve } from '../resolver';
import { loadResource } from '.';

function getDependencies(source: string, ast: ParseResult): Resource[] {
  return ast.program.body
    .filter(node => node.type === 'ImportDeclaration')
    .map(node => (node as ImportDeclaration).source.value)
    .map(relativePath => resolve(source, relativePath))
    .map(resolvedPath => loadResource(resolvedPath));
}

const jsLoader: Loader = {
  rule: /\.js$/,
  transform(source: string) {
    const content = fs.readFileSync(source, { encoding: 'utf-8' });
    const ast = getAST(content)!; // TODO: Verify if it's null

    return {
      source,
      content,
      dependencies: getDependencies(source, ast),
    };
  },
};

export default jsLoader;
