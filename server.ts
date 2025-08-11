import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();
const port = 8000;

const readHtml = async (filename: string) => {
	const content = await Deno.readTextFile(`${Deno.cwd()}/app/views/${filename}`);
	return content;
}

const renderHtml = async (filename: string, ctx) => {
	const htmlContent = await readHtml(filename);
	ctx.response.headers.set("Content-Type", "text/html");
	ctx.response.body = htmlContent;
}

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx, next) => {
    const root = `${Deno.cwd()}/app/public`
    try {
        await ctx.send({ root })
    } catch {
        next()
    }
});

router.get("/", async (ctx) => {
	await renderHtml("index.html", ctx);
});

console.log(`Listing on port http://localhost:${port}`);

await app.listen({ port: port });
