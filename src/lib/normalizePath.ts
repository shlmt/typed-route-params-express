const regex = /<([^:>]+)(?::[^>]+)?>/g
export const normalizePath = (path: string) => path.replace(regex, ':$1')
