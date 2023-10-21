<script>
    import Button from "./Button.svelte";
    import page from "page";
    import token from "../store.js"

    export let active;

    const moveToRegister = () => {
        page("/register");
    }

</script>

<nav class="header">
    <h1 class="title">
        <a href="/home"><img src="/home.svg" alt=""></a>
        <span>{active}</span>
    </h1>
    {#if $token}
    <Button className="register-button" text="Register" onClick={moveToRegister}/>
    {:else }

    {/if}
</nav>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em 1em;
        margin-bottom: 1em;
        background-color: purple;
    }

    .title {
        display: flex;
        font-size: 21px;
        align-items: center;
    }
</style>