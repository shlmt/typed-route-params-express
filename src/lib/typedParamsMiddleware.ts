import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { parsePattern } from './parsePattern'

export const createTypedParamsMiddleware = (originalPath: string): RequestHandler => {
	return (req, res, next) => {
		const currentMethod = req.method.toLowerCase()
		if (req.route && !req.route.methods[currentMethod]) {
			return res.status(404).send(`Cannot ${req.method} ${req.path}`)
		}
		try {
			req.params = parsePattern(originalPath, req.params) as ParamsDictionary
		} catch (error: unknown) {
			return res.status(400).send(error instanceof Error ? error.message : 'Invalid request parameters')
		}
		next()
	}
}
