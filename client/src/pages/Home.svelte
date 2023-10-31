<script>
    import Item from "../components/Item.svelte";
    import {onMount} from 'svelte';
    import InputField from "../components/InputField.svelte";
    import Form from "../components/Form.svelte";

    let items = [];

    onMount(async () => {
        const response = await fetch("http://localhost:3000/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        items = await response.json();
        items = items.map(item => ({...item, visible: true}));
    });

    const search = (event) => {
        let searchTerm = event.target.value.toLowerCase();
        items = items.map(item => {
            let matcher = item.name.toLowerCase() + item.author.toLowerCase();
            return {...item, visible: matcher.includes(searchTerm)};
        });
    }

    const filter = (event) => {
        let {country} = event.detail

        let yearMin = event.detail.yearMin ? event.detail.yearMin : Number.MIN_VALUE;
        let yearMax = event.detail.yearMax ? event.detail.yearMax : Number.MAX_VALUE;
        let priceMin = event.detail.priceMin ? event.detail.priceMin : Number.MIN_VALUE;
        let priceMax = event.detail.priceMax ? event.detail.priceMax : Number.MAX_VALUE;

        items = items.map(item => {
            let yearFilter = yearMin <= item.year && yearMax >= item.year;
            let priceFilter = priceMin <= item.price && priceMax >= item.price;
            let countryFilter = item.country.includes(country);

            return {...item, visible: yearFilter && priceFilter && countryFilter};
        });
    }

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
