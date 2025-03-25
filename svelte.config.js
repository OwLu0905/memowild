import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			base: "/memowild",
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// If the error is about a path not starting with the base path, ignore it
				if (message.includes("does not begin with `base`")) {
					return;
				}
				// Otherwise, throw the error
				throw new Error(message);
			},
		},
	},
};

export default config;
