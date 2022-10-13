<script lang="ts">
	import ExampleComponent from '$lib/ExampleComponent.svelte';
	import Input from '$lib/package/Input.svelte';
	import ExampleUsage from '$lib/ExampleUsage.svelte';
	import Example from '$lib/Example.svelte';
	import ExampleHeading from '$lib/ExampleHeading.svelte';
</script>

<div class="flex flex-col">
	<span class="text-3xl mb-8">Input</span>
	<ExampleHeading>With validation</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Input>
				<span slot="label">Name</span>
				<span slot="description">Description</span>
			</Input>
		</ExampleComponent>
		<ExampleUsage>
			{`<script lang="ts">
			</script>
			<Input />`}
		</ExampleUsage>
	</Example>
</div>
