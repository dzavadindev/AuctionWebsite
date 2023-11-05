<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {token, user} from "../store.js"
    import page from "page";
    import {FontAwesomeIcon} from '@fortawesome/svelte-fontawesome';
    import {faSpinner} from '@fortawesome/free-solid-svg-icons';

    let submissionFailed = false, loading = false;
    let errorMessage;

    const assert = (condition, message) => {
        if (!condition) {
            submissionFailed = true;
            throw new Error(message);
        }
    }

    const login = async (event) => {
        const {username, password} = event.detail;
        try {
            assert(username && password, "Fields can't be blank")
        } catch (err) {
            errorMessage = err.message;
            return
        }

        loading = true;


        const response = await fetch("http://localhost:3000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event.detail)
        });
        let json = await response.json();

        if (!response.ok) {
            submissionFailed = true;
            errorMessage = json.error;
            loading = false;
            return
        }

        token.set(json.token);
        user.set(json.user)

        page("/home")
    }

</script>

{#if loading}
    <section class="loading-wrapper">
        <FontAwesomeIcon icon={faSpinner} class="fa-spin"/>
    </section>
{:else}
    <Form header="Login" buttonClass="login-button" formClass="login-form" buttonText="Login" on:submit={login}>
        <InputField labelText="Username" inputType="text" inputName="username"/>
        <InputField labelText="Password" inputType="password" inputName="password"/>
        {#if submissionFailed}
            <span style="color: #93b4ff">{errorMessage}</span>
        {/if}
    </Form>
{/if}

<style>
    .loading-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        width: 100%;
    }
</style>