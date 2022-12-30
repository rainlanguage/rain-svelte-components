<script>
	import Formatter from '$lib/formatter/Formatter.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { Parser } from '@rainprotocol/rainlang';
	import { arrayify, hexlify } from 'ethers/lib/utils';

	let raw = '_: add(2 3)';

	let stateConfig = {
		constants: [2, 3],
		sources: [
			arrayify(
				hexlify({
					'0': 0,
					'1': 6,
					'2': 0,
					'3': 1,
					'4': 0,
					'5': 6,
					'6': 0,
					'7': 3,
					'8': 0,
					'9': 38,
					'10': 0,
					'11': 2,
					length: 12
				})
			)
		]
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Formatter</PageHeading>
	<div class="dark:text-white">
		A component that will display Rainlang in a formatted way. Pass either a raw string of the
		expression, or a StateConfig. If both props are used, the stateConfig will be ignored. If
		neither are passed, the formatter won't show at all.
	</div>
	<ExampleHeading>With raw text</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Formatter {raw} />
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
    let raw = '_: add(2 3)'    
</script>
<Formatter {raw} />`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>With state config</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Formatter {stateConfig} />
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
    let stateConfig = ...    
</script>
<Formatter {stateConfig} />`}
		</ExampleUsage>
	</Example>
</div>
