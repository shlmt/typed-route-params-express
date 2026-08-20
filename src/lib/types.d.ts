export namespace Types {
	type TypeMap = {
		str: string
		num: number
		bool: boolean
	}

	type BuiltTypes = keyof TypeMap

	type Param<Path extends string> = Path extends `<${infer Key}:${infer Value}>`
		? Value extends BuiltTypes
			? { [K in Key]: TypeMap[Value] }
			: never
		: Path extends `<${infer Key}>`
			? { [K in Key]: string }
			: {}

	type Params<Path extends string> = Path extends `${infer Current}/${infer Rest}`
		? Param<Current> & Params<Rest>
		: Param<Path>

	type ValidatePath<Path extends string> = Params<Path> extends never ? never : Path
}
