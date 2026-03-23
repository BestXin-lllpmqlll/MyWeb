const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const githubRepo = process.env.GITHUB_REPOSITORY ?? "";
const repoParts = githubRepo.split("/");
const owner = repoParts[0] ?? "";
const repo = repoParts[1] ?? "";
const isUserOrOrgPagesRepo = owner !== "" && repo === `${owner}.github.io`;
const derivedBasePath =
  isGithubActions && repo !== "" && !isUserOrOrgPagesRepo ? `/${repo}` : "";
const basePath =
  typeof process.env.NEXT_PUBLIC_BASE_PATH === "string"
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : derivedBasePath;

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

module.exports = nextConfig;
