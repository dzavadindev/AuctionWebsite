<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {token} from "../store.js"
    import page from "page";

    const login = async (event) => {
        const response = await fetch("http://localhost:3000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event.detail)
        });
        let resToken = await response.json();
        token.set(resToken);
        page("/home")
    }

</script>

<Form header="Login" buttonClass="login-button" formClass="login-form" buttonText="Login" on:submit={login}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
</Form>