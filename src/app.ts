import fastify from "fastify";
import { v1Router } from "~/router/v1";
import { swagger } from "~/libs/swagger";
import { healthRouter } from "~/router/health";
import { env } from "~/constants/env";

const server = fastify({ logger: true });
server.addHook("onRoute", (opts) => {
  if (opts.path === "/api/health") {
    // @ts-ignore silent は Fastify で用意されているログレベルに存在しない
    opts.logLevel = "silent";
  }
});

if (env.ENABLE_DOCS) {
  swagger(server);
}
server.register(healthRouter, { prefix: "/api" });
server.register(v1Router, { prefix: "/api/v1" });

export default server;
