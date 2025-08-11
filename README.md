# json.c-wasm

This project aimed to use the [json.c](https://github.com/ArthurPV/json.c) parser in the browser via WASM.

## Dependencies

- [emcc](https://emscripten.org/docs/tools_reference/emcc.html)
- [deno](https://deno.com/)
- [CMake](https://cmake.org/)
- C compiler e.g. [GCC](https://gcc.gnu.org/), [Clang](https://clang.llvm.org/)
- Build system generator e.g. [Ninja](https://ninja-build.org/), [make](https://www.gnu.org/software/make/)

## Build

```sh
# From the root of the repository
git submodule init
git submodule update lib/json.c
mkdir build
cd build
cmake .. -G Ninja
ninja
```

### Launch the server

```sh
# From the root of the repository
deno --allow-all server.ts
# Then visit http://localhost:8000/
```

## Demo

https://github.com/user-attachments/assets/1e51797b-7809-499c-b101-6fe27701c465
