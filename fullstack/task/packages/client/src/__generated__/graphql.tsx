import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateExchangeRateInputType = {
  country: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  currencyCode: Scalars['String']['input'];
  rate: Scalars['Float']['input'];
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  country: Scalars['String']['output'];
  createdAtUtc: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  currencyCode: Scalars['String']['output'];
  deleteDateUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  rate: Scalars['Float']['output'];
  updatedAtUtc?: Maybe<Scalars['DateTime']['output']>;
  version: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExample: ExchangeRate;
};


export type MutationCreateExampleArgs = {
  data: CreateExchangeRateInputType;
};

export type Query = {
  __typename?: 'Query';
  exampleByName?: Maybe<ExchangeRate>;
  exchangeRates: Array<ExchangeRate>;
};


export type QueryExampleByNameArgs = {
  name: Scalars['String']['input'];
};

export type ExchangeRateQueryVariables = Exact<{ [key: string]: never; }>;


export type ExchangeRateQuery = { __typename?: 'Query', exchangeRates: Array<{ __typename?: 'ExchangeRate', currency: string, createdAtUtc: any, rate: number, country: string, currencyCode: string }> };


export const ExchangeRateDocument = gql`
    query ExchangeRate {
  exchangeRates {
    currency
    createdAtUtc
    rate
    country
    currencyCode
  }
}
    `;

/**
 * __useExchangeRateQuery__
 *
 * To run a query within a React component, call `useExchangeRateQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeRateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeRateQuery({
 *   variables: {
 *   },
 * });
 */
export function useExchangeRateQuery(baseOptions?: Apollo.QueryHookOptions<ExchangeRateQuery, ExchangeRateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExchangeRateQuery, ExchangeRateQueryVariables>(ExchangeRateDocument, options);
      }
export function useExchangeRateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExchangeRateQuery, ExchangeRateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExchangeRateQuery, ExchangeRateQueryVariables>(ExchangeRateDocument, options);
        }
export function useExchangeRateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExchangeRateQuery, ExchangeRateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExchangeRateQuery, ExchangeRateQueryVariables>(ExchangeRateDocument, options);
        }
export type ExchangeRateQueryHookResult = ReturnType<typeof useExchangeRateQuery>;
export type ExchangeRateLazyQueryHookResult = ReturnType<typeof useExchangeRateLazyQuery>;
export type ExchangeRateSuspenseQueryHookResult = ReturnType<typeof useExchangeRateSuspenseQuery>;
export type ExchangeRateQueryResult = Apollo.QueryResult<ExchangeRateQuery, ExchangeRateQueryVariables>;