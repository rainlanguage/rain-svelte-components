<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import Pills from '$lib/Pills.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { CheckBadge, ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Input from '$lib/Input.svelte';

	export let color: string = "purple";
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Pills</PageHeading>
	<ExampleHeading>General use</ExampleHeading>
	<div class="dark:text-white">
		You can specify anything inside the pills with your own styles, icons and text.
	</div>
	<Example>
		<ExampleComponent>
			<div class="flex space-x-1 mb-2">
				<Pills>ERC20</Pills>
				<Pills>
					<Icon src={CheckBadge} class="mr-2" />
					ERC20
				</Pills>
				<Pills>
					<Icon src={CheckBadge} theme={"solid"} class="mr-2" />
					ERC20
				</Pills>
			</div>
		</ExampleComponent>
		<ExampleUsage>
{`<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckBadge } from '@steeze-ui/heroicons';
</script>

<Pills> ERC20 </Pills>

<Pills>
	<Icon src={CheckBadge}class="mr-2" />
	ERC20
</Pills>

<Pills>
	<Icon src={CheckBadge} theme={"solid"} class="mr-2" />
	ERC20
</Pills>
`}
		</ExampleUsage>
	</Example>
	
	<ExampleHeading>Size</ExampleHeading>
	<div class="dark:text-white">
		There are two sizes availables for the pills, the regular size is used by default.
	</div>
	<Example>
		<ExampleComponent>
			<div class="flex space-x-2 mb-3 w-max items-center">
					<Pills size={"regular"}>
						<Icon src={ExclamationCircle} class="mr-2" />
						ERC20
					</Pills>
				<Pills size={"larger"}>
					<Icon src={ExclamationCircle} class="mr-2" />
					ERC20
				</Pills>
			</div>
		</ExampleComponent>
		<ExampleUsage>
{`<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
</script>

<Pills size={"regular"}>
	<Icon src={ExclamationCircle} class="mr-2" />
	ERC20
</Pills>

<Pills size={"larger"}>
	<Icon src={ExclamationCircle} class="mr-2" />
	ERC20
</Pills>
`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Color</ExampleHeading>
	<div class="dark:text-white">
		You can select a color from a list of predefined colors (gray, purple, blue, green, red and yellow).
	</div>
	<Example>
		<ExampleComponent>
			<div class="flex space-x-2 mb-3 w-max items-center">
				<Pills {color}>
					<Icon src={CheckBadge} class="mr-2" />
					ERC20
				</Pills>
				<Pills {color}>
					<Icon src={CheckBadge} theme={"solid"} class="mr-2" />
					ERC20
				</Pills>
			</div>
			<div>
				<Input bind:value={color} debounce debounceTime={100}>
					<span slot="label">Try to enter a color:</span>
				</Input>
			</div>
		</ExampleComponent>
		<ExampleUsage>
{`<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckBadge } from '@steeze-ui/heroicons';
</script>

<Pills color={"${color}"}>
	<Icon src={CheckBadge} class="mr-2" />
	ERC20
</Pills>

<Pills color={"${color}"}>
	<Icon src={CheckBadge} theme={"solid"} class="mr-2" />
	ERC20
</Pills>
`}
		</ExampleUsage>
	</Example>

</div>
