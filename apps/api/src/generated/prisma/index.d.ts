
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model AIGeneration
 * 
 */
export type AIGeneration = $Result.DefaultSelection<Prisma.$AIGenerationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MessageRole: {
  system: 'system',
  user: 'user',
  assistant: 'assistant',
  tool: 'tool'
};

export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole]


export const AIGenerationStatus: {
  queued: 'queued',
  streaming: 'streaming',
  succeeded: 'succeeded',
  failed: 'failed',
  cancelled: 'cancelled'
};

export type AIGenerationStatus = (typeof AIGenerationStatus)[keyof typeof AIGenerationStatus]


export const UserKind: {
  anonymous: 'anonymous',
  registered: 'registered'
};

export type UserKind = (typeof UserKind)[keyof typeof UserKind]

}

export type MessageRole = $Enums.MessageRole

export const MessageRole: typeof $Enums.MessageRole

export type AIGenerationStatus = $Enums.AIGenerationStatus

export const AIGenerationStatus: typeof $Enums.AIGenerationStatus

export type UserKind = $Enums.UserKind

export const UserKind: typeof $Enums.UserKind

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIGeneration`: Exposes CRUD operations for the **AIGeneration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIGenerations
    * const aIGenerations = await prisma.aIGeneration.findMany()
    * ```
    */
  get aIGeneration(): Prisma.AIGenerationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Conversation: 'Conversation',
    Message: 'Message',
    AIGeneration: 'AIGeneration'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "conversation" | "message" | "aIGeneration"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      AIGeneration: {
        payload: Prisma.$AIGenerationPayload<ExtArgs>
        fields: Prisma.AIGenerationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIGenerationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIGenerationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          findFirst: {
            args: Prisma.AIGenerationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIGenerationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          findMany: {
            args: Prisma.AIGenerationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>[]
          }
          create: {
            args: Prisma.AIGenerationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          createMany: {
            args: Prisma.AIGenerationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIGenerationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>[]
          }
          delete: {
            args: Prisma.AIGenerationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          update: {
            args: Prisma.AIGenerationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          deleteMany: {
            args: Prisma.AIGenerationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIGenerationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIGenerationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>[]
          }
          upsert: {
            args: Prisma.AIGenerationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGenerationPayload>
          }
          aggregate: {
            args: Prisma.AIGenerationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIGeneration>
          }
          groupBy: {
            args: Prisma.AIGenerationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIGenerationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIGenerationCountArgs<ExtArgs>
            result: $Utils.Optional<AIGenerationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    aIGeneration?: AIGenerationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    conversations: number
    messages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
    AIGeneration: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
    AIGeneration?: boolean | ConversationCountOutputTypeCountAIGenerationArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountAIGenerationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIGenerationWhereInput
  }


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    asLastConversation: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asLastConversation?: boolean | MessageCountOutputTypeCountAsLastConversationArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountAsLastConversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    kind: $Enums.UserKind | null
    email: string | null
    displayName: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSeenAt: Date | null
    deletedAt: Date | null
    authSubject: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    kind: $Enums.UserKind | null
    email: string | null
    displayName: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSeenAt: Date | null
    deletedAt: Date | null
    authSubject: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    kind: number
    email: number
    displayName: number
    createdAt: number
    updatedAt: number
    lastSeenAt: number
    deletedAt: number
    authSubject: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    kind?: true
    email?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
    lastSeenAt?: true
    deletedAt?: true
    authSubject?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    kind?: true
    email?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
    lastSeenAt?: true
    deletedAt?: true
    authSubject?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    kind?: true
    email?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
    lastSeenAt?: true
    deletedAt?: true
    authSubject?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    kind: $Enums.UserKind
    email: string | null
    displayName: string | null
    createdAt: Date
    updatedAt: Date
    lastSeenAt: Date | null
    deletedAt: Date | null
    authSubject: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    email?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSeenAt?: boolean
    deletedAt?: boolean
    authSubject?: boolean
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    email?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSeenAt?: boolean
    deletedAt?: boolean
    authSubject?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    email?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSeenAt?: boolean
    deletedAt?: boolean
    authSubject?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    kind?: boolean
    email?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSeenAt?: boolean
    deletedAt?: boolean
    authSubject?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "kind" | "email" | "displayName" | "createdAt" | "updatedAt" | "lastSeenAt" | "deletedAt" | "authSubject", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kind: $Enums.UserKind
      email: string | null
      displayName: string | null
      createdAt: Date
      updatedAt: Date
      lastSeenAt: Date | null
      deletedAt: Date | null
      authSubject: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly kind: FieldRef<"User", 'UserKind'>
    readonly email: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastSeenAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly authSubject: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _avg: ConversationAvgAggregateOutputType | null
    _sum: ConversationSumAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationAvgAggregateOutputType = {
    messageCount: number | null
  }

  export type ConversationSumAggregateOutputType = {
    messageCount: number | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    titleSetByUser: boolean | null
    messageCount: number | null
    lastMessageAt: Date | null
    lastMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    titleSetByUser: boolean | null
    messageCount: number | null
    lastMessageAt: Date | null
    lastMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    titleSetByUser: number
    messageCount: number
    lastMessageAt: number
    lastMessageId: number
    aiSettings: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ConversationAvgAggregateInputType = {
    messageCount?: true
  }

  export type ConversationSumAggregateInputType = {
    messageCount?: true
  }

  export type ConversationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    titleSetByUser?: true
    messageCount?: true
    lastMessageAt?: true
    lastMessageId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    titleSetByUser?: true
    messageCount?: true
    lastMessageAt?: true
    lastMessageId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    titleSetByUser?: true
    messageCount?: true
    lastMessageAt?: true
    lastMessageId?: true
    aiSettings?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConversationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConversationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _avg?: ConversationAvgAggregateInputType
    _sum?: ConversationSumAggregateInputType
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    userId: string
    title: string | null
    titleSetByUser: boolean
    messageCount: number
    lastMessageAt: Date | null
    lastMessageId: string | null
    aiSettings: JsonValue
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: ConversationCountAggregateOutputType | null
    _avg: ConversationAvgAggregateOutputType | null
    _sum: ConversationSumAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    titleSetByUser?: boolean
    messageCount?: boolean
    lastMessageAt?: boolean
    lastMessageId?: boolean
    aiSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
    AIGeneration?: boolean | Conversation$AIGenerationArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    titleSetByUser?: boolean
    messageCount?: boolean
    lastMessageAt?: boolean
    lastMessageId?: boolean
    aiSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    titleSetByUser?: boolean
    messageCount?: boolean
    lastMessageAt?: boolean
    lastMessageId?: boolean
    aiSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    titleSetByUser?: boolean
    messageCount?: boolean
    lastMessageAt?: boolean
    lastMessageId?: boolean
    aiSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "titleSetByUser" | "messageCount" | "lastMessageAt" | "lastMessageId" | "aiSettings" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
    AIGeneration?: boolean | Conversation$AIGenerationArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
      lastMessage: Prisma.$MessagePayload<ExtArgs> | null
      AIGeneration: Prisma.$AIGenerationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string | null
      titleSetByUser: boolean
      messageCount: number
      lastMessageAt: Date | null
      lastMessageId: string | null
      aiSettings: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lastMessage<T extends Conversation$lastMessageArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$lastMessageArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    AIGeneration<T extends Conversation$AIGenerationArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$AIGenerationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly userId: FieldRef<"Conversation", 'String'>
    readonly title: FieldRef<"Conversation", 'String'>
    readonly titleSetByUser: FieldRef<"Conversation", 'Boolean'>
    readonly messageCount: FieldRef<"Conversation", 'Int'>
    readonly lastMessageAt: FieldRef<"Conversation", 'DateTime'>
    readonly lastMessageId: FieldRef<"Conversation", 'String'>
    readonly aiSettings: FieldRef<"Conversation", 'Json'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
    readonly deletedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation.lastMessage
   */
  export type Conversation$lastMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
  }

  /**
   * Conversation.AIGeneration
   */
  export type Conversation$AIGenerationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    where?: AIGenerationWhereInput
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    cursor?: AIGenerationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIGenerationScalarFieldEnum | AIGenerationScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    authorUserId: string | null
    role: $Enums.MessageRole | null
    contentText: string | null
    clientMessageId: string | null
    editedAt: Date | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    authorUserId: string | null
    role: $Enums.MessageRole | null
    contentText: string | null
    clientMessageId: string | null
    editedAt: Date | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    authorUserId: number
    role: number
    contentText: number
    contentJson: number
    clientMessageId: number
    editedAt: number
    createdAt: number
    deletedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    authorUserId?: true
    role?: true
    contentText?: true
    clientMessageId?: true
    editedAt?: true
    createdAt?: true
    deletedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    authorUserId?: true
    role?: true
    contentText?: true
    clientMessageId?: true
    editedAt?: true
    createdAt?: true
    deletedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    authorUserId?: true
    role?: true
    contentText?: true
    contentJson?: true
    clientMessageId?: true
    editedAt?: true
    createdAt?: true
    deletedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    authorUserId: string | null
    role: $Enums.MessageRole
    contentText: string | null
    contentJson: JsonValue | null
    clientMessageId: string | null
    editedAt: Date | null
    createdAt: Date
    deletedAt: Date | null
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    authorUserId?: boolean
    role?: boolean
    contentText?: boolean
    contentJson?: boolean
    clientMessageId?: boolean
    editedAt?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    author?: boolean | Message$authorArgs<ExtArgs>
    aiGeneration?: boolean | Message$aiGenerationArgs<ExtArgs>
    asLastConversation?: boolean | Message$asLastConversationArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    authorUserId?: boolean
    role?: boolean
    contentText?: boolean
    contentJson?: boolean
    clientMessageId?: boolean
    editedAt?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    author?: boolean | Message$authorArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    authorUserId?: boolean
    role?: boolean
    contentText?: boolean
    contentJson?: boolean
    clientMessageId?: boolean
    editedAt?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    author?: boolean | Message$authorArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    authorUserId?: boolean
    role?: boolean
    contentText?: boolean
    contentJson?: boolean
    clientMessageId?: boolean
    editedAt?: boolean
    createdAt?: boolean
    deletedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "authorUserId" | "role" | "contentText" | "contentJson" | "clientMessageId" | "editedAt" | "createdAt" | "deletedAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    author?: boolean | Message$authorArgs<ExtArgs>
    aiGeneration?: boolean | Message$aiGenerationArgs<ExtArgs>
    asLastConversation?: boolean | Message$asLastConversationArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    author?: boolean | Message$authorArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    author?: boolean | Message$authorArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs> | null
      aiGeneration: Prisma.$AIGenerationPayload<ExtArgs> | null
      asLastConversation: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      authorUserId: string | null
      role: $Enums.MessageRole
      contentText: string | null
      contentJson: Prisma.JsonValue | null
      clientMessageId: string | null
      editedAt: Date | null
      createdAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends Message$authorArgs<ExtArgs> = {}>(args?: Subset<T, Message$authorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    aiGeneration<T extends Message$aiGenerationArgs<ExtArgs> = {}>(args?: Subset<T, Message$aiGenerationArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    asLastConversation<T extends Message$asLastConversationArgs<ExtArgs> = {}>(args?: Subset<T, Message$asLastConversationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly authorUserId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'MessageRole'>
    readonly contentText: FieldRef<"Message", 'String'>
    readonly contentJson: FieldRef<"Message", 'Json'>
    readonly clientMessageId: FieldRef<"Message", 'String'>
    readonly editedAt: FieldRef<"Message", 'DateTime'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly deletedAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.author
   */
  export type Message$authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Message.aiGeneration
   */
  export type Message$aiGenerationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    where?: AIGenerationWhereInput
  }

  /**
   * Message.asLastConversation
   */
  export type Message$asLastConversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model AIGeneration
   */

  export type AggregateAIGeneration = {
    _count: AIGenerationCountAggregateOutputType | null
    _avg: AIGenerationAvgAggregateOutputType | null
    _sum: AIGenerationSumAggregateOutputType | null
    _min: AIGenerationMinAggregateOutputType | null
    _max: AIGenerationMaxAggregateOutputType | null
  }

  export type AIGenerationAvgAggregateOutputType = {
    temperature: Decimal | null
    topP: Decimal | null
    maxOutputTokens: number | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cachedInputTokens: number | null
    latencyMs: number | null
    ttftMs: number | null
  }

  export type AIGenerationSumAggregateOutputType = {
    temperature: Decimal | null
    topP: Decimal | null
    maxOutputTokens: number | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cachedInputTokens: number | null
    latencyMs: number | null
    ttftMs: number | null
  }

  export type AIGenerationMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    assistantMessageId: string | null
    status: $Enums.AIGenerationStatus | null
    provider: string | null
    model: string | null
    temperature: Decimal | null
    topP: Decimal | null
    maxOutputTokens: number | null
    systemPrompt: string | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cachedInputTokens: number | null
    latencyMs: number | null
    ttftMs: number | null
    providerRequestId: string | null
    providerResponseId: string | null
    errorType: string | null
    errorDetail: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type AIGenerationMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    assistantMessageId: string | null
    status: $Enums.AIGenerationStatus | null
    provider: string | null
    model: string | null
    temperature: Decimal | null
    topP: Decimal | null
    maxOutputTokens: number | null
    systemPrompt: string | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cachedInputTokens: number | null
    latencyMs: number | null
    ttftMs: number | null
    providerRequestId: string | null
    providerResponseId: string | null
    errorType: string | null
    errorDetail: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type AIGenerationCountAggregateOutputType = {
    id: number
    conversationId: number
    assistantMessageId: number
    status: number
    provider: number
    model: number
    temperature: number
    topP: number
    maxOutputTokens: number
    contextMessageIds: number
    systemPrompt: number
    inputTokens: number
    outputTokens: number
    totalTokens: number
    cachedInputTokens: number
    latencyMs: number
    ttftMs: number
    providerRequestId: number
    providerResponseId: number
    requestJson: number
    responseJson: number
    errorType: number
    errorDetail: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type AIGenerationAvgAggregateInputType = {
    temperature?: true
    topP?: true
    maxOutputTokens?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cachedInputTokens?: true
    latencyMs?: true
    ttftMs?: true
  }

  export type AIGenerationSumAggregateInputType = {
    temperature?: true
    topP?: true
    maxOutputTokens?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cachedInputTokens?: true
    latencyMs?: true
    ttftMs?: true
  }

  export type AIGenerationMinAggregateInputType = {
    id?: true
    conversationId?: true
    assistantMessageId?: true
    status?: true
    provider?: true
    model?: true
    temperature?: true
    topP?: true
    maxOutputTokens?: true
    systemPrompt?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cachedInputTokens?: true
    latencyMs?: true
    ttftMs?: true
    providerRequestId?: true
    providerResponseId?: true
    errorType?: true
    errorDetail?: true
    createdAt?: true
    completedAt?: true
  }

  export type AIGenerationMaxAggregateInputType = {
    id?: true
    conversationId?: true
    assistantMessageId?: true
    status?: true
    provider?: true
    model?: true
    temperature?: true
    topP?: true
    maxOutputTokens?: true
    systemPrompt?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cachedInputTokens?: true
    latencyMs?: true
    ttftMs?: true
    providerRequestId?: true
    providerResponseId?: true
    errorType?: true
    errorDetail?: true
    createdAt?: true
    completedAt?: true
  }

  export type AIGenerationCountAggregateInputType = {
    id?: true
    conversationId?: true
    assistantMessageId?: true
    status?: true
    provider?: true
    model?: true
    temperature?: true
    topP?: true
    maxOutputTokens?: true
    contextMessageIds?: true
    systemPrompt?: true
    inputTokens?: true
    outputTokens?: true
    totalTokens?: true
    cachedInputTokens?: true
    latencyMs?: true
    ttftMs?: true
    providerRequestId?: true
    providerResponseId?: true
    requestJson?: true
    responseJson?: true
    errorType?: true
    errorDetail?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type AIGenerationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIGeneration to aggregate.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIGenerations
    **/
    _count?: true | AIGenerationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIGenerationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIGenerationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIGenerationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIGenerationMaxAggregateInputType
  }

  export type GetAIGenerationAggregateType<T extends AIGenerationAggregateArgs> = {
        [P in keyof T & keyof AggregateAIGeneration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIGeneration[P]>
      : GetScalarType<T[P], AggregateAIGeneration[P]>
  }




  export type AIGenerationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIGenerationWhereInput
    orderBy?: AIGenerationOrderByWithAggregationInput | AIGenerationOrderByWithAggregationInput[]
    by: AIGenerationScalarFieldEnum[] | AIGenerationScalarFieldEnum
    having?: AIGenerationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIGenerationCountAggregateInputType | true
    _avg?: AIGenerationAvgAggregateInputType
    _sum?: AIGenerationSumAggregateInputType
    _min?: AIGenerationMinAggregateInputType
    _max?: AIGenerationMaxAggregateInputType
  }

  export type AIGenerationGroupByOutputType = {
    id: string
    conversationId: string
    assistantMessageId: string
    status: $Enums.AIGenerationStatus
    provider: string
    model: string
    temperature: Decimal | null
    topP: Decimal | null
    maxOutputTokens: number | null
    contextMessageIds: string[]
    systemPrompt: string | null
    inputTokens: number | null
    outputTokens: number | null
    totalTokens: number | null
    cachedInputTokens: number | null
    latencyMs: number | null
    ttftMs: number | null
    providerRequestId: string | null
    providerResponseId: string | null
    requestJson: JsonValue | null
    responseJson: JsonValue | null
    errorType: string | null
    errorDetail: string | null
    createdAt: Date
    completedAt: Date | null
    _count: AIGenerationCountAggregateOutputType | null
    _avg: AIGenerationAvgAggregateOutputType | null
    _sum: AIGenerationSumAggregateOutputType | null
    _min: AIGenerationMinAggregateOutputType | null
    _max: AIGenerationMaxAggregateOutputType | null
  }

  type GetAIGenerationGroupByPayload<T extends AIGenerationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIGenerationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIGenerationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIGenerationGroupByOutputType[P]>
            : GetScalarType<T[P], AIGenerationGroupByOutputType[P]>
        }
      >
    >


  export type AIGenerationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    assistantMessageId?: boolean
    status?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    topP?: boolean
    maxOutputTokens?: boolean
    contextMessageIds?: boolean
    systemPrompt?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cachedInputTokens?: boolean
    latencyMs?: boolean
    ttftMs?: boolean
    providerRequestId?: boolean
    providerResponseId?: boolean
    requestJson?: boolean
    responseJson?: boolean
    errorType?: boolean
    errorDetail?: boolean
    createdAt?: boolean
    completedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    assistantMessage?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIGeneration"]>

  export type AIGenerationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    assistantMessageId?: boolean
    status?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    topP?: boolean
    maxOutputTokens?: boolean
    contextMessageIds?: boolean
    systemPrompt?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cachedInputTokens?: boolean
    latencyMs?: boolean
    ttftMs?: boolean
    providerRequestId?: boolean
    providerResponseId?: boolean
    requestJson?: boolean
    responseJson?: boolean
    errorType?: boolean
    errorDetail?: boolean
    createdAt?: boolean
    completedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    assistantMessage?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIGeneration"]>

  export type AIGenerationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    assistantMessageId?: boolean
    status?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    topP?: boolean
    maxOutputTokens?: boolean
    contextMessageIds?: boolean
    systemPrompt?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cachedInputTokens?: boolean
    latencyMs?: boolean
    ttftMs?: boolean
    providerRequestId?: boolean
    providerResponseId?: boolean
    requestJson?: boolean
    responseJson?: boolean
    errorType?: boolean
    errorDetail?: boolean
    createdAt?: boolean
    completedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    assistantMessage?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIGeneration"]>

  export type AIGenerationSelectScalar = {
    id?: boolean
    conversationId?: boolean
    assistantMessageId?: boolean
    status?: boolean
    provider?: boolean
    model?: boolean
    temperature?: boolean
    topP?: boolean
    maxOutputTokens?: boolean
    contextMessageIds?: boolean
    systemPrompt?: boolean
    inputTokens?: boolean
    outputTokens?: boolean
    totalTokens?: boolean
    cachedInputTokens?: boolean
    latencyMs?: boolean
    ttftMs?: boolean
    providerRequestId?: boolean
    providerResponseId?: boolean
    requestJson?: boolean
    responseJson?: boolean
    errorType?: boolean
    errorDetail?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type AIGenerationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "assistantMessageId" | "status" | "provider" | "model" | "temperature" | "topP" | "maxOutputTokens" | "contextMessageIds" | "systemPrompt" | "inputTokens" | "outputTokens" | "totalTokens" | "cachedInputTokens" | "latencyMs" | "ttftMs" | "providerRequestId" | "providerResponseId" | "requestJson" | "responseJson" | "errorType" | "errorDetail" | "createdAt" | "completedAt", ExtArgs["result"]["aIGeneration"]>
  export type AIGenerationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    assistantMessage?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type AIGenerationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    assistantMessage?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type AIGenerationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    assistantMessage?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $AIGenerationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIGeneration"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      assistantMessage: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      assistantMessageId: string
      status: $Enums.AIGenerationStatus
      provider: string
      model: string
      temperature: Prisma.Decimal | null
      topP: Prisma.Decimal | null
      maxOutputTokens: number | null
      contextMessageIds: string[]
      systemPrompt: string | null
      inputTokens: number | null
      outputTokens: number | null
      totalTokens: number | null
      cachedInputTokens: number | null
      latencyMs: number | null
      ttftMs: number | null
      providerRequestId: string | null
      providerResponseId: string | null
      requestJson: Prisma.JsonValue | null
      responseJson: Prisma.JsonValue | null
      errorType: string | null
      errorDetail: string | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["aIGeneration"]>
    composites: {}
  }

  type AIGenerationGetPayload<S extends boolean | null | undefined | AIGenerationDefaultArgs> = $Result.GetResult<Prisma.$AIGenerationPayload, S>

  type AIGenerationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIGenerationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIGenerationCountAggregateInputType | true
    }

  export interface AIGenerationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIGeneration'], meta: { name: 'AIGeneration' } }
    /**
     * Find zero or one AIGeneration that matches the filter.
     * @param {AIGenerationFindUniqueArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIGenerationFindUniqueArgs>(args: SelectSubset<T, AIGenerationFindUniqueArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIGeneration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIGenerationFindUniqueOrThrowArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIGenerationFindUniqueOrThrowArgs>(args: SelectSubset<T, AIGenerationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIGeneration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationFindFirstArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIGenerationFindFirstArgs>(args?: SelectSubset<T, AIGenerationFindFirstArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIGeneration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationFindFirstOrThrowArgs} args - Arguments to find a AIGeneration
     * @example
     * // Get one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIGenerationFindFirstOrThrowArgs>(args?: SelectSubset<T, AIGenerationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIGenerations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIGenerations
     * const aIGenerations = await prisma.aIGeneration.findMany()
     * 
     * // Get first 10 AIGenerations
     * const aIGenerations = await prisma.aIGeneration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIGenerationWithIdOnly = await prisma.aIGeneration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIGenerationFindManyArgs>(args?: SelectSubset<T, AIGenerationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIGeneration.
     * @param {AIGenerationCreateArgs} args - Arguments to create a AIGeneration.
     * @example
     * // Create one AIGeneration
     * const AIGeneration = await prisma.aIGeneration.create({
     *   data: {
     *     // ... data to create a AIGeneration
     *   }
     * })
     * 
     */
    create<T extends AIGenerationCreateArgs>(args: SelectSubset<T, AIGenerationCreateArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIGenerations.
     * @param {AIGenerationCreateManyArgs} args - Arguments to create many AIGenerations.
     * @example
     * // Create many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIGenerationCreateManyArgs>(args?: SelectSubset<T, AIGenerationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIGenerations and returns the data saved in the database.
     * @param {AIGenerationCreateManyAndReturnArgs} args - Arguments to create many AIGenerations.
     * @example
     * // Create many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIGenerations and only return the `id`
     * const aIGenerationWithIdOnly = await prisma.aIGeneration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIGenerationCreateManyAndReturnArgs>(args?: SelectSubset<T, AIGenerationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIGeneration.
     * @param {AIGenerationDeleteArgs} args - Arguments to delete one AIGeneration.
     * @example
     * // Delete one AIGeneration
     * const AIGeneration = await prisma.aIGeneration.delete({
     *   where: {
     *     // ... filter to delete one AIGeneration
     *   }
     * })
     * 
     */
    delete<T extends AIGenerationDeleteArgs>(args: SelectSubset<T, AIGenerationDeleteArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIGeneration.
     * @param {AIGenerationUpdateArgs} args - Arguments to update one AIGeneration.
     * @example
     * // Update one AIGeneration
     * const aIGeneration = await prisma.aIGeneration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIGenerationUpdateArgs>(args: SelectSubset<T, AIGenerationUpdateArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIGenerations.
     * @param {AIGenerationDeleteManyArgs} args - Arguments to filter AIGenerations to delete.
     * @example
     * // Delete a few AIGenerations
     * const { count } = await prisma.aIGeneration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIGenerationDeleteManyArgs>(args?: SelectSubset<T, AIGenerationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIGenerationUpdateManyArgs>(args: SelectSubset<T, AIGenerationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIGenerations and returns the data updated in the database.
     * @param {AIGenerationUpdateManyAndReturnArgs} args - Arguments to update many AIGenerations.
     * @example
     * // Update many AIGenerations
     * const aIGeneration = await prisma.aIGeneration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIGenerations and only return the `id`
     * const aIGenerationWithIdOnly = await prisma.aIGeneration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIGenerationUpdateManyAndReturnArgs>(args: SelectSubset<T, AIGenerationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIGeneration.
     * @param {AIGenerationUpsertArgs} args - Arguments to update or create a AIGeneration.
     * @example
     * // Update or create a AIGeneration
     * const aIGeneration = await prisma.aIGeneration.upsert({
     *   create: {
     *     // ... data to create a AIGeneration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIGeneration we want to update
     *   }
     * })
     */
    upsert<T extends AIGenerationUpsertArgs>(args: SelectSubset<T, AIGenerationUpsertArgs<ExtArgs>>): Prisma__AIGenerationClient<$Result.GetResult<Prisma.$AIGenerationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationCountArgs} args - Arguments to filter AIGenerations to count.
     * @example
     * // Count the number of AIGenerations
     * const count = await prisma.aIGeneration.count({
     *   where: {
     *     // ... the filter for the AIGenerations we want to count
     *   }
     * })
    **/
    count<T extends AIGenerationCountArgs>(
      args?: Subset<T, AIGenerationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIGenerationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIGenerationAggregateArgs>(args: Subset<T, AIGenerationAggregateArgs>): Prisma.PrismaPromise<GetAIGenerationAggregateType<T>>

    /**
     * Group by AIGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGenerationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIGenerationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIGenerationGroupByArgs['orderBy'] }
        : { orderBy?: AIGenerationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIGenerationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIGenerationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIGeneration model
   */
  readonly fields: AIGenerationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIGeneration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIGenerationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assistantMessage<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIGeneration model
   */
  interface AIGenerationFieldRefs {
    readonly id: FieldRef<"AIGeneration", 'String'>
    readonly conversationId: FieldRef<"AIGeneration", 'String'>
    readonly assistantMessageId: FieldRef<"AIGeneration", 'String'>
    readonly status: FieldRef<"AIGeneration", 'AIGenerationStatus'>
    readonly provider: FieldRef<"AIGeneration", 'String'>
    readonly model: FieldRef<"AIGeneration", 'String'>
    readonly temperature: FieldRef<"AIGeneration", 'Decimal'>
    readonly topP: FieldRef<"AIGeneration", 'Decimal'>
    readonly maxOutputTokens: FieldRef<"AIGeneration", 'Int'>
    readonly contextMessageIds: FieldRef<"AIGeneration", 'String[]'>
    readonly systemPrompt: FieldRef<"AIGeneration", 'String'>
    readonly inputTokens: FieldRef<"AIGeneration", 'Int'>
    readonly outputTokens: FieldRef<"AIGeneration", 'Int'>
    readonly totalTokens: FieldRef<"AIGeneration", 'Int'>
    readonly cachedInputTokens: FieldRef<"AIGeneration", 'Int'>
    readonly latencyMs: FieldRef<"AIGeneration", 'Int'>
    readonly ttftMs: FieldRef<"AIGeneration", 'Int'>
    readonly providerRequestId: FieldRef<"AIGeneration", 'String'>
    readonly providerResponseId: FieldRef<"AIGeneration", 'String'>
    readonly requestJson: FieldRef<"AIGeneration", 'Json'>
    readonly responseJson: FieldRef<"AIGeneration", 'Json'>
    readonly errorType: FieldRef<"AIGeneration", 'String'>
    readonly errorDetail: FieldRef<"AIGeneration", 'String'>
    readonly createdAt: FieldRef<"AIGeneration", 'DateTime'>
    readonly completedAt: FieldRef<"AIGeneration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIGeneration findUnique
   */
  export type AIGenerationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration findUniqueOrThrow
   */
  export type AIGenerationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration findFirst
   */
  export type AIGenerationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIGenerations.
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIGenerations.
     */
    distinct?: AIGenerationScalarFieldEnum | AIGenerationScalarFieldEnum[]
  }

  /**
   * AIGeneration findFirstOrThrow
   */
  export type AIGenerationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * Filter, which AIGeneration to fetch.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIGenerations.
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIGenerations.
     */
    distinct?: AIGenerationScalarFieldEnum | AIGenerationScalarFieldEnum[]
  }

  /**
   * AIGeneration findMany
   */
  export type AIGenerationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * Filter, which AIGenerations to fetch.
     */
    where?: AIGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGenerations to fetch.
     */
    orderBy?: AIGenerationOrderByWithRelationInput | AIGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIGenerations.
     */
    cursor?: AIGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGenerations.
     */
    skip?: number
    distinct?: AIGenerationScalarFieldEnum | AIGenerationScalarFieldEnum[]
  }

  /**
   * AIGeneration create
   */
  export type AIGenerationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * The data needed to create a AIGeneration.
     */
    data: XOR<AIGenerationCreateInput, AIGenerationUncheckedCreateInput>
  }

  /**
   * AIGeneration createMany
   */
  export type AIGenerationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIGenerations.
     */
    data: AIGenerationCreateManyInput | AIGenerationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIGeneration createManyAndReturn
   */
  export type AIGenerationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * The data used to create many AIGenerations.
     */
    data: AIGenerationCreateManyInput | AIGenerationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIGeneration update
   */
  export type AIGenerationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * The data needed to update a AIGeneration.
     */
    data: XOR<AIGenerationUpdateInput, AIGenerationUncheckedUpdateInput>
    /**
     * Choose, which AIGeneration to update.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration updateMany
   */
  export type AIGenerationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIGenerations.
     */
    data: XOR<AIGenerationUpdateManyMutationInput, AIGenerationUncheckedUpdateManyInput>
    /**
     * Filter which AIGenerations to update
     */
    where?: AIGenerationWhereInput
    /**
     * Limit how many AIGenerations to update.
     */
    limit?: number
  }

  /**
   * AIGeneration updateManyAndReturn
   */
  export type AIGenerationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * The data used to update AIGenerations.
     */
    data: XOR<AIGenerationUpdateManyMutationInput, AIGenerationUncheckedUpdateManyInput>
    /**
     * Filter which AIGenerations to update
     */
    where?: AIGenerationWhereInput
    /**
     * Limit how many AIGenerations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIGeneration upsert
   */
  export type AIGenerationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * The filter to search for the AIGeneration to update in case it exists.
     */
    where: AIGenerationWhereUniqueInput
    /**
     * In case the AIGeneration found by the `where` argument doesn't exist, create a new AIGeneration with this data.
     */
    create: XOR<AIGenerationCreateInput, AIGenerationUncheckedCreateInput>
    /**
     * In case the AIGeneration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIGenerationUpdateInput, AIGenerationUncheckedUpdateInput>
  }

  /**
   * AIGeneration delete
   */
  export type AIGenerationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
    /**
     * Filter which AIGeneration to delete.
     */
    where: AIGenerationWhereUniqueInput
  }

  /**
   * AIGeneration deleteMany
   */
  export type AIGenerationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIGenerations to delete
     */
    where?: AIGenerationWhereInput
    /**
     * Limit how many AIGenerations to delete.
     */
    limit?: number
  }

  /**
   * AIGeneration without action
   */
  export type AIGenerationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGeneration
     */
    select?: AIGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGeneration
     */
    omit?: AIGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGenerationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    kind: 'kind',
    email: 'email',
    displayName: 'displayName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastSeenAt: 'lastSeenAt',
    deletedAt: 'deletedAt',
    authSubject: 'authSubject'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    titleSetByUser: 'titleSetByUser',
    messageCount: 'messageCount',
    lastMessageAt: 'lastMessageAt',
    lastMessageId: 'lastMessageId',
    aiSettings: 'aiSettings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    authorUserId: 'authorUserId',
    role: 'role',
    contentText: 'contentText',
    contentJson: 'contentJson',
    clientMessageId: 'clientMessageId',
    editedAt: 'editedAt',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const AIGenerationScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    assistantMessageId: 'assistantMessageId',
    status: 'status',
    provider: 'provider',
    model: 'model',
    temperature: 'temperature',
    topP: 'topP',
    maxOutputTokens: 'maxOutputTokens',
    contextMessageIds: 'contextMessageIds',
    systemPrompt: 'systemPrompt',
    inputTokens: 'inputTokens',
    outputTokens: 'outputTokens',
    totalTokens: 'totalTokens',
    cachedInputTokens: 'cachedInputTokens',
    latencyMs: 'latencyMs',
    ttftMs: 'ttftMs',
    providerRequestId: 'providerRequestId',
    providerResponseId: 'providerResponseId',
    requestJson: 'requestJson',
    responseJson: 'responseJson',
    errorType: 'errorType',
    errorDetail: 'errorDetail',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type AIGenerationScalarFieldEnum = (typeof AIGenerationScalarFieldEnum)[keyof typeof AIGenerationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserKind'
   */
  export type EnumUserKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserKind'>
    


  /**
   * Reference to a field of type 'UserKind[]'
   */
  export type ListEnumUserKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserKind[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'MessageRole'
   */
  export type EnumMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageRole'>
    


  /**
   * Reference to a field of type 'MessageRole[]'
   */
  export type ListEnumMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageRole[]'>
    


  /**
   * Reference to a field of type 'AIGenerationStatus'
   */
  export type EnumAIGenerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIGenerationStatus'>
    


  /**
   * Reference to a field of type 'AIGenerationStatus[]'
   */
  export type ListEnumAIGenerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIGenerationStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    kind?: EnumUserKindFilter<"User"> | $Enums.UserKind
    email?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    authSubject?: StringNullableFilter<"User"> | string | null
    conversations?: ConversationListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    kind?: SortOrder
    email?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    authSubject?: SortOrderInput | SortOrder
    conversations?: ConversationOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    kind?: EnumUserKindFilter<"User"> | $Enums.UserKind
    displayName?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    authSubject?: StringNullableFilter<"User"> | string | null
    conversations?: ConversationListRelationFilter
    messages?: MessageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    kind?: SortOrder
    email?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    authSubject?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    kind?: EnumUserKindWithAggregatesFilter<"User"> | $Enums.UserKind
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    authSubject?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: UuidFilter<"Conversation"> | string
    userId?: UuidFilter<"Conversation"> | string
    title?: StringNullableFilter<"Conversation"> | string | null
    titleSetByUser?: BoolFilter<"Conversation"> | boolean
    messageCount?: IntFilter<"Conversation"> | number
    lastMessageAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    lastMessageId?: UuidNullableFilter<"Conversation"> | string | null
    aiSettings?: JsonFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    lastMessage?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
    AIGeneration?: AIGenerationListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    titleSetByUser?: SortOrder
    messageCount?: SortOrder
    lastMessageAt?: SortOrderInput | SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    aiSettings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    lastMessage?: MessageOrderByWithRelationInput
    AIGeneration?: AIGenerationOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    userId?: UuidFilter<"Conversation"> | string
    title?: StringNullableFilter<"Conversation"> | string | null
    titleSetByUser?: BoolFilter<"Conversation"> | boolean
    messageCount?: IntFilter<"Conversation"> | number
    lastMessageAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    lastMessageId?: UuidNullableFilter<"Conversation"> | string | null
    aiSettings?: JsonFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    lastMessage?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
    AIGeneration?: AIGenerationListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    titleSetByUser?: SortOrder
    messageCount?: SortOrder
    lastMessageAt?: SortOrderInput | SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    aiSettings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _avg?: ConversationAvgOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
    _sum?: ConversationSumOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Conversation"> | string
    userId?: UuidWithAggregatesFilter<"Conversation"> | string
    title?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    titleSetByUser?: BoolWithAggregatesFilter<"Conversation"> | boolean
    messageCount?: IntWithAggregatesFilter<"Conversation"> | number
    lastMessageAt?: DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null
    lastMessageId?: UuidNullableWithAggregatesFilter<"Conversation"> | string | null
    aiSettings?: JsonWithAggregatesFilter<"Conversation">
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: UuidFilter<"Message"> | string
    conversationId?: UuidFilter<"Message"> | string
    authorUserId?: UuidNullableFilter<"Message"> | string | null
    role?: EnumMessageRoleFilter<"Message"> | $Enums.MessageRole
    contentText?: StringNullableFilter<"Message"> | string | null
    contentJson?: JsonNullableFilter<"Message">
    clientMessageId?: StringNullableFilter<"Message"> | string | null
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    aiGeneration?: XOR<AIGenerationNullableScalarRelationFilter, AIGenerationWhereInput> | null
    asLastConversation?: ConversationListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    authorUserId?: SortOrderInput | SortOrder
    role?: SortOrder
    contentText?: SortOrderInput | SortOrder
    contentJson?: SortOrderInput | SortOrder
    clientMessageId?: SortOrderInput | SortOrder
    editedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    conversation?: ConversationOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    aiGeneration?: AIGenerationOrderByWithRelationInput
    asLastConversation?: ConversationOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId_clientMessageId?: MessageConversationIdClientMessageIdCompoundUniqueInput
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversationId?: UuidFilter<"Message"> | string
    authorUserId?: UuidNullableFilter<"Message"> | string | null
    role?: EnumMessageRoleFilter<"Message"> | $Enums.MessageRole
    contentText?: StringNullableFilter<"Message"> | string | null
    contentJson?: JsonNullableFilter<"Message">
    clientMessageId?: StringNullableFilter<"Message"> | string | null
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    aiGeneration?: XOR<AIGenerationNullableScalarRelationFilter, AIGenerationWhereInput> | null
    asLastConversation?: ConversationListRelationFilter
  }, "id" | "conversationId_clientMessageId">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    authorUserId?: SortOrderInput | SortOrder
    role?: SortOrder
    contentText?: SortOrderInput | SortOrder
    contentJson?: SortOrderInput | SortOrder
    clientMessageId?: SortOrderInput | SortOrder
    editedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Message"> | string
    conversationId?: UuidWithAggregatesFilter<"Message"> | string
    authorUserId?: UuidNullableWithAggregatesFilter<"Message"> | string | null
    role?: EnumMessageRoleWithAggregatesFilter<"Message"> | $Enums.MessageRole
    contentText?: StringNullableWithAggregatesFilter<"Message"> | string | null
    contentJson?: JsonNullableWithAggregatesFilter<"Message">
    clientMessageId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    editedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
  }

  export type AIGenerationWhereInput = {
    AND?: AIGenerationWhereInput | AIGenerationWhereInput[]
    OR?: AIGenerationWhereInput[]
    NOT?: AIGenerationWhereInput | AIGenerationWhereInput[]
    id?: UuidFilter<"AIGeneration"> | string
    conversationId?: UuidFilter<"AIGeneration"> | string
    assistantMessageId?: UuidFilter<"AIGeneration"> | string
    status?: EnumAIGenerationStatusFilter<"AIGeneration"> | $Enums.AIGenerationStatus
    provider?: StringFilter<"AIGeneration"> | string
    model?: StringFilter<"AIGeneration"> | string
    temperature?: DecimalNullableFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    topP?: DecimalNullableFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    contextMessageIds?: StringNullableListFilter<"AIGeneration">
    systemPrompt?: StringNullableFilter<"AIGeneration"> | string | null
    inputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    outputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    totalTokens?: IntNullableFilter<"AIGeneration"> | number | null
    cachedInputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    latencyMs?: IntNullableFilter<"AIGeneration"> | number | null
    ttftMs?: IntNullableFilter<"AIGeneration"> | number | null
    providerRequestId?: StringNullableFilter<"AIGeneration"> | string | null
    providerResponseId?: StringNullableFilter<"AIGeneration"> | string | null
    requestJson?: JsonNullableFilter<"AIGeneration">
    responseJson?: JsonNullableFilter<"AIGeneration">
    errorType?: StringNullableFilter<"AIGeneration"> | string | null
    errorDetail?: StringNullableFilter<"AIGeneration"> | string | null
    createdAt?: DateTimeFilter<"AIGeneration"> | Date | string
    completedAt?: DateTimeNullableFilter<"AIGeneration"> | Date | string | null
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    assistantMessage?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type AIGenerationOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    assistantMessageId?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrderInput | SortOrder
    topP?: SortOrderInput | SortOrder
    maxOutputTokens?: SortOrderInput | SortOrder
    contextMessageIds?: SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    inputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    totalTokens?: SortOrderInput | SortOrder
    cachedInputTokens?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    ttftMs?: SortOrderInput | SortOrder
    providerRequestId?: SortOrderInput | SortOrder
    providerResponseId?: SortOrderInput | SortOrder
    requestJson?: SortOrderInput | SortOrder
    responseJson?: SortOrderInput | SortOrder
    errorType?: SortOrderInput | SortOrder
    errorDetail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    conversation?: ConversationOrderByWithRelationInput
    assistantMessage?: MessageOrderByWithRelationInput
  }

  export type AIGenerationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assistantMessageId?: string
    AND?: AIGenerationWhereInput | AIGenerationWhereInput[]
    OR?: AIGenerationWhereInput[]
    NOT?: AIGenerationWhereInput | AIGenerationWhereInput[]
    conversationId?: UuidFilter<"AIGeneration"> | string
    status?: EnumAIGenerationStatusFilter<"AIGeneration"> | $Enums.AIGenerationStatus
    provider?: StringFilter<"AIGeneration"> | string
    model?: StringFilter<"AIGeneration"> | string
    temperature?: DecimalNullableFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    topP?: DecimalNullableFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    contextMessageIds?: StringNullableListFilter<"AIGeneration">
    systemPrompt?: StringNullableFilter<"AIGeneration"> | string | null
    inputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    outputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    totalTokens?: IntNullableFilter<"AIGeneration"> | number | null
    cachedInputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    latencyMs?: IntNullableFilter<"AIGeneration"> | number | null
    ttftMs?: IntNullableFilter<"AIGeneration"> | number | null
    providerRequestId?: StringNullableFilter<"AIGeneration"> | string | null
    providerResponseId?: StringNullableFilter<"AIGeneration"> | string | null
    requestJson?: JsonNullableFilter<"AIGeneration">
    responseJson?: JsonNullableFilter<"AIGeneration">
    errorType?: StringNullableFilter<"AIGeneration"> | string | null
    errorDetail?: StringNullableFilter<"AIGeneration"> | string | null
    createdAt?: DateTimeFilter<"AIGeneration"> | Date | string
    completedAt?: DateTimeNullableFilter<"AIGeneration"> | Date | string | null
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    assistantMessage?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id" | "assistantMessageId">

  export type AIGenerationOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    assistantMessageId?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrderInput | SortOrder
    topP?: SortOrderInput | SortOrder
    maxOutputTokens?: SortOrderInput | SortOrder
    contextMessageIds?: SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    inputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    totalTokens?: SortOrderInput | SortOrder
    cachedInputTokens?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    ttftMs?: SortOrderInput | SortOrder
    providerRequestId?: SortOrderInput | SortOrder
    providerResponseId?: SortOrderInput | SortOrder
    requestJson?: SortOrderInput | SortOrder
    responseJson?: SortOrderInput | SortOrder
    errorType?: SortOrderInput | SortOrder
    errorDetail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: AIGenerationCountOrderByAggregateInput
    _avg?: AIGenerationAvgOrderByAggregateInput
    _max?: AIGenerationMaxOrderByAggregateInput
    _min?: AIGenerationMinOrderByAggregateInput
    _sum?: AIGenerationSumOrderByAggregateInput
  }

  export type AIGenerationScalarWhereWithAggregatesInput = {
    AND?: AIGenerationScalarWhereWithAggregatesInput | AIGenerationScalarWhereWithAggregatesInput[]
    OR?: AIGenerationScalarWhereWithAggregatesInput[]
    NOT?: AIGenerationScalarWhereWithAggregatesInput | AIGenerationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AIGeneration"> | string
    conversationId?: UuidWithAggregatesFilter<"AIGeneration"> | string
    assistantMessageId?: UuidWithAggregatesFilter<"AIGeneration"> | string
    status?: EnumAIGenerationStatusWithAggregatesFilter<"AIGeneration"> | $Enums.AIGenerationStatus
    provider?: StringWithAggregatesFilter<"AIGeneration"> | string
    model?: StringWithAggregatesFilter<"AIGeneration"> | string
    temperature?: DecimalNullableWithAggregatesFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    topP?: DecimalNullableWithAggregatesFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: IntNullableWithAggregatesFilter<"AIGeneration"> | number | null
    contextMessageIds?: StringNullableListFilter<"AIGeneration">
    systemPrompt?: StringNullableWithAggregatesFilter<"AIGeneration"> | string | null
    inputTokens?: IntNullableWithAggregatesFilter<"AIGeneration"> | number | null
    outputTokens?: IntNullableWithAggregatesFilter<"AIGeneration"> | number | null
    totalTokens?: IntNullableWithAggregatesFilter<"AIGeneration"> | number | null
    cachedInputTokens?: IntNullableWithAggregatesFilter<"AIGeneration"> | number | null
    latencyMs?: IntNullableWithAggregatesFilter<"AIGeneration"> | number | null
    ttftMs?: IntNullableWithAggregatesFilter<"AIGeneration"> | number | null
    providerRequestId?: StringNullableWithAggregatesFilter<"AIGeneration"> | string | null
    providerResponseId?: StringNullableWithAggregatesFilter<"AIGeneration"> | string | null
    requestJson?: JsonNullableWithAggregatesFilter<"AIGeneration">
    responseJson?: JsonNullableWithAggregatesFilter<"AIGeneration">
    errorType?: StringNullableWithAggregatesFilter<"AIGeneration"> | string | null
    errorDetail?: StringNullableWithAggregatesFilter<"AIGeneration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AIGeneration"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"AIGeneration"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    kind?: $Enums.UserKind
    email?: string | null
    displayName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSeenAt?: Date | string | null
    deletedAt?: Date | string | null
    authSubject?: string | null
    conversations?: ConversationCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    kind?: $Enums.UserKind
    email?: string | null
    displayName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSeenAt?: Date | string | null
    deletedAt?: Date | string | null
    authSubject?: string | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    kind?: $Enums.UserKind
    email?: string | null
    displayName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSeenAt?: Date | string | null
    deletedAt?: Date | string | null
    authSubject?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConversationCreateInput = {
    id?: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    lastMessage?: MessageCreateNestedOneWithoutAsLastConversationInput
    AIGeneration?: AIGenerationCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    userId: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    lastMessageId?: string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    AIGeneration?: AIGenerationUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    lastMessage?: MessageUpdateOneWithoutAsLastConversationNestedInput
    AIGeneration?: AIGenerationUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    AIGeneration?: AIGenerationUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    userId: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    lastMessageId?: string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageCreateInput = {
    id?: string
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    author?: UserCreateNestedOneWithoutMessagesInput
    aiGeneration?: AIGenerationCreateNestedOneWithoutAssistantMessageInput
    asLastConversation?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    authorUserId?: string | null
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    aiGeneration?: AIGenerationUncheckedCreateNestedOneWithoutAssistantMessageInput
    asLastConversation?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneWithoutMessagesNestedInput
    aiGeneration?: AIGenerationUpdateOneWithoutAssistantMessageNestedInput
    asLastConversation?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiGeneration?: AIGenerationUncheckedUpdateOneWithoutAssistantMessageNestedInput
    asLastConversation?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id?: string
    conversationId: string
    authorUserId?: string | null
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIGenerationCreateInput = {
    id?: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutAIGenerationInput
    assistantMessage: MessageCreateNestedOneWithoutAiGenerationInput
  }

  export type AIGenerationUncheckedCreateInput = {
    id?: string
    conversationId: string
    assistantMessageId: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIGenerationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutAIGenerationNestedInput
    assistantMessage?: MessageUpdateOneRequiredWithoutAiGenerationNestedInput
  }

  export type AIGenerationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    assistantMessageId?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIGenerationCreateManyInput = {
    id?: string
    conversationId: string
    assistantMessageId: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIGenerationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIGenerationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    assistantMessageId?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type EnumUserKindFilter<$PrismaModel = never> = {
    equals?: $Enums.UserKind | EnumUserKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserKindFilter<$PrismaModel> | $Enums.UserKind
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSeenAt?: SortOrder
    deletedAt?: SortOrder
    authSubject?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSeenAt?: SortOrder
    deletedAt?: SortOrder
    authSubject?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSeenAt?: SortOrder
    deletedAt?: SortOrder
    authSubject?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserKind | EnumUserKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserKindWithAggregatesFilter<$PrismaModel> | $Enums.UserKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserKindFilter<$PrismaModel>
    _max?: NestedEnumUserKindFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MessageNullableScalarRelationFilter = {
    is?: MessageWhereInput | null
    isNot?: MessageWhereInput | null
  }

  export type AIGenerationListRelationFilter = {
    every?: AIGenerationWhereInput
    some?: AIGenerationWhereInput
    none?: AIGenerationWhereInput
  }

  export type AIGenerationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    titleSetByUser?: SortOrder
    messageCount?: SortOrder
    lastMessageAt?: SortOrder
    lastMessageId?: SortOrder
    aiSettings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ConversationAvgOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    titleSetByUser?: SortOrder
    messageCount?: SortOrder
    lastMessageAt?: SortOrder
    lastMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    titleSetByUser?: SortOrder
    messageCount?: SortOrder
    lastMessageAt?: SortOrder
    lastMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ConversationSumOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AIGenerationNullableScalarRelationFilter = {
    is?: AIGenerationWhereInput | null
    isNot?: AIGenerationWhereInput | null
  }

  export type MessageConversationIdClientMessageIdCompoundUniqueInput = {
    conversationId: string
    clientMessageId: string
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    authorUserId?: SortOrder
    role?: SortOrder
    contentText?: SortOrder
    contentJson?: SortOrder
    clientMessageId?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    authorUserId?: SortOrder
    role?: SortOrder
    contentText?: SortOrder
    clientMessageId?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    authorUserId?: SortOrder
    role?: SortOrder
    contentText?: SortOrder
    clientMessageId?: SortOrder
    editedAt?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type EnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumMessageRoleFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAIGenerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIGenerationStatus | EnumAIGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIGenerationStatusFilter<$PrismaModel> | $Enums.AIGenerationStatus
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput
    isNot?: MessageWhereInput
  }

  export type AIGenerationCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    assistantMessageId?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    topP?: SortOrder
    maxOutputTokens?: SortOrder
    contextMessageIds?: SortOrder
    systemPrompt?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cachedInputTokens?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    providerRequestId?: SortOrder
    providerResponseId?: SortOrder
    requestJson?: SortOrder
    responseJson?: SortOrder
    errorType?: SortOrder
    errorDetail?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AIGenerationAvgOrderByAggregateInput = {
    temperature?: SortOrder
    topP?: SortOrder
    maxOutputTokens?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cachedInputTokens?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
  }

  export type AIGenerationMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    assistantMessageId?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    topP?: SortOrder
    maxOutputTokens?: SortOrder
    systemPrompt?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cachedInputTokens?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    providerRequestId?: SortOrder
    providerResponseId?: SortOrder
    errorType?: SortOrder
    errorDetail?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AIGenerationMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    assistantMessageId?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    temperature?: SortOrder
    topP?: SortOrder
    maxOutputTokens?: SortOrder
    systemPrompt?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cachedInputTokens?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
    providerRequestId?: SortOrder
    providerResponseId?: SortOrder
    errorType?: SortOrder
    errorDetail?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AIGenerationSumOrderByAggregateInput = {
    temperature?: SortOrder
    topP?: SortOrder
    maxOutputTokens?: SortOrder
    inputTokens?: SortOrder
    outputTokens?: SortOrder
    totalTokens?: SortOrder
    cachedInputTokens?: SortOrder
    latencyMs?: SortOrder
    ttftMs?: SortOrder
  }

  export type EnumAIGenerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIGenerationStatus | EnumAIGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIGenerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIGenerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIGenerationStatusFilter<$PrismaModel>
    _max?: NestedEnumAIGenerationStatusFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutAuthorInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserKindFieldUpdateOperationsInput = {
    set?: $Enums.UserKind
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutAuthorInput | MessageUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutAuthorInput | MessageUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutAuthorInput | MessageUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput> | MessageCreateWithoutAuthorInput[] | MessageUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutAuthorInput | MessageCreateOrConnectWithoutAuthorInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutAuthorInput | MessageUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: MessageCreateManyAuthorInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutAuthorInput | MessageUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutAuthorInput | MessageUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedOneWithoutAsLastConversationInput = {
    create?: XOR<MessageCreateWithoutAsLastConversationInput, MessageUncheckedCreateWithoutAsLastConversationInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAsLastConversationInput
    connect?: MessageWhereUniqueInput
  }

  export type AIGenerationCreateNestedManyWithoutConversationInput = {
    create?: XOR<AIGenerationCreateWithoutConversationInput, AIGenerationUncheckedCreateWithoutConversationInput> | AIGenerationCreateWithoutConversationInput[] | AIGenerationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIGenerationCreateOrConnectWithoutConversationInput | AIGenerationCreateOrConnectWithoutConversationInput[]
    createMany?: AIGenerationCreateManyConversationInputEnvelope
    connect?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AIGenerationUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<AIGenerationCreateWithoutConversationInput, AIGenerationUncheckedCreateWithoutConversationInput> | AIGenerationCreateWithoutConversationInput[] | AIGenerationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIGenerationCreateOrConnectWithoutConversationInput | AIGenerationCreateOrConnectWithoutConversationInput[]
    createMany?: AIGenerationCreateManyConversationInputEnvelope
    connect?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateOneWithoutAsLastConversationNestedInput = {
    create?: XOR<MessageCreateWithoutAsLastConversationInput, MessageUncheckedCreateWithoutAsLastConversationInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAsLastConversationInput
    upsert?: MessageUpsertWithoutAsLastConversationInput
    disconnect?: MessageWhereInput | boolean
    delete?: MessageWhereInput | boolean
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutAsLastConversationInput, MessageUpdateWithoutAsLastConversationInput>, MessageUncheckedUpdateWithoutAsLastConversationInput>
  }

  export type AIGenerationUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AIGenerationCreateWithoutConversationInput, AIGenerationUncheckedCreateWithoutConversationInput> | AIGenerationCreateWithoutConversationInput[] | AIGenerationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIGenerationCreateOrConnectWithoutConversationInput | AIGenerationCreateOrConnectWithoutConversationInput[]
    upsert?: AIGenerationUpsertWithWhereUniqueWithoutConversationInput | AIGenerationUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AIGenerationCreateManyConversationInputEnvelope
    set?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    disconnect?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    delete?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    connect?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    update?: AIGenerationUpdateWithWhereUniqueWithoutConversationInput | AIGenerationUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AIGenerationUpdateManyWithWhereWithoutConversationInput | AIGenerationUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AIGenerationScalarWhereInput | AIGenerationScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AIGenerationUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AIGenerationCreateWithoutConversationInput, AIGenerationUncheckedCreateWithoutConversationInput> | AIGenerationCreateWithoutConversationInput[] | AIGenerationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AIGenerationCreateOrConnectWithoutConversationInput | AIGenerationCreateOrConnectWithoutConversationInput[]
    upsert?: AIGenerationUpsertWithWhereUniqueWithoutConversationInput | AIGenerationUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AIGenerationCreateManyConversationInputEnvelope
    set?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    disconnect?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    delete?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    connect?: AIGenerationWhereUniqueInput | AIGenerationWhereUniqueInput[]
    update?: AIGenerationUpdateWithWhereUniqueWithoutConversationInput | AIGenerationUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AIGenerationUpdateManyWithWhereWithoutConversationInput | AIGenerationUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AIGenerationScalarWhereInput | AIGenerationScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type AIGenerationCreateNestedOneWithoutAssistantMessageInput = {
    create?: XOR<AIGenerationCreateWithoutAssistantMessageInput, AIGenerationUncheckedCreateWithoutAssistantMessageInput>
    connectOrCreate?: AIGenerationCreateOrConnectWithoutAssistantMessageInput
    connect?: AIGenerationWhereUniqueInput
  }

  export type ConversationCreateNestedManyWithoutLastMessageInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type AIGenerationUncheckedCreateNestedOneWithoutAssistantMessageInput = {
    create?: XOR<AIGenerationCreateWithoutAssistantMessageInput, AIGenerationUncheckedCreateWithoutAssistantMessageInput>
    connectOrCreate?: AIGenerationCreateOrConnectWithoutAssistantMessageInput
    connect?: AIGenerationWhereUniqueInput
  }

  export type ConversationUncheckedCreateNestedManyWithoutLastMessageInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type EnumMessageRoleFieldUpdateOperationsInput = {
    set?: $Enums.MessageRole
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type AIGenerationUpdateOneWithoutAssistantMessageNestedInput = {
    create?: XOR<AIGenerationCreateWithoutAssistantMessageInput, AIGenerationUncheckedCreateWithoutAssistantMessageInput>
    connectOrCreate?: AIGenerationCreateOrConnectWithoutAssistantMessageInput
    upsert?: AIGenerationUpsertWithoutAssistantMessageInput
    disconnect?: AIGenerationWhereInput | boolean
    delete?: AIGenerationWhereInput | boolean
    connect?: AIGenerationWhereUniqueInput
    update?: XOR<XOR<AIGenerationUpdateToOneWithWhereWithoutAssistantMessageInput, AIGenerationUpdateWithoutAssistantMessageInput>, AIGenerationUncheckedUpdateWithoutAssistantMessageInput>
  }

  export type ConversationUpdateManyWithoutLastMessageNestedInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLastMessageInput | ConversationUpsertWithWhereUniqueWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLastMessageInput | ConversationUpdateWithWhereUniqueWithoutLastMessageInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLastMessageInput | ConversationUpdateManyWithWhereWithoutLastMessageInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type AIGenerationUncheckedUpdateOneWithoutAssistantMessageNestedInput = {
    create?: XOR<AIGenerationCreateWithoutAssistantMessageInput, AIGenerationUncheckedCreateWithoutAssistantMessageInput>
    connectOrCreate?: AIGenerationCreateOrConnectWithoutAssistantMessageInput
    upsert?: AIGenerationUpsertWithoutAssistantMessageInput
    disconnect?: AIGenerationWhereInput | boolean
    delete?: AIGenerationWhereInput | boolean
    connect?: AIGenerationWhereUniqueInput
    update?: XOR<XOR<AIGenerationUpdateToOneWithWhereWithoutAssistantMessageInput, AIGenerationUpdateWithoutAssistantMessageInput>, AIGenerationUncheckedUpdateWithoutAssistantMessageInput>
  }

  export type ConversationUncheckedUpdateManyWithoutLastMessageNestedInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLastMessageInput | ConversationUpsertWithWhereUniqueWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLastMessageInput | ConversationUpdateWithWhereUniqueWithoutLastMessageInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLastMessageInput | ConversationUpdateManyWithWhereWithoutLastMessageInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type AIGenerationCreatecontextMessageIdsInput = {
    set: string[]
  }

  export type ConversationCreateNestedOneWithoutAIGenerationInput = {
    create?: XOR<ConversationCreateWithoutAIGenerationInput, ConversationUncheckedCreateWithoutAIGenerationInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutAIGenerationInput
    connect?: ConversationWhereUniqueInput
  }

  export type MessageCreateNestedOneWithoutAiGenerationInput = {
    create?: XOR<MessageCreateWithoutAiGenerationInput, MessageUncheckedCreateWithoutAiGenerationInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAiGenerationInput
    connect?: MessageWhereUniqueInput
  }

  export type EnumAIGenerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.AIGenerationStatus
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AIGenerationUpdatecontextMessageIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConversationUpdateOneRequiredWithoutAIGenerationNestedInput = {
    create?: XOR<ConversationCreateWithoutAIGenerationInput, ConversationUncheckedCreateWithoutAIGenerationInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutAIGenerationInput
    upsert?: ConversationUpsertWithoutAIGenerationInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutAIGenerationInput, ConversationUpdateWithoutAIGenerationInput>, ConversationUncheckedUpdateWithoutAIGenerationInput>
  }

  export type MessageUpdateOneRequiredWithoutAiGenerationNestedInput = {
    create?: XOR<MessageCreateWithoutAiGenerationInput, MessageUncheckedCreateWithoutAiGenerationInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAiGenerationInput
    upsert?: MessageUpsertWithoutAiGenerationInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutAiGenerationInput, MessageUpdateWithoutAiGenerationInput>, MessageUncheckedUpdateWithoutAiGenerationInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedEnumUserKindFilter<$PrismaModel = never> = {
    equals?: $Enums.UserKind | EnumUserKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserKindFilter<$PrismaModel> | $Enums.UserKind
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserKind | EnumUserKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserKind[] | ListEnumUserKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserKindWithAggregatesFilter<$PrismaModel> | $Enums.UserKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserKindFilter<$PrismaModel>
    _max?: NestedEnumUserKindFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole
  }

  export type NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumMessageRoleFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAIGenerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIGenerationStatus | EnumAIGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIGenerationStatusFilter<$PrismaModel> | $Enums.AIGenerationStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumAIGenerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIGenerationStatus | EnumAIGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIGenerationStatus[] | ListEnumAIGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIGenerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIGenerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIGenerationStatusFilter<$PrismaModel>
    _max?: NestedEnumAIGenerationStatusFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    messages?: MessageCreateNestedManyWithoutConversationInput
    lastMessage?: MessageCreateNestedOneWithoutAsLastConversationInput
    AIGeneration?: AIGenerationCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    lastMessageId?: string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    AIGeneration?: AIGenerationUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: ConversationCreateManyUserInput | ConversationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutAuthorInput = {
    id?: string
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    aiGeneration?: AIGenerationCreateNestedOneWithoutAssistantMessageInput
    asLastConversation?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateWithoutAuthorInput = {
    id?: string
    conversationId: string
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    aiGeneration?: AIGenerationUncheckedCreateNestedOneWithoutAssistantMessageInput
    asLastConversation?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageCreateOrConnectWithoutAuthorInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput>
  }

  export type MessageCreateManyAuthorInputEnvelope = {
    data: MessageCreateManyAuthorInput | MessageCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: UuidFilter<"Conversation"> | string
    userId?: UuidFilter<"Conversation"> | string
    title?: StringNullableFilter<"Conversation"> | string | null
    titleSetByUser?: BoolFilter<"Conversation"> | boolean
    messageCount?: IntFilter<"Conversation"> | number
    lastMessageAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    lastMessageId?: UuidNullableFilter<"Conversation"> | string | null
    aiSettings?: JsonFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
  }

  export type MessageUpsertWithWhereUniqueWithoutAuthorInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutAuthorInput, MessageUncheckedUpdateWithoutAuthorInput>
    create: XOR<MessageCreateWithoutAuthorInput, MessageUncheckedCreateWithoutAuthorInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutAuthorInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutAuthorInput, MessageUncheckedUpdateWithoutAuthorInput>
  }

  export type MessageUpdateManyWithWhereWithoutAuthorInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutAuthorInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: UuidFilter<"Message"> | string
    conversationId?: UuidFilter<"Message"> | string
    authorUserId?: UuidNullableFilter<"Message"> | string | null
    role?: EnumMessageRoleFilter<"Message"> | $Enums.MessageRole
    contentText?: StringNullableFilter<"Message"> | string | null
    contentJson?: JsonNullableFilter<"Message">
    clientMessageId?: StringNullableFilter<"Message"> | string | null
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    kind?: $Enums.UserKind
    email?: string | null
    displayName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSeenAt?: Date | string | null
    deletedAt?: Date | string | null
    authSubject?: string | null
    messages?: MessageCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    kind?: $Enums.UserKind
    email?: string | null
    displayName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSeenAt?: Date | string | null
    deletedAt?: Date | string | null
    authSubject?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    author?: UserCreateNestedOneWithoutMessagesInput
    aiGeneration?: AIGenerationCreateNestedOneWithoutAssistantMessageInput
    asLastConversation?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    authorUserId?: string | null
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    aiGeneration?: AIGenerationUncheckedCreateNestedOneWithoutAssistantMessageInput
    asLastConversation?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutAsLastConversationInput = {
    id?: string
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    author?: UserCreateNestedOneWithoutMessagesInput
    aiGeneration?: AIGenerationCreateNestedOneWithoutAssistantMessageInput
  }

  export type MessageUncheckedCreateWithoutAsLastConversationInput = {
    id?: string
    conversationId: string
    authorUserId?: string | null
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    aiGeneration?: AIGenerationUncheckedCreateNestedOneWithoutAssistantMessageInput
  }

  export type MessageCreateOrConnectWithoutAsLastConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAsLastConversationInput, MessageUncheckedCreateWithoutAsLastConversationInput>
  }

  export type AIGenerationCreateWithoutConversationInput = {
    id?: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    assistantMessage: MessageCreateNestedOneWithoutAiGenerationInput
  }

  export type AIGenerationUncheckedCreateWithoutConversationInput = {
    id?: string
    assistantMessageId: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIGenerationCreateOrConnectWithoutConversationInput = {
    where: AIGenerationWhereUniqueInput
    create: XOR<AIGenerationCreateWithoutConversationInput, AIGenerationUncheckedCreateWithoutConversationInput>
  }

  export type AIGenerationCreateManyConversationInputEnvelope = {
    data: AIGenerationCreateManyConversationInput | AIGenerationCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageUpsertWithoutAsLastConversationInput = {
    update: XOR<MessageUpdateWithoutAsLastConversationInput, MessageUncheckedUpdateWithoutAsLastConversationInput>
    create: XOR<MessageCreateWithoutAsLastConversationInput, MessageUncheckedCreateWithoutAsLastConversationInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutAsLastConversationInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutAsLastConversationInput, MessageUncheckedUpdateWithoutAsLastConversationInput>
  }

  export type MessageUpdateWithoutAsLastConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneWithoutMessagesNestedInput
    aiGeneration?: AIGenerationUpdateOneWithoutAssistantMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutAsLastConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiGeneration?: AIGenerationUncheckedUpdateOneWithoutAssistantMessageNestedInput
  }

  export type AIGenerationUpsertWithWhereUniqueWithoutConversationInput = {
    where: AIGenerationWhereUniqueInput
    update: XOR<AIGenerationUpdateWithoutConversationInput, AIGenerationUncheckedUpdateWithoutConversationInput>
    create: XOR<AIGenerationCreateWithoutConversationInput, AIGenerationUncheckedCreateWithoutConversationInput>
  }

  export type AIGenerationUpdateWithWhereUniqueWithoutConversationInput = {
    where: AIGenerationWhereUniqueInput
    data: XOR<AIGenerationUpdateWithoutConversationInput, AIGenerationUncheckedUpdateWithoutConversationInput>
  }

  export type AIGenerationUpdateManyWithWhereWithoutConversationInput = {
    where: AIGenerationScalarWhereInput
    data: XOR<AIGenerationUpdateManyMutationInput, AIGenerationUncheckedUpdateManyWithoutConversationInput>
  }

  export type AIGenerationScalarWhereInput = {
    AND?: AIGenerationScalarWhereInput | AIGenerationScalarWhereInput[]
    OR?: AIGenerationScalarWhereInput[]
    NOT?: AIGenerationScalarWhereInput | AIGenerationScalarWhereInput[]
    id?: UuidFilter<"AIGeneration"> | string
    conversationId?: UuidFilter<"AIGeneration"> | string
    assistantMessageId?: UuidFilter<"AIGeneration"> | string
    status?: EnumAIGenerationStatusFilter<"AIGeneration"> | $Enums.AIGenerationStatus
    provider?: StringFilter<"AIGeneration"> | string
    model?: StringFilter<"AIGeneration"> | string
    temperature?: DecimalNullableFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    topP?: DecimalNullableFilter<"AIGeneration"> | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    contextMessageIds?: StringNullableListFilter<"AIGeneration">
    systemPrompt?: StringNullableFilter<"AIGeneration"> | string | null
    inputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    outputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    totalTokens?: IntNullableFilter<"AIGeneration"> | number | null
    cachedInputTokens?: IntNullableFilter<"AIGeneration"> | number | null
    latencyMs?: IntNullableFilter<"AIGeneration"> | number | null
    ttftMs?: IntNullableFilter<"AIGeneration"> | number | null
    providerRequestId?: StringNullableFilter<"AIGeneration"> | string | null
    providerResponseId?: StringNullableFilter<"AIGeneration"> | string | null
    requestJson?: JsonNullableFilter<"AIGeneration">
    responseJson?: JsonNullableFilter<"AIGeneration">
    errorType?: StringNullableFilter<"AIGeneration"> | string | null
    errorDetail?: StringNullableFilter<"AIGeneration"> | string | null
    createdAt?: DateTimeFilter<"AIGeneration"> | Date | string
    completedAt?: DateTimeNullableFilter<"AIGeneration"> | Date | string | null
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutConversationsInput
    lastMessage?: MessageCreateNestedOneWithoutAsLastConversationInput
    AIGeneration?: AIGenerationCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    lastMessageId?: string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    AIGeneration?: AIGenerationUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    kind?: $Enums.UserKind
    email?: string | null
    displayName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSeenAt?: Date | string | null
    deletedAt?: Date | string | null
    authSubject?: string | null
    conversations?: ConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    kind?: $Enums.UserKind
    email?: string | null
    displayName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSeenAt?: Date | string | null
    deletedAt?: Date | string | null
    authSubject?: string | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type AIGenerationCreateWithoutAssistantMessageInput = {
    id?: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutAIGenerationInput
  }

  export type AIGenerationUncheckedCreateWithoutAssistantMessageInput = {
    id?: string
    conversationId: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIGenerationCreateOrConnectWithoutAssistantMessageInput = {
    where: AIGenerationWhereUniqueInput
    create: XOR<AIGenerationCreateWithoutAssistantMessageInput, AIGenerationUncheckedCreateWithoutAssistantMessageInput>
  }

  export type ConversationCreateWithoutLastMessageInput = {
    id?: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    AIGeneration?: AIGenerationCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutLastMessageInput = {
    id?: string
    userId: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    AIGeneration?: AIGenerationUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutLastMessageInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput>
  }

  export type ConversationCreateManyLastMessageInputEnvelope = {
    data: ConversationCreateManyLastMessageInput | ConversationCreateManyLastMessageInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    lastMessage?: MessageUpdateOneWithoutAsLastConversationNestedInput
    AIGeneration?: AIGenerationUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    AIGeneration?: AIGenerationUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
    conversations?: ConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserKindFieldUpdateOperationsInput | $Enums.UserKind
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authSubject?: NullableStringFieldUpdateOperationsInput | string | null
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AIGenerationUpsertWithoutAssistantMessageInput = {
    update: XOR<AIGenerationUpdateWithoutAssistantMessageInput, AIGenerationUncheckedUpdateWithoutAssistantMessageInput>
    create: XOR<AIGenerationCreateWithoutAssistantMessageInput, AIGenerationUncheckedCreateWithoutAssistantMessageInput>
    where?: AIGenerationWhereInput
  }

  export type AIGenerationUpdateToOneWithWhereWithoutAssistantMessageInput = {
    where?: AIGenerationWhereInput
    data: XOR<AIGenerationUpdateWithoutAssistantMessageInput, AIGenerationUncheckedUpdateWithoutAssistantMessageInput>
  }

  export type AIGenerationUpdateWithoutAssistantMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutAIGenerationNestedInput
  }

  export type AIGenerationUncheckedUpdateWithoutAssistantMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConversationUpsertWithWhereUniqueWithoutLastMessageInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutLastMessageInput, ConversationUncheckedUpdateWithoutLastMessageInput>
    create: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutLastMessageInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutLastMessageInput, ConversationUncheckedUpdateWithoutLastMessageInput>
  }

  export type ConversationUpdateManyWithWhereWithoutLastMessageInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutLastMessageInput>
  }

  export type ConversationCreateWithoutAIGenerationInput = {
    id?: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    lastMessage?: MessageCreateNestedOneWithoutAsLastConversationInput
  }

  export type ConversationUncheckedCreateWithoutAIGenerationInput = {
    id?: string
    userId: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    lastMessageId?: string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutAIGenerationInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutAIGenerationInput, ConversationUncheckedCreateWithoutAIGenerationInput>
  }

  export type MessageCreateWithoutAiGenerationInput = {
    id?: string
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    author?: UserCreateNestedOneWithoutMessagesInput
    asLastConversation?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateWithoutAiGenerationInput = {
    id?: string
    conversationId: string
    authorUserId?: string | null
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    asLastConversation?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageCreateOrConnectWithoutAiGenerationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAiGenerationInput, MessageUncheckedCreateWithoutAiGenerationInput>
  }

  export type ConversationUpsertWithoutAIGenerationInput = {
    update: XOR<ConversationUpdateWithoutAIGenerationInput, ConversationUncheckedUpdateWithoutAIGenerationInput>
    create: XOR<ConversationCreateWithoutAIGenerationInput, ConversationUncheckedCreateWithoutAIGenerationInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutAIGenerationInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutAIGenerationInput, ConversationUncheckedUpdateWithoutAIGenerationInput>
  }

  export type ConversationUpdateWithoutAIGenerationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    lastMessage?: MessageUpdateOneWithoutAsLastConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutAIGenerationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type MessageUpsertWithoutAiGenerationInput = {
    update: XOR<MessageUpdateWithoutAiGenerationInput, MessageUncheckedUpdateWithoutAiGenerationInput>
    create: XOR<MessageCreateWithoutAiGenerationInput, MessageUncheckedCreateWithoutAiGenerationInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutAiGenerationInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutAiGenerationInput, MessageUncheckedUpdateWithoutAiGenerationInput>
  }

  export type MessageUpdateWithoutAiGenerationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    author?: UserUpdateOneWithoutMessagesNestedInput
    asLastConversation?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutAiGenerationInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    asLastConversation?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    lastMessageId?: string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type MessageCreateManyAuthorInput = {
    id?: string
    conversationId: string
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUpdateManyWithoutConversationNestedInput
    lastMessage?: MessageUpdateOneWithoutAsLastConversationNestedInput
    AIGeneration?: AIGenerationUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    AIGeneration?: AIGenerationUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    aiGeneration?: AIGenerationUpdateOneWithoutAssistantMessageNestedInput
    asLastConversation?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiGeneration?: AIGenerationUncheckedUpdateOneWithoutAssistantMessageNestedInput
    asLastConversation?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    authorUserId?: string | null
    role: $Enums.MessageRole
    contentText?: string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: string | null
    editedAt?: Date | string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AIGenerationCreateManyConversationInput = {
    id?: string
    assistantMessageId: string
    status?: $Enums.AIGenerationStatus
    provider?: string
    model: string
    temperature?: Decimal | DecimalJsLike | number | string | null
    topP?: Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: number | null
    contextMessageIds?: AIGenerationCreatecontextMessageIdsInput | string[]
    systemPrompt?: string | null
    inputTokens?: number | null
    outputTokens?: number | null
    totalTokens?: number | null
    cachedInputTokens?: number | null
    latencyMs?: number | null
    ttftMs?: number | null
    providerRequestId?: string | null
    providerResponseId?: string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: string | null
    errorDetail?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneWithoutMessagesNestedInput
    aiGeneration?: AIGenerationUpdateOneWithoutAssistantMessageNestedInput
    asLastConversation?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiGeneration?: AIGenerationUncheckedUpdateOneWithoutAssistantMessageNestedInput
    asLastConversation?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    contentJson?: NullableJsonNullValueInput | InputJsonValue
    clientMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIGenerationUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assistantMessage?: MessageUpdateOneRequiredWithoutAiGenerationNestedInput
  }

  export type AIGenerationUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assistantMessageId?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIGenerationUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assistantMessageId?: StringFieldUpdateOperationsInput | string
    status?: EnumAIGenerationStatusFieldUpdateOperationsInput | $Enums.AIGenerationStatus
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    temperature?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topP?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxOutputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    contextMessageIds?: AIGenerationUpdatecontextMessageIdsInput | string[]
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    ttftMs?: NullableIntFieldUpdateOperationsInput | number | null
    providerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    providerResponseId?: NullableStringFieldUpdateOperationsInput | string | null
    requestJson?: NullableJsonNullValueInput | InputJsonValue
    responseJson?: NullableJsonNullValueInput | InputJsonValue
    errorType?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConversationCreateManyLastMessageInput = {
    id?: string
    userId: string
    title?: string | null
    titleSetByUser?: boolean
    messageCount?: number
    lastMessageAt?: Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ConversationUpdateWithoutLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    AIGeneration?: AIGenerationUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    AIGeneration?: AIGenerationUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    titleSetByUser?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiSettings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}