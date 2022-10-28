<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import FormPanel from '$lib/FormPanel.svelte';

// TODO: Check other props from this
</script>
<div class="flex flex-col gap-y-4">
	<PageHeading>Form panel</PageHeading>
	<div></div>
	<ExampleHeading>Heading prop</ExampleHeading>
	<Example>
		<ExampleComponent>
			<FormPanel heading="Your heading text"></FormPanel>
		</ExampleComponent>
		<ExampleUsage>{`<FormPanel heading="Your heading text"></FormPanel>`}</ExampleUsage>
	</Example>
</div>