import type { CustomRequest } from "./http/custom-request.ts";
import type { CustomResponse } from "./http/custom-response.ts";

type HttpMethod = "GET" | "POST";
type Handler = (req: CustomRequest, res: CustomResponse) => Promise<void> | void;

export class Router {
  private routes: Record<HttpMethod, Record<string, Handler>> = {
    GET: {},
    POST: {},
  };

  get(route: string, handler: Handler) {
    this.routes.GET[route] = handler;
  }

  post(route: string, handler: Handler) {
    this.routes.POST[route] = handler;
  }

  find(method: string | undefined, route: string) {
    const key = method?.toUpperCase() as HttpMethod | undefined;
    return key ? this.routes[key]?.[route] ?? null : null;
  }
}
