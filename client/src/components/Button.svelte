<script>
    export let className = "";
    export let text;
    export let onClick = () => {
    };
    export let type = "button";

</script>

<button type={type} class={className + " button"} on:click={onClick}>{text}</button>

<style>
   button.filter-button {
       margin-top: 1em;
       background-color: #2798de;
   }

    button.bid-button {
        background-color: #5b1e70;
    }

    button.login-button {
        background-color: #116ecb;
    }

    button.register-button {
        background-color: #043d88;
    }

    button.log-out-button {
        background-color: red;
    }

    .button {
        border: none;
        border-radius: 2rem;
        outline: none;
        padding: 0.5em 1em;
        margin: 0;
        color: #f2eaff;
    }

</style>