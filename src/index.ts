interface Env {
  CORS_ORIGIN?: string;
  API_BASE_PATH?: string;
}

function json(
  data: unknown,
  status = 200,
  headers: HeadersInit = {},
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization,accept",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const basePath = (env.API_BASE_PATH ?? "/v1").replace(/\/$/, "");
    const allowedOrigin = env.CORS_ORIGIN ?? "*";
    const headers = corsHeaders(allowedOrigin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === `${basePath}/health`) {
      return json({ ok: true, service: "chatbox-worker-api" }, 200, headers);
    }

    if (url.pathname.startsWith(`${basePath}/`)) {
      return json(
        {
          code: "NOT_IMPLEMENTED",
          message:
            "Worker API scaffold is deployed. Migrate Nest routes to Worker handlers for full backend functionality.",
        },
        501,
        headers,
      );
    }

    return json({ code: "NOT_FOUND", message: "Not Found" }, 404, headers);
  },
};
