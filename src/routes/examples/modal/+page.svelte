<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import HoverTooltip from '$lib/HoverTooltip.svelte';
	import Modal from '$lib/Modal.svelte';
	import Button from '$lib/Button.svelte';

	let open: boolean = false;

	const toggleModal = () => {
		open = !open;
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Modal</PageHeading>
	<ExampleHeading>Normal usage</ExampleHeading>
	<div class="dark:text-white">Bind to the open prop and set it to true to open the modal.</div>
	<Example>
		<ExampleComponent>
			<Button on:click={toggleModal}>Open modal</Button>
			<Modal bind:open>
				<div class="flex flex-col gap-y-2 w-60 ">
					<span class="text-2xl font-semibold">Some modal</span>
					<span>This is a modal, close it by clicking the button below.</span>
					<span class="self-start mt-4">
						<Button variant="primary" on:click={toggleModal}>Close me</Button>
					</span>
				</div>
			</Modal>
		</ExampleComponent>
		<ExampleUsage>
			{`
<script>
	let open: boolean = false;

	const toggleModal = () => {
		open = !open;
	};
</script>

<Modal bind:open>
	<div class="flex flex-col gap-y-2 w-60 dark:text-white">
		<span class="text-2xl font-semibold">Some modal</span>
		<span>This is a modal, close it by clicking the button below.</span>
		<span class="self-start mt-4">
			<Button variant="primary" on:click={toggleModal}>Close me</Button>
		</span>
	</div>
</Modal>
			`}
		</ExampleUsage>
	</Example>
</div>
