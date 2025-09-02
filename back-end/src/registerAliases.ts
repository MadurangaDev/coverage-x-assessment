import path from "path";
import moduleAlias from "module-alias";

const distRoot = path.resolve(__dirname);

moduleAlias.addAliases({
  "@": distRoot,
  "@configs": path.join(distRoot, "configs"),
  "@controllers": path.join(distRoot, "controllers"),
  "@middlewares": path.join(distRoot, "middlewares"),
  "@routes": path.join(distRoot, "routes"),
  "@services": path.join(distRoot, "services"),
  "@utils": path.join(distRoot, "utils"),
  "@enums": path.join(distRoot, "types", "enums"),
  "@interfaces": path.join(distRoot, "types", "interfaces"),
  "@responses": path.join(distRoot, "types", "interfaces", "responses"),
  "@requests": path.join(distRoot, "types", "interfaces", "requests"),
});


