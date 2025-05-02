// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

const plugin = require("tailwindcss/plugin");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
	content: [
		"./js/**/*.js",
		"../lib/phoenix_lit_web.ex",
		"../lib/phoenix_lit_web/**/*.*ex",
	],
	theme: {
		extend: {
			colors: {
				brand: "#FD4F00",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		// Allows prefixing tailwind classes with LiveView classes to add rules
		// only when LiveView classes are applied, for example:
		//
		//     <div class="phx-click-loading:animate-ping">
		//
		plugin(({ addVariant }) =>
			addVariant("phx-click-loading", [
				".phx-click-loading&",
				".phx-click-loading &",
			]),
		),
		plugin(({ addVariant }) =>
			addVariant("phx-submit-loading", [
				".phx-submit-loading&",
				".phx-submit-loading &",
			]),
		),
		plugin(({ addVariant }) =>
			addVariant("phx-change-loading", [
				".phx-change-loading&",
				".phx-change-loading &",
			]),
		),

		// Embeds Heroicons (https://heroicons.com) into your app.css bundle
		// See your `CoreComponents.icon/1` for more information.
		//
		plugin(({ matchComponents, theme }) => {
			const iconsDir = path.join(__dirname, "../deps/heroicons/optimized");
			const values = {};
			const icons = [
				["", "/24/outline"],
				["-solid", "/24/solid"],
				["-mini", "/20/solid"],
				["-micro", "/16/solid"],
			];
			for (const [suffix, dir] of icons) {
				for (const file of fs.readdirSync(path.join(iconsDir, dir))) {
					const name = path.basename(file, ".svg") + suffix;
					values[name] = { name, fullPath: path.join(iconsDir, dir, file) };
				}
			}
			matchComponents(
				{
					hero: ({ name, fullPath }) => {
						const content = fs
							.readFileSync(fullPath)
							.toString()
							.replace(/\r?\n|\r/g, "");
						let size = theme("spacing.6");
						if (name.endsWith("-mini")) {
							size = theme("spacing.5");
						} else if (name.endsWith("-micro")) {
							size = theme("spacing.4");
						}
						return {
							[`--hero-${name}`]: `url('data:image/svg+xml;utf8,${content}')`,
							"-webkit-mask": `var(--hero-${name})`,
							mask: `var(--hero-${name})`,
							"mask-repeat": "no-repeat",
							"background-color": "currentColor",
							"vertical-align": "middle",
							display: "inline-block",
							width: size,
							height: size,
						};
					},
				},
				{ values },
			);
		}),
	],
};
