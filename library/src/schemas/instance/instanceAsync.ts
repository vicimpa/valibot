import {
  executePipeAsync,
  getDefaultArgs,
  getIssues,
} from '../../utils/index.ts';

import type { Class } from './instance.ts';

import type { BaseSchemaAsync, FString, PipeAsync } from '../../types.ts';
/**
 * Instance schema type.
 */
export type InstanceSchemaAsync<
  TClass extends Class,
  TOutput = InstanceType<TClass>
> = BaseSchemaAsync<InstanceType<TClass>, TOutput> & {
  schema: 'instance';
  class: TClass;
};

/**
 * Creates an async instance schema.
 *
 * @param of The class of the instance.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An async instance schema.
 */
export function instanceAsync<TClass extends Class>(
  of: TClass,
  pipe?: PipeAsync<InstanceType<TClass>>
): InstanceSchemaAsync<TClass>;

/**
 * Creates an async instance schema.
 *
 * @param of The class of the instance.
 * @param error The error message.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An async instance schema.
 */
export function instanceAsync<TClass extends Class>(
  of: TClass,
  error?: FString,
  pipe?: PipeAsync<InstanceType<TClass>>
): InstanceSchemaAsync<TClass>;

export function instanceAsync<TClass extends Class>(
  of: TClass,
  arg2?: PipeAsync<InstanceType<TClass>> | FString,
  arg3?: PipeAsync<InstanceType<TClass>>
): InstanceSchemaAsync<TClass> {
  // Get error and pipe argument
  const [error, pipe] = getDefaultArgs(arg2, arg3);

  // Create and return string schema
  return {
    /**
     * The schema type.
     */
    schema: 'instance',

    /**
     * The class of the instance.
     */
    class: of,

    /**
     * Whether it's async.
     */
    async: true,

    /**
     * Parses unknown input based on its schema.
     *
     * @param input The input to be parsed.
     * @param info The parse info.
     *
     * @returns The parsed output.
     */
    async _parse(input, info) {
      // Check type of input
      if (!(input instanceof of)) {
        return getIssues(
          info,
          'type',
          'instance',
          error || 'Invalid type',
          input
        );
      }

      // Execute pipe and return result
      return executePipeAsync(input, pipe, info, 'instance');
    },
  };
}
