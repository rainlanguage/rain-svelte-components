<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import OpDocs from '$lib/parser/OpDocs.svelte';
	import { getOpMetaFromSg } from '@rainprotocol/rainlang';

	const opMetaPromise = getOpMetaFromSg('0x01D5611c2D6FB7Bb1bFa9df2f524196743f59F2a', 524289);
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Op Docs</PageHeading>
	<div class="dark:text-white">Use the opMeta prop to generate the docs.</div>
	<Example>
		<ExampleComponent>
			<div class="h-96">
				{#await opMetaPromise then opMeta}
					<OpDocs {opMeta} />
				{/await}
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<div>
	<OpDocs {opMeta} />
</div>`}
		</ExampleUsage>
	</Example>
</div>
