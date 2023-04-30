<script lang="ts">
    export let option: { icon?: string; label: string; value: string };
    export let mainHovering: boolean = false;
    export let group: string;
    export let disabled: boolean = true;
</script>

<div class="option" class:main-hovering={mainHovering}>
    <input id={option.value} type="radio" name="color" value={option.value} bind:group {disabled} />
    <label
        for={option.value}
        tabindex="0"
        role="option"
        on:keydown={e => {
            console.info("itemclick");
            if (e.key === "Enter") {
                e.currentTarget.click();
            }
        }}
    >
        <img src={option.icon} alt="" />
        {option.label}
    </label>
</div>

<style>
    input {
        border: 2px solid var(--select-color);
        padding: 0.5rem;
        border-radius: 0.5rem;
    }

    .option {
        width: 100%;
        /* height: Calc(3rem + 2px); */
    }
    .option:hover label {
        padding-left: 1rem;
        padding-right: 0;
        background-color: var(--select-color);
    }

    /* .select-sim:hover .options .option { */
    /*height:22px;*/
    /*overflow:hidden;*/
    /*height: 2rem;*/
    /* } */

    .option img {
        display: inline-flex;
        max-width: 2rem;
        max-height: 2rem;
        object-fit: cover;
    }

    .option label {
        display: none;
        box-sizing: border-box;
        padding: 0.5rem 1rem;
        gap: 0.75rem;
        transition-duration: 0.2s;
        border-left: 0 solid var(--primary-color);
    }

    .option input {
        display: none;
    }

    .option input:checked + label {
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr;
        /* height: 100%; */
        align-items: center;
    }

    /*.select-sim:hover .options .option input + label {
    display: block;
    }*/

    /* .option.main-hovering {
        height: 0px;
    } */

    .option:not(.main-hovering) input:checked + label {
        height: Calc(3rem + 2px);
    }

    .option.main-hovering label {
        /*display: inline-block;*/
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr;
        height: 100%;
        align-items: center;
        height: Calc(3rem + 2px);
    }

    .option.main-hovering input:checked + label {
        border-left: 0.25rem solid var(--primary-color);
    }
</style>
