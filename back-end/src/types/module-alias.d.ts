declare module "module-alias" {
  export function addAliases(aliases: Record<string, string>): void;
  export function addAlias(alias: string, path: string): void;
}


