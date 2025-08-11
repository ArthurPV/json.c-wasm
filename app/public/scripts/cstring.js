import { malloc, free } from "./c/alloc.js";

export class CString {
	/**
	 * @type {number}
	 */
	length;
	/**
	 * @type {number}
	 */
	#allocatedSize;
	/**
	 * @type {number}
	 */
	#ptr;

	/**
	 * @param {s} string
	 * @param {number} length
	 */
	constructor(s) {
		this.length = s.length;
		this.#allocatedSize = CString.#getAllocatedSizeFromLength(this.length);
		this.#ptr = malloc(this.#allocatedSize);

		Module.stringToUTF8(s, this.#ptr, this.#allocatedSize);
	}

	/**
	 * @param {number} length
	 * @return {number}
	 * @see https://emscripten.org/docs/api_reference/preamble.js.html#stringToUTF8
	 */
	static #convertLengthToSize(length) {
		return length * 4;
	}

	/**
	 * @param {number} length
	 * @return {number}
	 * @see https://emscripten.org/docs/api_reference/preamble.js.html#stringToUTF8
	 */
	static #getAllocatedSizeFromLength(length) {
		return CString.#convertLengthToSize(length) + 1;
	}

	/**
	 * @description Get the character of a string at n index.
	 * @param {number} index
	 * @return {number}
	 */
	get(index) {
		if (index >= this.length || index < 0) {
			throw new Error(`the index is out of bounds ${index} v. ${this.length} (index v. length)`);
		}

		return Module.getValue(this.#ptr + index, "i8");
	}

	/**
	 * @description Get the character of a string at n index, and convert the character code to string.
	 * @param {number} index
	 * @return {string}
	 */
	at(index) {
		return String.fromCharCode(this.get(index));
	}

	/**
	 * @return {number}
	 */
	toPtr() {
		return this.#ptr;
	}

	/**
	 * @return {string}
	 */
	toString() {
		if (this.#ptr === 0) {
			throw new Error("the pointer is invalid or the memory has been already free");
		}

		return Module.UTF8ToString(this.#ptr, this.#allocatedSize);
	}

	/**
	 * @return {void}
	 */
	free() {	
		free(this.#ptr);

		this.length = 0;
		this.#allocatedSize = 0;
		this.#ptr = 0;
	}
}
