<script lang="ts">
  import { onMount } from "svelte";
  import { formatAddress } from "./utils";
  import GenericSkeletonLoader from "./GenericSkeletonLoader.svelte";

  export let address: string;

  $: displayAddress = address ? formatAddress(address) : "XXXX....XXXX";
</script>

<GenericSkeletonLoader show={address}>
  <span>{displayAddress}</span>
</GenericSkeletonLoader>
