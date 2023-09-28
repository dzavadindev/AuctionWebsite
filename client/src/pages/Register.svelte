<script>
    import InputField from "../components/InputField.svelte";
    import Button from "../components/Button.svelte";

    const register = () => {
        // send register request
    }

</script>

<section class="register-form">
    <InputField wrapperClassname="form-field-container"
                inputClassname="form-field"
                inputType="text"
                inputName="email"/>
    <InputField wrapperClassname="form-field-container"
                inputClassname="form-field"
                inputType="password"
                inputName="password"/>
    <InputField wrapperClassname="form-field-container"
                inputClassname="form-field"
                inputType="password"
                inputName="repeatPassword"/>
    <Button className="register-button" text="Register" onClick={register}/>
</section>

<style>
    .form-container {
        display: flex;
        width: 100%;
        height: 80vh;
        justify-content: center;
        align-items: center;
    }

    .login-form {
        display: flex;
        padding: 5vh 3vw;
        flex-direction: column;
        align-items: center;
        background-color: gold;
    }

    .form-title {
        font-size: 41px;
        margin: 0 0 1vh 0;
    }

    .form-field-container {
        display: flex;
    }

    .form-field {
        display: flex;
    }

    .login-button {

    }
</style>