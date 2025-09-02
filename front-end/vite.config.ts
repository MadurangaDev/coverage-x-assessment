import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/index.ts"),
      "@configs": path.resolve(__dirname, "src/configs/index.ts"),
      "@pages": path.resolve(__dirname, "src/pages/index.ts"),
      "@providers": path.resolve(__dirname, "src/providers/index.ts"),
      "@redux": path.resolve(__dirname, "src/redux/index.ts"),
      "@redux-slices": path.resolve(__dirname, "src/redux/slices/index.ts"),
      "@redux-actions": path.resolve(__dirname, "src/redux/actions/index.ts"),
      "@enums": path.resolve(__dirname, "src/typings/enums/index.ts"),
      "@interfaces": path.resolve(__dirname, "src/typings/interfaces/index.ts"),
      "@responses": path.resolve(
        __dirname,
        "src/typings/interfaces/responses/index.ts"
      ),
      "@requests": path.resolve(
        __dirname,
        "src/typings/interfaces/requests/index.ts"
      ),
      "@constants": path.resolve(__dirname, "src/constants/index.ts"),
      "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
      "@styles": path.resolve(__dirname, "src/assets/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@utils": path.resolve(__dirname, "src/utils/index.ts"),
    },
  },
});
