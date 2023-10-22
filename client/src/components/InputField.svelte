<script>
    export let labelText, inputType, inputName;
    export let inputValue;
</script>

<div class="form-field-container">
    <label for={inputName}>
        <span class="field-label">{labelText}</span>
        {#if inputType === 'text'}
            <input type="text" class="form-field" bind:value={inputValue} name={inputName}/>
        {:else if inputType === 'password'}
            <input type="password" class="form-field" bind:value={inputValue} name={inputName}/>
        {:else if inputType === 'number'}
            <input type="number" class="form-field" bind:value={inputValue} name={inputName}/>
        {/if}
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