<script>
    export let labelText, inputType, inputName;
</script>

<div class="form-field-container">
    <label for={inputName}>
        <span class="field-label">{labelText}</span>
        <input type={inputType} class="form-field" name={inputName}>
    </label>
</div>

<style>

    .field-label {
        font-size: 21px;
    }

    .form-field-container {
        margin-bottom: 5%;
    }

    .form-field {
        width: 100%;
    }

</style>