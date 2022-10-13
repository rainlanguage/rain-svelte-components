<script lang="ts">
	import Switch from '$lib/package/Switch.svelte';
	import '../app.postcss';

	let checked: boolean;
</script>

<div class:dark={checked}>
	<div class="flex justify-between p-3 bg-gray-900">
		<span class="text-gray-200 text-large">Rain component library</span>
		<Switch bind:checked />
	</div>
	<div class="bg-white dark:bg-gray-900 min-h-screen flex">
		<div class="w-56 p-4 border-r border-gray-200 flex flex-col gap-y-4">
			<a href="/" class="font-semibold">Home</a>
			<div class="flex flex-col">
				<span class="font-semibold">Forms</span>
				<a href="/examples/input">Input</a>
				<a href="/examples/switch">Switch</a>
			</div>
		</div>
		<div class="p-8 w-full">
			<slot />
		</div>
	</div>
</div>
