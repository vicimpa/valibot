import type {
  NonOptionalSchema,
  ObjectOutput,
  ObjectSchema,
  ObjectShape,
} from '../../schemas/index.ts';
import { nonOptional, object } from '../../schemas/index.ts';
import { getDefaultArgs } from '../../utils/index.ts';

import type { BaseSchema, FString, Pipe } from '../../types.ts';
/**
 * Required object schema type.
 */
type Required<TObjectShape extends ObjectShape> = {
  [TKey in keyof TObjectShape]: NonOptionalSchema<TObjectShape[TKey]>;
};

/**
 * Creates an object schema consisting of all properties of an existing object
 * schema set to none optional.
 *
 * @param schema The affected schema.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An object schema.
 */
export function required<TObjectSchema extends ObjectSchema<any>>(
  schema: TObjectSchema,
  pipe?: Pipe<ObjectOutput<Required<TObjectSchema['object']>>>
): ObjectSchema<Required<TObjectSchema['object']>>;

/**
 * Creates an object schema consisting of all properties of an existing object
 * schema set to none optional.
 *
 * @param schema The affected schema.
 * @param error The error message.
 * @param pipe A validation and transformation pipe.
 *
 * @returns An object schema.
 */
export function required<TObjectSchema extends ObjectSchema<any>>(
  schema: TObjectSchema,
  error?: FString,
  pipe?: Pipe<ObjectOutput<Required<TObjectSchema['object']>>>
): ObjectSchema<Required<TObjectSchema['object']>>;

export function required<TObjectSchema extends ObjectSchema<any>>(
  schema: TObjectSchema,
  arg3?: Pipe<ObjectOutput<Required<TObjectSchema['object']>>> | FString,
  arg4?: Pipe<ObjectOutput<Required<TObjectSchema['object']>>>
): ObjectSchema<Required<TObjectSchema['object']>> {
  // Get error and pipe argument
  const [error, pipe] = getDefaultArgs(arg3, arg4);

  // Create and return object schema
  // @ts-ignore FIXME: Remove line once bug in TS is fixed
  return object(
    Object.entries(schema.object).reduce(
      (object, [key, schema]) => ({
        ...object,
        [key]: nonOptional(schema as BaseSchema),
      }),
      {}
    ) as Required<TObjectSchema['object']>,
    error,
    // @ts-ignore FIXME: Remove line once bug in TS is fixed
    pipe
  );
}
