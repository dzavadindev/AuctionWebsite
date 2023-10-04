<script>
    import {createEventDispatcher} from 'svelte';
    import Button from "./Button.svelte";

    const dispatch = createEventDispatcher();
    export let header, buttonClass, formClass;
    let form;
    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData(form);
        let json = {};
        formData.forEach((value, key) => {
            json[key] = value;
        });

        dispatch('submit', json);
    }


</script>

<section class="form-container">
    <section class={formClass}>
        <h1 class="form-title">{header}</h1>
        <form bind:this={form} on:submit={handleSubmit} class="form">
            <slot/>
            <Button className={buttonClass} text="Register" type="submit" onClick={()=>{}}/>
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

    section.login-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5vh 3vw;
        background-color: gold;
    }

    section.register-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5vh 3vw;
        background-color: gold;
    }

</style>