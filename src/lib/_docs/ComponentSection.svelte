<script lang="ts">
	export let title: string = '';
</script>

<div class="">
	<h1 class="text-2xl border-b border-gray-400 dark:border-gray-700 pb-2 mb-8 dark:text-gray-200">
		{title}
	</h1>
	<span>
		<slot />
	</span>
</div>
