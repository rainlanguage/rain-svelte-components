<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import Formatter from '$lib/formatter/Formatter.svelte';
	import { type Writable, writable } from 'svelte/store';
	import { getOpMetaFromSg, type ExpressionConfig } from '@rainprotocol/rainlang';

	const opMetaPromise = getOpMetaFromSg('0x01D5611c2D6FB7Bb1bFa9df2f524196743f59F2a', 524289);

	let raw = `/**
 ** Calculate the maximum number of NFTs to mint
 */
max-nfts: 100,

/**
 * Create a storage key.
 */
storage-key: hash(1234),

/**
 * Get the total number of NFTs minted
 */
total-minted: get(storage-key),

/**
 * Check if the maximum number of NFTs has been reached
 */
: ensure(less-than(total-minted max-nfts)),

/**
 * Increment the total number of NFTs minted
 */
: set(storage-key add(total-minted 1)),

/**
 * Create the ID for this NFT
 */
nft-id: add(total-minted 1),

/**
 * Get the sender of the transaction
 */
sender-address: context<0 0>(),

/**
 * Separator values
 */
transfer-separator: 0xfea74d0c9bf4a3c28f0dd0674db22a3d7f8bf259c56af19f4ac1e735b156974f,
mint-burn-separator: 0xf339171dab445c29f9897dda2f42413426ee907dc7f8b52bd387bc7cf9384c6b,

/**
 * erc1155 transfers
 */
transfer-erc1155s-list: transfer-separator,

/**
 * erc721 transfers
 */
transfer-erc721s-list: transfer-separator,

/**
 * er20 transfers
 */
transfer-erc20s-list: transfer-separator,

/**
 * native (gas) token transfers
 */
transfer-natives-list: transfer-separator,

/**
 * burns of this erc721 token
 */
burns-list: mint-burn-separator,

/**
 * mints of this erc721 token
 */
mints-list: mint-burn-separator,
_ _: sender-address nft-id;
`;

	const expressionConfig: Writable<ExpressionConfig> = writable({
		constants: [2, 3],
		sources: ['0x000d0001000d0003001b0002']
	});
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Formatter</PageHeading>
	<div class="dark:text-white">
		A component that will display Rainlang in a formatted way. Pass either a raw string of the
		expression, or an ExpressionConfig. If both props are used, the expressionConfig will be
		ignored. If neither are passed, the formatter won't show at all.
	</div>
	<ExampleHeading>With raw text</ExampleHeading>
	<Example>
		<ExampleComponent>
			{#await opMetaPromise then opMeta}
				<Formatter {raw} {opMeta} maxHeight="400px" />
			{/await}
		</ExampleComponent>
	</Example>

	<ExampleHeading>With expression config</ExampleHeading>
	<Example>
		<ExampleComponent>
			{#await opMetaPromise then opMeta}
				<Formatter {expressionConfig} {opMeta} />
			{/await}
		</ExampleComponent>
	</Example>

	<ExampleHeading>With both specified (will use raw)</ExampleHeading>
	<Example>
		<ExampleComponent>
			{#await opMetaPromise then opMeta}
				<Formatter {expressionConfig} {raw} {opMeta} maxHeight="400px" />
			{/await}
		</ExampleComponent>
	</Example>
</div>
