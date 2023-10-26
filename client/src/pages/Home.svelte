<script>
    import Item from "../components/Item.svelte";
    import {onMount} from 'svelte';
    import InputField from "../components/InputField.svelte";

    let items = [];

    onMount(async () => {
        const response = await fetch("http://localhost:3000/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        items = await response.json();
        items = items.map(item => ({ ...item, visible: true }));
    });

    const search = (event) => {
        let searchTerm = event.target.value.toLowerCase();
        items = items.map(item => {
            let matcher = item.name.toLowerCase() + item.author.toLowerCase();
            return { ...item, visible: matcher.includes(searchTerm) };
        });
    }

</script>

<section class="main-container">
    <section class="filter">
        <InputField labelText="Country" inputType="text" inputName="country"/>
        <div class="range-filter">
            <InputField labelText="Year Min" inputType="number" inputName="yearMin"/>
            <InputField labelText="Year Max" inputType="number" inputName="yearMax"/>
        </div>
        <div class="range-filter">
            <InputField labelText="Price Min" inputType="number" inputName="priceMin"/>
            <InputField labelText="Price Max" inputType="number" inputName="priceMax"/>
        </div>
    </section>
    <div class="searchbar-container">
        <input on:input={(e) => search(e)} class="searchbar" type="text" name="searchQuery" id="searchBar">
    </div>
    <div class="items-container">
        {#each items as item}
            <Item {...item}/>
        {/each}
    </div>
</section>





<style>
    .main-container {
        display: grid;
        gap: 1%;
        grid-template-columns: 1fr 4fr;
        grid-template-rows: 5vh 1fr;
    }

    .filter {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        background-color: #2277f6;
        grid-row: 1 / span 2;
    }

    .range-filter {
        display: flex;
        justify-content: space-between;
    }

    .searchbar-container {
        display: flex;
        grid-row: 1;
        grid-column: 2;
    }

    .searchbar {
        color: #000831;
        font-size: 25px;
        border: 1px solid #c3bbff;
        border-radius: 0.4em;
        outline: none;
        background-color: #e3dfff;
        width: 100%;
        padding: 0 1em;
    }

    .items-container {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, minmax(100px, 1fr));
        justify-content: space-between;
        padding: 1rem;
        flex-wrap: wrap;
        flex-direction: row;
        overflow: hidden;
        box-sizing: content-box;
        background-color: #5272c4;
        grid-row: 2;
        grid-column: 2;
    }
</style>
