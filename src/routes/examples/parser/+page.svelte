<script lang="ts">
	import ExampleComponent from '$lib/ExampleComponent.svelte';
	import ExampleUsage from '$lib/ExampleUsage.svelte';
	import Example from '$lib/Example.svelte';
	import ExampleHeading from '$lib/ExampleHeading.svelte';
	import PageHeading from '$lib/PageHeading.svelte';
	import Parser from '$lib/package/parser/Parser.svelte';
	import type { StateConfig } from 'rain-sdk';

	let vmStateConfig: StateConfig;
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Parser</PageHeading>
	<ExampleHeading>Default usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Parser {vmStateConfig} />
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
