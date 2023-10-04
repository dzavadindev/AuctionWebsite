<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";

    const register = (event) => {
        console.log(event.detail);
    }

</script>

<Form header="Register" buttonClass="register-button" formClass="register-form" on:submit={register}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Email" inputType="text" inputName="email"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
    <InputField labelText="Repeat Password" inputType="password" inputName="repeatPassword"/>
</Form>