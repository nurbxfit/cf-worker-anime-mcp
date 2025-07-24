
/**
 * Converts an object of query parameters into a URL-encoded query string.
 *
 * Filters out any properties with `undefined` or `null` values, then encodes each key and value
 * using `encodeURIComponent` to ensure safe transmission in URLs.
 *
 * @param params - An object containing key-value pairs to be converted into a query string.
 * @returns A URL-encoded query string representing the provided parameters.
 *
 * @example
 * ```typescript
 * queryObjecttoQueryString({ foo: 'bar', baz: 42, qux: null });
 * // Returns: "foo=bar&baz=42"
 * ```
 */
export function queryObjectToQueryString(params: Record<string, any>): string {
    return Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null) // filter remove null or undefined value
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`) // construct it into list of strings
        .join("&")// combined it into single string.

}