<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import Input from '$lib/Input.svelte';
	import ProgressBar from '$lib/ProgressBar.svelte';


	let progress=10;
	let total=100;
	let color='blue';
	let height=4;
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Progress Bar</PageHeading>

	<ExampleHeading>Control progress</ExampleHeading>
	<div>
		There are values availables to control the progress that will be showed in the bar. Use the total property to determine
		the how much need the bar to be full, and use the progress property to set the current status of the bar.
	</div>
	<Example>
		<ExampleComponent>
			<ProgressBar {progress} {total}/>
			<div class="mt-10px">
				<Input bind:value={progress} debounce debounceTime={100}>
					<span slot="label">Sets the current bar progress:</span>
				</Input>
				<Input bind:value={total} debounce debounceTime={100}>
					<span slot="label">Sets the bar max:</span>
				</Input>
			</div>

		</ExampleComponent>
		<ExampleUsage>
			{`<ProgressBar progress={${progress}} total={${total}}/>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Colors</ExampleHeading>
	<div>
		The color bar can be changed using the color property on the component. By default the color is green.
	</div>
	<Example>
		<ExampleComponent>
			<ProgressBar progress={40} total={100} {color}/>
			<div class="mt-10px">
				<Input bind:value={color} debounce debounceTime={100}>
					<span slot="label">Set a color (green, blue, red, yellow):</span>
				</Input>
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<ProgressBar color="${color}"/>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Height</ExampleHeading>
	<Example>
		<ExampleComponent>
			<ProgressBar progress={40} total={100} {height}/>
			 <div class="mt-10px">
					<Input bind:value={height} debounce debounceTime={100}>
					<span slot="label">Set a height: </span>
				</Input> 
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<ProgressBar height={${height}}/>`}
		</ExampleUsage>
	</Example>

</div>

<style>
	.mb-5px {
		margin-bottom: 5px;
	}
	.mt-10px {
		margin-top: 10px;
	}
</style>