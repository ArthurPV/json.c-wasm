import * as Runtime from "./runtime.js";
import * as CJson from "./c/json.js";
import * as CAlloc from "./c/alloc.js";
import * as Ace from "./ace.js";

Runtime.entrypoint(() => {
	document.getElementById("parse-btn").addEventListener("click", (e) => {
		e.preventDefault();

		const jsonEditorContent = Ace.jsonEditor.getValue();
		const textEncoder = new TextEncoder();
		const jsonEditorContentBytes = textEncoder.encode(jsonEditorContent)
		const jsonEditorContentBytesLength = jsonEditorContentBytes.length;
		const cJsonEditorContent = CAlloc.malloc(4 * jsonEditorContentBytesLength);
		const cErrorMessagePtr = CAlloc.malloc(4);
		const cJsonSPtr = CAlloc.malloc(4);

		Module.HEAP8.set(jsonEditorContentBytes, cJsonEditorContent);
		Module.setValue(cErrorMessagePtr, 0, "*");
		Module.setValue(cJsonSPtr, 0, "*");

		CJson.parse(cJsonEditorContent, jsonEditorContentBytesLength, cErrorMessagePtr, cJsonSPtr);

		const cErrorMessage = Module.getValue(cErrorMessagePtr, "*");

		if (cErrorMessage) {
			Ace.resultEditor.setValue(`Error: ${Module.UTF8ToString(cErrorMessage)}`);
		} else {
			const cJsonS = Module.getValue(cJsonSPtr, "*");

			Ace.resultEditor.setValue(Module.UTF8ToString(cJsonS));

			CAlloc.free(cJsonS);
		}

		CAlloc.free(jsonEditorContent);
		CAlloc.free(cErrorMessagePtr);
		CAlloc.free(cJsonSPtr);
	});
});
