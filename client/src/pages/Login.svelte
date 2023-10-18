<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {token} from "../store.js"

    const login = async (event) => {
        const response = await fetch("http://localhost:3000/token", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response);
        let resToken = await response.json();
        console.log(resToken);
        token.set(resToken);
    }

</script>

<Form header="Login" buttonClass="login-button" formClass="login-form" buttonText="Login" on:submit={login}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
</Form>