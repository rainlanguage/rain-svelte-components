<script>
	export let checked = false;
	export let color = '#2196F3';
</script>

<div class="flex flex-col gap-y-2">
	{#if $$slots.label}
		<div class=" text-gray-500 dark:text-gray-200 text-sm font-medium">
			<slot name="label" />
		</div>
	{/if}
	{#if $$slots.description}
		<span class="text-gray-600 dark:text-gray-400 text-sm">
			<slot name="description" />
		</span>
	{/if}
	<label class="switch" style="--theme-color: {color}">
		<input type="checkbox" bind:checked on:change />
		<span class="slider" />
	</label>
</div>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 45px;
		height: 24px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 20px;
		width: 20px;
		left: 2px;
		bottom: 2px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: var(--theme-color);
	}

	input:checked + .slider {
		box-shadow: 0 0 1px var(--theme-color);
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(21px);
		-ms-transform: translateX(21px);
		transform: translateX(21px);
	}
</style>
