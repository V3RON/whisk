/**
 * Basic loader is responsible for transforming
 * input into JavaScript-compatible output
 */
export interface Loader {
  rule: RegExp;
  transform: (source: string) => Resource;
}

/**
 * Object describing single consumable resource
 * and its dependencies
 */
export interface Resource {
  source: string;
  content: string;
  dependencies: Resource[];
}
