<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import DisplayAddress from '$lib/DisplayAddress.svelte';
	import Input from '$lib/Input.svelte';

	let address: string = "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd";

</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Display Address</PageHeading>
	<div></div>
	<ExampleHeading>Regular</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Input bind:value={address} debounce debounceTime={100}>
				<span slot="label">Try to enter an address:</span>
			</Input>
			<div class="pt-4">
				<strong>The address displayed: </strong>
				<DisplayAddress {address}/>
			</div>
		</ExampleComponent>
		<ExampleUsage>{`<DisplayAddress address={yourAddress}/>`}</ExampleUsage>
	</Example>
</div>