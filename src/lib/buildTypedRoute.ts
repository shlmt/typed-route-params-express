import express from 'express'
import { normalizePath } from './normalizePath'
import { createTypedParamsMiddleware } from './typedParamsMiddleware'

const originalRouterRoute = express.Router.prototype.route

express.Router.prototype.route = function (this: any, path: any) {
	if (typeof path !== 'string') {
		return originalRouterRoute.apply(this, arguments as any)
	}

	const normalizedPath = normalizePath(path)
	const typedParamsMiddleware = createTypedParamsMiddleware(path)

	const route = originalRouterRoute.call(this, normalizedPath)

	route.all(typedParamsMiddleware)

	return route
}
