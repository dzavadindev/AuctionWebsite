<script>
    export let inputType, inputName;
    export let labelText = "", inputValue = "", className = "", placeholder = "";
</script>

<div class="form-field-container">
    <label for={inputName}>
        <span class="field-label">{labelText}</span>
        {#if inputType === 'text'}
            <input type="text" class={`form-field ${className}`} bind:value={inputValue} name={inputName} {placeholder}/>
        {:else if inputType === 'password'}
            <input type="password" class={`form-field ${className}`} bind:value={inputValue} name={inputName} {placeholder}/>
        {:else if inputType === 'number'}
            <input type="number" class={`form-field ${className}`} bind:value={inputValue} name={inputName} {placeholder}/>
        {/if}
    </label>
</div>

<style>

    .field-label {
        align-self: start;
        margin-left: 1em;
        font-size: 16px;
    }

    .form-field-container {
        margin-bottom: 5%;
    }

    .form-field-container > label {
        display: flex;
        flex-direction: column;
    }

    .form-field {
        box-sizing: border-box;
        border-radius: 1em;
        outline: none;
        border: none;
        background-color: #daf0ff;
        padding: 0.3em 0.6em;
        width: 100%;
    }

    input.filter-field {
        border-radius: 0;
    }
</style>