<script>
    import Item from "../components/Item.svelte";
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";
    import {onMount} from "svelte";

    onMount(async () => {
        itemsPromise = fetchData("http://localhost:3000/products")
    })

    const fetchData = async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    }

    const search = async (event) => {
        let searchTerm = event.target.value.toLowerCase();
        let url = `http://localhost:3000/products?searchQuery=${searchTerm}`;
        itemsPromise = await fetchData(url)
        console.log(itemsPromise)
    }

    const filter = async (event) => {
        let {country, yearMin, yearMax, priceMin, priceMax} = event.detail
        let url = "http://localhost:3000/products?";
        if (country) url += `&country=${country}`
        if (yearMin || yearMax) {
            if (yearMax && yearMin) url += `&year=${yearMin}-${yearMax}`
            if (!yearMax && yearMin) url += `&year=${yearMin}-${Number.MAX_SAFE_INTEGER}`
            if (yearMax && !yearMin) url += `&year=${Number.MAX_SAFE_INTEGER}-${yearMax}`
        }
        if (priceMin || priceMax) {
            if (priceMax && priceMin) url += `&price=${priceMin}-${priceMax}`
            if (!priceMax && priceMin) url += `&price=${priceMin}-${Number.MAX_SAFE_INTEGER}`
            if (priceMax && !priceMin) url += `&price=${Number.MAX_SAFE_INTEGER}-${priceMax}`
        }
        itemsPromise = fetchData(url);
    }

    let itemsPromise = fetchData("http://localhost:3000/products");
</script>

<section class="main-container">
    <section class="filter">
        <Form header="Filters" buttonClass="filter-button" formClass="filter-form" buttonText="Filter"
              on:submit={filter}>
            <InputField labelText="Country" inputType="text" inputName="country" className="filter-field"/>
            <div class="range-filter">
                <InputField labelText="Year Min" inputType="number" inputName="yearMin" className="filter-field"/>
                <InputField labelText="Year Max" inputType="number" inputName="yearMax" className="filter-field"/>
            </div>
            <div class="range-filter">
                <InputField labelText="Price Min" inputType="number" inputName="priceMin" className="filter-field"/>
                <InputField labelText="Price Max" inputType="number" inputName="priceMax" className="filter-field"/>
            </div>
        </Form>
    </section>
    <div class="searchbar-container">
        <input on:input={search} class="searchbar" type="text" name="searchQuery" id="searchBar"
               placeholder="Search">
    </div>
    <div class="items-container">
        {#await itemsPromise}
            <p>Loading...</p>
        {:then items}
            {#each items as item}
                <Item {...item}/>
            {/each}
        {:catch error}
            <p>Error loading items: {error.message}</p>
        {/await}
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
        background-color: #2f53e1;
        grid-row: 1 / span 2;
    }

    .range-filter {
        display: flex;
        justify-content: space-between;
    }

    .range-filter :global(.form-field-container) {
        margin: 0 0.08em;
    }

    .searchbar-container {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        color: #000;
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
