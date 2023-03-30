<script lang="ts">
	import type { ExpressionConfig, RDProblem } from '@rainprotocol/rainlang';
	import type { Writable } from 'svelte/store';
	import RainlangEditor from './RainlangEditor.svelte';

	export let expressionConfig: Writable<ExpressionConfig>;
	export let raw: string;
	export let errors: RDProblem[] = [];
	export let readOnly: boolean = false;
	export let opMeta: string;
</script>

<RainlangEditor bind:expressionConfig bind:raw bind:errors bind:readOnly bind:opMeta />
