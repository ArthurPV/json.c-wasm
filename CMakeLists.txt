cmake_minimum_required(VERSION 3.10)
project(json.c-wasm LANGUAGES C)

set(WASM_DIR ${CMAKE_SOURCE_DIR}/app/public/wasm)

if (EXISTS ${WASM_DIR})
	file(REMOVE_RECURSE ${WASM_DIR})
endif()

file(MAKE_DIRECTORY ${WASM_DIR})

set(LIB_DIR ${CMAKE_SOURCE_DIR}/lib)
set(LIB_SRC
	${LIB_DIR}/json.c/json.c)
set(DEFAULT_EXPORT "_free,_parse__JSON,_to_string__JSONValue,_unwrap__JSONValueResult,_deinit__JSONValueResult")

add_custom_target(compile_to_wasm_${filename} ALL COMMAND emcc ${LIB_SRC} -sEXPORTED_FUNCTIONS=${DEFAULT_EXPORT} -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,stringToUTF8,UTF8ToString,getValue -o ${WASM_DIR}/json.c.js)
