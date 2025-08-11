export const jsonEditor = ace.edit("json-editor", {
	mode: "ace/mode/json",
	theme: "ace/theme/tomorrow",
	tabSize: 4
});

export const resultEditor = ace.edit("result-editor", {
	theme: "ace/theme/tomorrow",
	readOnly: true,
	showGutter: false,
	highlightActiveLine: false
});
