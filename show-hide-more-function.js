<script>
    $(function () {
		// show more text, change link name to See Less
        $('.extend-link-more').on('click', function () {
            const $this = $(this); // See More link
            const $nextBtn = $this.next(); // See Less link
            const $nextPpg = $this.parent().next(); // Next paragraph

            $this.toggle(0); // hide See More link
            $nextBtn.toggle(0); // show See Less link
            $nextPpg.toggle(200); // show next paragraph
        });

        // hide more text, change link name to See More
        $('.extend-link-less').on('click', function () {
            const $this = $(this); // See Less link
            const $prevBtn = $this.prev(); // See More link
            const $nextPpg = $this.parent().next(); // Next paragraph

            $this.toggle(0); // hide See Less link
            $prevBtn.toggle(0); // show See More link
            $nextPpg.toggle(200); // hide next paragraph
        });

        // focused element triggers click
        $(document).keypress(function (event) {
            if (event.keyCode == 13) {
                $(":focus").click();
            }
        });
    });
</script>

<style>
	.extend-link-more,
	.extend-link-less {
		cursor: pointer;
	}
	.extend,
	.extend-link-less {
		display: none;
	}
</style>

<html>
	<p>
		random stuff here
		<span class="extend-link-more">see more</span><span class="extend-link-less">see less</span>
	</p>
	<p class="extend">
		more random stuff here
	</p>
</html>
