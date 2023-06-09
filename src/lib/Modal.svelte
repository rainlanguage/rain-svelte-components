<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	// https://github.com/sveltejs/kit/issues/5879#issuecomment-1268973672
	const browser = !import.meta.env?.SSR ?? typeof window !== 'undefined';
	export let open: boolean = true;
	export let disableOutsideClickClose: boolean = false;
	let modalWrapper: HTMLDivElement, modalInner: HTMLDivElement;

	onMount(() => {
		document.body.appendChild(modalWrapper);
	});

	const closeModal = ({ target }: Event) => {
		if (!disableOutsideClickClose) if (target == modalInner) open = false;
	};

	$: if (browser) document.body.classList.toggle('overflow-y-hidden', open);
</script>

<div class="z-50" bind:this={modalWrapper}>
	{#if open}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			transition:fade={{ duration: 100 }}
			on:click={closeModal}
			bind:this={modalInner}
			class="fixed flex items-center justify-center w-screen h-full bg-black bg-opacity-40 inset-0"
		>
			<div
				in:fly={{ y: 30, duration: 400 }}
				class="bg-white rounded-lg p-8 shadow-md dark:bg-gray-900 dark:text-white"
			>
				<slot />
			</div>
		</div>
	{/if}
</div>
