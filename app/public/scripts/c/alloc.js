/**
 * @description This is a binding of the malloc function from the stdlib.h header
 * @type {(size: number) => number}
 */
export const malloc = Module.cwrap("malloc", "number", ["number"]);
/**
 * @description This is a binding of the free function from the stdlib.h header
 * @type {(ptr: number) => void}
 */
export const free = Module.cwrap("free", null, ["number"]);
