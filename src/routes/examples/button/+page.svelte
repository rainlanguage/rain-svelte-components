<script lang="ts">
	import Button from '$lib/package/Button.svelte';
	import ExampleComponent from '$lib/ExampleComponent.svelte';
	import ExampleUsage from '$lib/ExampleUsage.svelte';
	import Example from '$lib/Example.svelte';
	import ExampleHeading from '$lib/ExampleHeading.svelte';
	import PageHeading from '$lib/PageHeading.svelte';

	let _status = "OFF";

  const handleClick = async () => {
    _status = _status == "OFF" ? "ON" : "OFF";
  };

</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Button</PageHeading>

	<ExampleHeading>Normal</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button>Press</Button>
		</ExampleComponent>
		<ExampleUsage>
			{`<script lang="ts">
			</script>
			<Input />`}
		</ExampleUsage>
	</Example>


	<ExampleHeading>Small</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button small>Press</Button>
		</ExampleComponent>
		<ExampleUsage>
			{`<script lang="ts">
			</script>
			<Input />`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Shrink</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button shrink>Press</Button>
		</ExampleComponent>
		<ExampleUsage>
			{`<script lang="ts">
			</script>
			<Input />`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Disabled</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button small disabled=true>Press</Button>
		</ExampleComponent>
		<ExampleUsage>
			{`<script lang="ts">
			</script>
			<Input />`}
		</ExampleUsage>
	</Example>
	
	<ExampleHeading>With click event</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button small on:click={handleClick}>Press</Button>
			<div class="pt-4">On/off: {_status}</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<script lang="ts">
			</script>
			<Input />`}
		</ExampleUsage>
	</Example>
</div>
