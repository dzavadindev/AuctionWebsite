<script>
    import Button from "./Button.svelte";
    import page from "page";

    export let active;

    const moveToLogin = () => {
        page("/login");
    }

</script>

<nav class="header">
    <h1 class="title">{active}</h1>
    <Button className="login-button" text="Login" onClick={moveToLogin}/>
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
        font-size: 21px;
    }
</style>