<script>
    export let className, text, onClick;

</script>

<button class={className + " button"} on:click={onClick}>{text}</button>

<style>
    .button {
        width: 90px;
        height: 30px;
        background-color: green;
        padding: 0;
        margin: 0;
    }

</style>