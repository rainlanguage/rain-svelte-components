<script>
	const navigateToAnchor = () => {
		const location = window.location;
		window.location.replace(`${location.origin}${location.pathname.replace("/first-url", "#external-references")}`);
	};
</script>

<div>
  You have been redirected to the URL defined. Click
  <span
  class="aver"
    on:click={navigateToAnchor}
    on:keydown={navigateToAnchor}
  >
    here
  </span> to go back.
</div>

<style lang="postcss">
  .aver {
    @apply cursor-pointer underline underline-offset-2 hover:text-gray-500;
  }
</style>