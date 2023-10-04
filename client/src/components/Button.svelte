<script>
    export let className;
    export let text;
    export let onClick = () => {};
    export let type = "button";

</script>

<button type={type} class={className + " button"} on:click={onClick}>{text}</button>

<style>
    button.bid-button {
        background-color: pink;
    }

    button.login-button {

    }

    button.register-button {

    }

    .button {
        width: 90px;
        height: 30px;
        background-color: green;
        padding: 0;
        margin: 0;
    }

</style>