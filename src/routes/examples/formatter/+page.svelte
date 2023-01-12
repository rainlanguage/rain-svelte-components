<script>
	import Formatter from '$lib/formatter/Formatter.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { Parser } from '@rainprotocol/rainlang';
	import { arrayify, hexlify } from 'ethers/lib/utils';

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
transferSeparator: 0xfea74d0c9bf4a3c28f0dd0674db22a3d7f8bf259c56af19f4ac1e735b156974f,
mintBurnSeparator: 0xf339171dab445c29f9897dda2f42413426ee907dc7f8b52bd387bc7cf9384c6b,

/**
 * erc1155 transfers
 */
transferERC1155sList: transferSeparator,

/**
 * erc721 transfers
 */
transferERC721sList: transferSeparator,

/**
 * er20 transfers
 */
transferERC20sList: transferSeparator,

/**
 * native (gas) token transfers
 */
transferNativesList: transferSeparator,

/**
 * burns of this erc721 token
 */
burnsList: mintBurnSeparator,

/**
 * mints of this erc721 token
 */
mintsList: mintBurnSeparator,
_ _: sender-address nft-id;
`;

	let stateConfig = {
		constants: [2, 3],
		sources: [
			arrayify(
				hexlify({
					'0': 0,
					'1': 6,
					'2': 0,
					'3': 1,
					'4': 0,
					'5': 6,
					'6': 0,
					'7': 3,
					'8': 0,
					'9': 38,
					'10': 0,
					'11': 2,
					length: 12
				})
			)
		]
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Formatter</PageHeading>
	<div class="dark:text-white">
		A component that will display Rainlang in a formatted way. Pass either a raw string of the
		expression, or a StateConfig. If both props are used, the stateConfig will be ignored. If
		neither are passed, the formatter won't show at all.
	</div>
	<ExampleHeading>With raw text</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Formatter {raw} maxHeight="400px" />
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
    let raw = '_: add(2 3)'    
</script>
<Formatter {raw} />`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>With state config</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Formatter {stateConfig} />
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
    let stateConfig = ...    
</script>
<Formatter {stateConfig} />`}
		</ExampleUsage>
	</Example>
</div>
