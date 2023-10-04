<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";

    const login = (event) => {
        console.log(event.detail);
    }

</script>

<Form header="Login" buttonClass="login-button" formClass="login-form" on:submit={login}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
</Form>