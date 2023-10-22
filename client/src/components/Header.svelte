<script>
    import Button from "./Button.svelte";
    import page from "page";
    import {token, userEmail} from "../store.js"

    export let active;

    const moveToLogin = () => {
        page("/login");
    }

</script>

<nav class="header">
    <h1 class="title">
        <a href="/home"><img src="/home.svg" alt=""></a>
        <span>{active}</span>
    </h1>
    {#if !$token}
        <Button className="login-button" text="Login" onClick={moveToLogin}/>
    {:else }
        <span class="email">{$userEmail}</span>
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

    .email {
        margin: 0;
        padding: 0;
    }

    .title {
        margin: 0;
        display: flex;
        font-size: 21px;
        align-items: center;
    }
</style>