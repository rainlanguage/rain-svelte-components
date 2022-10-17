<script lang="ts">
	import Switch from '$lib/Switch.svelte';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
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
