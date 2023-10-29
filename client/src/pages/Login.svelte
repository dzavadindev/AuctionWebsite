<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {token, user} from "../store.js"
    import page from "page";

    let submissionFailed = false;
    let errorMessage;

    const assert = (condition, message) => {
        if (!condition) {
            submissionFailed = true;
            throw new Error(message);
        }
    }

    const login = async (event) => {
        const {username, password} = event.detail;
        console.log(event.detail)
        try {
            assert(username && password, "Fields can't be blank")
        } catch (err) {
            errorMessage = err.message;
            return
        }

        const response = await fetch("http://localhost:3000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event.detail)
        });
        let json = await response.json();
        token.set(json.token);
        user.set(json.user)
        page("/home")
    }

</script>

<Form header="Login" buttonClass="login-button" formClass="login-form" buttonText="Login" on:submit={login}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
    {#if submissionFailed}
        <span style="color: red">{errorMessage}</span>
    {/if}
</Form>