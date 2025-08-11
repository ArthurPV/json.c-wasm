/**
 * @description The function callback will be launched when the WASM runtime has been initialized.
 * @param {() => void} f
 * @return {void}
 */
export const entrypoint = (f) => {
	Module['onRuntimeInitialized'] = () => {
		f();
	}
}
