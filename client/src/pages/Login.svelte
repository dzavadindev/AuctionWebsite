<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {token} from "../store.js"

    const login = async (event) => {
        const res = (await fetch("https://localhost:3000/token"), {
            method: "GET"
        }).json()
        console.log(res)
        token.set(res);
    }

</script>

<Form header="Login" buttonClass="login-button" formClass="login-form" on:submit={login}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
</Form>