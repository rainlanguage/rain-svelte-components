<script lang="ts">
	import Switch from '$lib/package/Switch.svelte';
	import ExampleComponent from '$lib/ExampleComponent.svelte';
	import ExampleUsage from '$lib/ExampleUsage.svelte';
	import Example from '$lib/Example.svelte';
	import ExampleHeading from '$lib/ExampleHeading.svelte';
	import PageHeading from '$lib/PageHeading.svelte';
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Switch</PageHeading>
	<ExampleHeading>Normal</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Switch />
		</ExampleComponent>
		<ExampleUsage>here</ExampleUsage>
	</Example>
</div>
