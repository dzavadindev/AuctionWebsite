<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {token, user} from "../store.js"
    import page from "page"

    let submissionFailed = false;
    let errorMessage;

    const assert = (condition, message) => {
        if (!condition) {
            submissionFailed = true;
            throw new Error(message);
        }
    }

    const register = async (event) => {
        const {username, email, password, repeatPassword} = event.detail;
        let validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
        submissionFailed = false;

        try {
            assert(username && email && password && repeatPassword, "Fields can't be blank")
            assert(validEmail, "Email must be of valid format. Ex.: jhon@gmail.com")
            assert(password === repeatPassword, "Password and repeat password must match")
        } catch (err) {
            errorMessage = err.message;
            return
        }

        const res = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password})
        })
        const json = await res.json();

        token.set(json.token);
        user.set(json.user);

        page("/home")
    }

</script>

<Form header="Register" buttonClass="register-button" buttonText="Register" formClass="register-form"
      on:submit={register}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Email" inputType="text" inputName="email"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
    <InputField labelText="Repeat Password" inputType="password" inputName="repeatPassword"/>
    {#if submissionFailed}
        <span style="color: red">{errorMessage}</span>
    {/if}
</Form>