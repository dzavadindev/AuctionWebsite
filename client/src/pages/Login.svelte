<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {token, userEmail} from "../store.js"
    import page from "page";

    const login = async (event) => {
        const response = await fetch("http://localhost:3000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event.detail)
        });
        let json = await response.json();
        token.set(json.token);
        userEmail.set(json.email)
        page("/home")
    }

</script>

<Form header="Login" buttonClass="login-button" formClass="login-form" buttonText="Login" on:submit={login}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
</Form>