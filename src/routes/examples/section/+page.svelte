<script lang="ts">
	import { Section, SectionBody, SectionHeading } from '$lib/section';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Section</PageHeading>
	<div class="max-w-prose flex flex-col gap-y-4">
		<div>Simple component for creation sections on a page.</div>
	</div>
	<ExampleHeading>Normal</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Section>
				<SectionHeading>Section heading</SectionHeading>
				<SectionBody>Section body</SectionBody>
			</Section>
		</ExampleComponent>
		<ExampleUsage>
			{`<Section>
    <SectionHeading>Section heading</SectionHeading>
    <SectionBody>Section body</SectionBody>
</Section>`}
		</ExampleUsage>
	</Example>
</div>
