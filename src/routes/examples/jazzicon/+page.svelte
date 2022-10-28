<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import Jazzicon from '$lib/Jazzicon.svelte';
	import Input from '$lib/Input.svelte';
  import { onMount } from "svelte";


	export let address1: string = "";
	export let address2: string = "";

	onMount(() => {
    address1 = "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd";
    address2 = "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd";
  });
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Jazzicon</PageHeading>
	<div>
		The Jazzicon component provide an easy way to create the Icon as you wish with the address and the with as properties.
	</div>
	<ExampleHeading>Default width</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="mb-5px">
				<Jazzicon  bind:address={address1}/>
			</div>
			<div>
				<Input bind:value={address1} debounce debounceTime={100}>
					<span slot="label">Try to enter an address:</span>
				</Input>
			</div>
		</ExampleComponent>
		<ExampleUsage>{`<Jazzicon address={yourAddress} />`}</ExampleUsage>
	</Example>

	<ExampleHeading>Providing width</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="mb-5px">
				<Jazzicon bind:address={address2} width={50} />
			</div>
			<div>
				<Input bind:value={address2} debounce debounceTime={100}>
					<span slot="label">Try to enter an address:</span>
				</Input>
			</div>
		</ExampleComponent>
		<ExampleUsage>{`<Jazzicon address={yourAddress} width={desiredWidth} />`}</ExampleUsage>
	</Example>
</div>

<style>
	.mb-5px {
		margin-bottom: 5px;
	}
</style>