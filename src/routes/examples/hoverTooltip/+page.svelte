<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import HoverTooltip from '$lib/HoverTooltip.svelte';
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Hover Tooltip</PageHeading>
	<ExampleHeading>Placeholder</ExampleHeading>
		<div>
			You can provide a placeholder that will be displayed when hovering over the element.
			If no placeholder is provided, the text "Info" will be used
		</div>
	<Example>
		<ExampleComponent>
			<div class="wrapper-fixed">
				<HoverTooltip placeHolder="You mouse is hover over me">
						<svg
						class="font-black"
						width=30
						viewBox="0 0 17 17"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12.8736 2.03627L8.1775 2.08605L8.1563 0.086164L16.2844 0L16.5153 7.84998L14.5162 7.90878L14.3823 3.356L8.24266 9.49563L6.82845 8.08141L12.8736 2.03627Z"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M0 4.47501C0 2.81816 1.34315 1.47501 3 1.47501H7V3.47501H3C2.44772 3.47501 2 3.92273 2 4.47501V13.475C2 14.0273 2.44772 14.475 3 14.475H12C12.5523 14.475 13 14.0273 13 13.475V8.97501H15V13.475C15 15.1319 13.6569 16.475 12 16.475H3C1.34315 16.475 0 15.1319 0 13.475V4.47501Z"
						/>
					</svg>
				</HoverTooltip>
			</div>
		</ExampleComponent>
		<ExampleUsage>
{`<div>
	<HoverTooltip placeHolder="You mouse is hover over me">
		<img>
	</HoverTooltip>
</div>`}
		</ExampleUsage>
	</Example>
	<Example>
		<ExampleComponent>
			<div>
				<HoverTooltip placeHolder="Your text">
					Your text
				</HoverTooltip>
			</div>
		</ExampleComponent>
		<ExampleUsage>
{`<div>
	<HoverTooltip placeHolder="Your text">
		Your text
	</HoverTooltip>
</div>`}
		</ExampleUsage>
	</Example>
</div>

<style>
	.wrapper-fixed {
		width: 30px
	}
</style>