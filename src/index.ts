import { Elysia, t } from "elysia";

const app = new Elysia()
  .post(
    "/",
    ({ body, headers, query, params }) => {
      console.log(body);
      console.log(headers);
      console.log(query);
      console.log(params);

      
      const a = {
        hello: "world",
      };

      return a;
    },
    {
      body: t.Object({
        hello: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
