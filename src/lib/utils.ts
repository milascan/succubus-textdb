import { pack as en, unpack as de } from "msgpackr";

export const encode = (data: unknown) => new Uint8Array(en(data));
export const decode = (buffer: Uint8Array) => de(buffer);

export const request_data = async (request: Request) => {
  const buffer = await request.arrayBuffer();
  return decode(new Uint8Array(buffer));
};

export const transfer = (data: unknown, opts: ResponseInit = {}) =>
  new Response(encode(data), {
    ...opts,
    headers: {
      "Content-Type": "application/octet-stream",
      ...(opts.headers ?? {}),
    },
  });

export const sort_str = (a: string, b: string) => a < b ? -1 : a === b ? 0 : 1;
export const sort_num = (a: number, b: number) => a - b;
