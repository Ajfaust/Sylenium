/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LedgersIndexImport } from './routes/ledgers/index'
import { Route as AccountsAccountIdImport } from './routes/accounts/$accountId'
import { Route as LedgersLedgerIdAccountsImport } from './routes/ledgers/$ledgerId.accounts'

// Create/Update Routes

const LedgersIndexRoute = LedgersIndexImport.update({
  id: '/ledgers/',
  path: '/ledgers/',
  getParentRoute: () => rootRoute,
} as any)

const AccountsAccountIdRoute = AccountsAccountIdImport.update({
  id: '/accounts/$accountId',
  path: '/accounts/$accountId',
  getParentRoute: () => rootRoute,
} as any)

const LedgersLedgerIdAccountsRoute = LedgersLedgerIdAccountsImport.update({
  id: '/ledgers/$ledgerId/accounts',
  path: '/ledgers/$ledgerId/accounts',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/accounts/$accountId': {
      id: '/accounts/$accountId'
      path: '/accounts/$accountId'
      fullPath: '/accounts/$accountId'
      preLoaderRoute: typeof AccountsAccountIdImport
      parentRoute: typeof rootRoute
    }
    '/ledgers/': {
      id: '/ledgers/'
      path: '/ledgers'
      fullPath: '/ledgers'
      preLoaderRoute: typeof LedgersIndexImport
      parentRoute: typeof rootRoute
    }
    '/ledgers/$ledgerId/accounts': {
      id: '/ledgers/$ledgerId/accounts'
      path: '/ledgers/$ledgerId/accounts'
      fullPath: '/ledgers/$ledgerId/accounts'
      preLoaderRoute: typeof LedgersLedgerIdAccountsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/accounts/$accountId': typeof AccountsAccountIdRoute
  '/ledgers': typeof LedgersIndexRoute
  '/ledgers/$ledgerId/accounts': typeof LedgersLedgerIdAccountsRoute
}

export interface FileRoutesByTo {
  '/accounts/$accountId': typeof AccountsAccountIdRoute
  '/ledgers': typeof LedgersIndexRoute
  '/ledgers/$ledgerId/accounts': typeof LedgersLedgerIdAccountsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/accounts/$accountId': typeof AccountsAccountIdRoute
  '/ledgers/': typeof LedgersIndexRoute
  '/ledgers/$ledgerId/accounts': typeof LedgersLedgerIdAccountsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/accounts/$accountId' | '/ledgers' | '/ledgers/$ledgerId/accounts'
  fileRoutesByTo: FileRoutesByTo
  to: '/accounts/$accountId' | '/ledgers' | '/ledgers/$ledgerId/accounts'
  id:
    | '__root__'
    | '/accounts/$accountId'
    | '/ledgers/'
    | '/ledgers/$ledgerId/accounts'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AccountsAccountIdRoute: typeof AccountsAccountIdRoute
  LedgersIndexRoute: typeof LedgersIndexRoute
  LedgersLedgerIdAccountsRoute: typeof LedgersLedgerIdAccountsRoute
}

const rootRouteChildren: RootRouteChildren = {
  AccountsAccountIdRoute: AccountsAccountIdRoute,
  LedgersIndexRoute: LedgersIndexRoute,
  LedgersLedgerIdAccountsRoute: LedgersLedgerIdAccountsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/accounts/$accountId",
        "/ledgers/",
        "/ledgers/$ledgerId/accounts"
      ]
    },
    "/accounts/$accountId": {
      "filePath": "accounts/$accountId.tsx"
    },
    "/ledgers/": {
      "filePath": "ledgers/index.tsx"
    },
    "/ledgers/$ledgerId/accounts": {
      "filePath": "ledgers/$ledgerId.accounts.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
