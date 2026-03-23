export function withBasePath(p: string) {
  const basePath =
    (process.env.__NEXT_ROUTER_BASEPATH as string | undefined) ?? "";
  if (!basePath) return p;
  if (p === "/") return basePath || "/";
  if (p === basePath || p.startsWith(`${basePath}/`)) return p;
  if (p.startsWith("/")) return `${basePath}${p}`;
  return `${basePath}/${p}`;
}
