<script>
    export let wrapperClassname, inputClassname, inputType, inputName;
</script>

<div class={wrapperClassname + " input-wrapper"}>
    <label for={inputName}>
        <input id={inputName} type={inputType} class={inputClassname + " input"}>
    </label>
</div>

<style>
    .input-wrapper {
        margin-bottom: 1vh;
    }

    .input {
        width: 100%;
    }
</style>