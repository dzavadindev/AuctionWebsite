<script>
    import {createEventDispatcher} from 'svelte';
    import Button from "./Button.svelte";

    const dispatch = createEventDispatcher();
    export let header, buttonClass, buttonText, formClass;
    let form;
    const handleSubmit = () => {
        let formData = new FormData(form);
        let json = {};
        formData.forEach((value, key) => {
            json[key] = value;
        });

        dispatch('submit', json);
    }


</script>

<section class="form-container">
    <section class={formClass + " form"}>
        <h1 class="form-title">{header}</h1>
        <form bind:this={form} on:submit|preventDefault={handleSubmit} class="form">
            <slot/>
            <p class="switch-block">
                {#if header === "Login"}
                    Don't have an account? <a href="/register">Register</a>
                {:else if header === "Register"}
                    Already have an account? <a href="/login">Login</a>
                {/if}
            </p>
            <Button className={buttonClass} text={buttonText} type="submit" onClick={()=>{}}/>
        </form>
    </section>
</section>

<style>
    .form-container {
        display: flex;
        width: 100%;
        height: 80vh;
        justify-content: center;
        align-items: center;
    }

    .form-title {
        font-size: 41px;
        margin: 0 0 1vh 0;
    }

    .form {
        max-width: 20em ;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
    }

   section.filter-form {
       max-width: none;
       padding: 0;
       display: inline;
   }

    section.login-form {
        background-color: #1a48a8;
    }

    section.register-form {
        background-color: #287dfa;
    }

</style>