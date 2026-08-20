import originalExpress, { type Application, type Router, type RouterOptions, type RequestHandler } from 'express'
import { Types } from './types'
import { ParsedQs } from 'qs'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options' | 'all'

type StrictParams<Path extends string> = keyof Types.Params<Path> extends never
	? Record<string, string>
	: Types.Params<Path>

type PathError<Path extends string> = `Error: Invalid path format in '${Path}'. Unsupported parameter type.`

type ValidatedPathConstraint<Path extends string> = Types.ValidatePath<Path> extends never ? PathError<Path> : string

type TypedMatcher<T> = <
	Path extends ValidatedPathConstraint<Path>,
	ResBody = any,
	ReqBody = any,
	ReqQuery = ParsedQs,
	Locals extends Record<string, any> = Record<string, any>
>(
	path: Path,
	...handlers: RequestHandler<StrictParams<Path>, ResBody, ReqBody, ReqQuery, Locals>[]
) => T

type TypedRoute<Path extends string> = {
	[M in Method]: <
		ResBody = any,
		ReqBody = any,
		ReqQuery = ParsedQs,
		Locals extends Record<string, any> = Record<string, any>
	>(
		...handlers: RequestHandler<StrictParams<Path>, ResBody, ReqBody, ReqQuery, Locals>[]
	) => TypedRoute<Path>
}

interface ITypedRouting<T> {
	get: TypedMatcher<T> & ((name: string) => any)
	post: TypedMatcher<T>
	put: TypedMatcher<T>
	patch: TypedMatcher<T>
	delete: TypedMatcher<T>
	head: TypedMatcher<T>
	options: TypedMatcher<T>
	all: TypedMatcher<T>
	route: <Path extends ValidatedPathConstraint<Path>>(path: Path) => TypedRoute<Path>
}

export type TypedApplication = Omit<Application, Method | 'route'> & ITypedRouting<TypedApplication> & RequestHandler

export type TypedRouter = Omit<Router, Method | 'route'> & ITypedRouting<TypedRouter> & RequestHandler

type OriginalExpress = typeof originalExpress

export interface TypedExpress extends Omit<OriginalExpress, 'Router'> {
	(): TypedApplication
	Router: (options?: RouterOptions | undefined) => TypedRouter
}

export function typedParams(expressInstance: OriginalExpress): TypedExpress {
	return expressInstance as unknown as TypedExpress
}
