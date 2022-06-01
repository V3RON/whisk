import path from 'node:path';
import fs from 'node:fs';

/**
 * Resolve import using Node Resolution algorithm
 */
export function resolve(requester: string, target: string): string {
  // TODO: Use real resolution algorithm
  const absoluteTarget = path.join(path.dirname(requester), target);
  const resolvedTarget = [absoluteTarget, absoluteTarget + '.js', absoluteTarget + '.json']
    .find(candidate => fs.existsSync(candidate));

  if (!resolvedTarget) {
    throw new Error(`Resource not found: ${target}, from: ${requester}`);
  }

  return resolvedTarget;
}
