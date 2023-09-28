<script>

    export let className, username, bid;

</script>

<div class={className + " bid-container"}>
    <p class="username">{username}</p>
    <p class="bid-amount">{bid}</p>
</div>

<style>
    .bid-container {
        display: flex;
        padding: 0.5em 1em;
        flex-direction: row;
        justify-content: space-between;
        background-color: grey;
    }

    .username {

    }

    .bid-amount {
    }
</style>