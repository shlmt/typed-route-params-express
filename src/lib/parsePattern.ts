import { ParamsDictionary } from 'express-serve-static-core'
import { Types } from './types'

const regex = /<([^:>]+)(?::([^>]+))?>/g

function parseBoolean(key: string, value: string): boolean {
	if (value === 'true') return true
	if (value === 'false') return false

	throw new Error(`"${key}" must be a boolean`)
}

function parseNumber(key: string, value: string): number {
	const parsedValue = Number(value)
	if (Number.isNaN(parsedValue)) {
		throw new Error(`"${key}" must be a number`)
	}
	return parsedValue
}

export function parsePattern<Path extends string>(path: Types.ValidatePath<Path>, params: ParamsDictionary) {
	const computedParams = {} as Types.Params<Path>
	const parsedParams = computedParams as Record<string, unknown>
	const parts = path.matchAll(regex)

	for (const part of parts) {
		const [, name, type] = part
		if (!(name in params)) return
		const value = params[name]
		if (Array.isArray(value)) {
			throw new Error('Arrays are not supported yet')
		}
		if (type === 'num') {
			parsedParams[name] = parseNumber(name, value)
		} else if (type === 'bool') {
			parsedParams[name] = parseBoolean(name, value)
		} else {
			parsedParams[name] = value
		}
	}
	return parsedParams
}
