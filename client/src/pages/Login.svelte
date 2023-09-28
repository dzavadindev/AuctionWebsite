<script>
    import InputField from "../components/InputField.svelte";
    import Button from "../components/Button.svelte";

    const login = () => {
        // send login request
    }

</script>

<section class="form-container">
    <section class="login-form">
        <h1 class="form-title">Login</h1>
        <InputField wrapperClassname="form-field-container"
                    inputClassname="form-field"
                    inputType="text"
                    inputName="username"/>
        <InputField wrapperClassname="form-field-container"
                    inputClassname="form-field"
                    inputType="password"
                    inputName="password"/>
        <Button className="login-button" text="Login" onClick={login}/>
    </section>
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