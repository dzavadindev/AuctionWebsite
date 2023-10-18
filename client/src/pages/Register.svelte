<script>
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";

    const register = async (event) => {
        // frontend checks
        const {repeatPassword, ...data} = event.detail;
        const res = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
    }

</script>

<Form header="Register" buttonClass="register-button" buttonText="Register" formClass="register-form" on:submit={register}>
    <InputField labelText="Username" inputType="text" inputName="username"/>
    <InputField labelText="Email" inputType="text" inputName="email"/>
    <InputField labelText="Password" inputType="password" inputName="password"/>
    <InputField labelText="Repeat Password" inputType="password" inputName="repeatPassword"/>
</Form>