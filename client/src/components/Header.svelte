<script>
    import Button from "./Button.svelte";
    import page from "page";
    import {token, user} from "../store.js"

    export let active;
</script>

<nav class="header">
    <a href="/home"><img src="/home.svg" alt=""></a>
    <span style="font-size: 31px">{active}</span>
    <div class="user-data">
        {#if !$token}
            <Button className="login-button" text="Login" onClick={()=> page("/login")}/>
        {:else }
            <a href={`/account/${$user.username}`} class="email">{$user.email}</a>
        {/if}
    </div>
</nav>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em 1em;
        margin-bottom: 1em;
        background-color: #3b57be;
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