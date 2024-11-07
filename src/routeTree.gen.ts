/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CategoriesImport } from './routes/categories'
import { Route as AccountsAccountIdImport } from './routes/accounts.$accountId'

// Create/Update Routes

const CategoriesRoute = CategoriesImport.update({
  id: '/categories',
  path: '/categories',
  getParentRoute: () => rootRoute,
} as any)

const AccountsAccountIdRoute = AccountsAccountIdImport.update({
  id: '/accounts/$accountId',
  path: '/accounts/$accountId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/categories': {
      id: '/categories'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof CategoriesImport
      parentRoute: typeof rootRoute
    }
    '/accounts/$accountId': {
      id: '/accounts/$accountId'
      path: '/accounts/$accountId'
      fullPath: '/accounts/$accountId'
      preLoaderRoute: typeof AccountsAccountIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/categories': typeof CategoriesRoute
  '/accounts/$accountId': typeof AccountsAccountIdRoute
}

export interface FileRoutesByTo {
  '/categories': typeof CategoriesRoute
  '/accounts/$accountId': typeof AccountsAccountIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/categories': typeof CategoriesRoute
  '/accounts/$accountId': typeof AccountsAccountIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/categories' | '/accounts/$accountId'
  fileRoutesByTo: FileRoutesByTo
  to: '/categories' | '/accounts/$accountId'
  id: '__root__' | '/categories' | '/accounts/$accountId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  CategoriesRoute: typeof CategoriesRoute
  AccountsAccountIdRoute: typeof AccountsAccountIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  CategoriesRoute: CategoriesRoute,
  AccountsAccountIdRoute: AccountsAccountIdRoute,
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
        "/categories",
        "/accounts/$accountId"
      ]
    },
    "/categories": {
      "filePath": "categories.tsx"
    },
    "/accounts/$accountId": {
      "filePath": "accounts.$accountId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
