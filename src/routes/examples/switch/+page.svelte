<script lang="ts">
	import Switch from '$lib/package/Switch.svelte';
	import ExampleComponent from '$lib/ExampleComponent.svelte';
	import ExampleUsage from '$lib/ExampleUsage.svelte';
	import Example from '$lib/Example.svelte';
	import ExampleHeading from '$lib/ExampleHeading.svelte';
</script>

<div class="flex flex-col">
	<span class="text-3xl mb-8">Switch</span>
	<ExampleHeading>Normal</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Switch />
		</ExampleComponent>
		<ExampleUsage>
			{`<script lang="ts">
			</script>
			<Input />`}
		</ExampleUsage>
	</Example>
</div>
