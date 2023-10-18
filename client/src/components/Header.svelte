<script>
    import Button from "./Button.svelte";
    import page from "page";

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
    <Button className="register-button" text="Register" onClick={moveToRegister}/>
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