import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


export default defineConfig({
	server: {
		port: 3000,
		open: true,
		proxy: {
			"/api": {
				target: "https://localhost:5001",
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	},
	resolve: {
		alias: [
			{
				find: "@components",
				replacement: path.resolve(__dirname, "src/components"),
			},
			{
				find: "@styles",
				replacement: path.resolve(__dirname, "src/styles"),
			},
			{
				find: "@pages",
				replacement: path.resolve(__dirname, "src/pages"),
			},
			{
				find: "@controllers",
				replacement: path.resolve(__dirname, "src/controllers"),
			},
			{
				find: "@utils",
				replacement: path.resolve(__dirname, "src/utils"),
			},
			{
				find: "@hooks",
				replacement: path.resolve(__dirname, "src/hooks"),
			},
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "src/assets"),
			},
			{
				find: "@auth",
				replacement: path.resolve(__dirname, "src/auth"),
			},
		],
	},
	plugins: [react()],
});
