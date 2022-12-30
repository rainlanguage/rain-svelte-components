<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import OpDocs from '$lib/parser/OpDocs.svelte';
	import { rainterpreterOpMeta } from '@rainprotocol/rainlang';
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Op Docs</PageHeading>
	<div class="dark:text-white">Use the opMeta prop to generate the docs.</div>
	<Example>
		<ExampleComponent>
			<div class="h-96">
				<OpDocs opMeta={rainterpreterOpMeta} />
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<div>
	<OpDocs {opMeta} />
</div>`}
		</ExampleUsage>
	</Example>
</div>
