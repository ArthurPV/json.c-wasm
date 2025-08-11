/**
 * @type {(content: number, content_len: number, error_message: number, json_s: number) => void}
 */
export const run = Module.cwrap("parse__JSONGlue", null, ["number", "number", "number", "number"]);
