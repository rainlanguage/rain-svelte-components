<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '$lib/tabs/tabs';
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Tabs</PageHeading>
	<ExampleHeading id="normal">Normal</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Tabs>
				<TabList>
					<Tab>First Tab</Tab>
					<Tab>Second Tab</Tab>
					<Tab>Third Tab</Tab>
				</TabList>

				<TabPanel>
					<h2>The first tab is activated</h2>
				</TabPanel>

				<TabPanel>
					<h2>The second tab is activated</h2>
				</TabPanel>

				<TabPanel>
					<h2>The third tab is activated</h2>
				</TabPanel>
			</Tabs>
		</ExampleComponent>
		<ExampleUsage>
			{`
<Tabs>
	<TabList>
		<Tab>First Tab</Tab>
		<Tab>Second Tab</Tab>
		<Tab>Third Tab</Tab>
	</TabList>

	<TabPanel>
		<h2>The first tab is activated</h2>
	</TabPanel>

	<TabPanel>
		<h2>The second tab is activated</h2>
	</TabPanel>

	<TabPanel>
		<h2>The third tab is activated</h2>
	</TabPanel>
</Tabs>
`}
		</ExampleUsage>
	</Example>

	<ExampleHeading id="external-references">External references</ExampleHeading>
	<div class="dark:text-white">
		You can provide an url to the Tab with the href property. This will redirect the app to the page
		defined.
	</div>
	<Example>
		<ExampleComponent>
			<Tabs>
				<TabList>
					<Tab href="/examples/tabs/first-url">Click and redirect to First URL</Tab>
				</TabList>
			</Tabs>
		</ExampleComponent>

		<ExampleUsage>
			{`
<Tabs>
	<TabList>
		<Tab href="/examples/tabs/first-url" >Click and redirect to First URL</Tab>
	</TabList>
</Tabs>
`}
		</ExampleUsage>
	</Example>
</div>

<style>
	.mb-5px {
		margin-bottom: 5px;
	}
</style>
