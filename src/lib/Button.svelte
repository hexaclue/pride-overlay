<button on:click><slot /></button>

<style>
    button {
        --border-color: hsl(0, 0%, 90%);
        border: 2px solid var(--border-color);
        background-color: hsl(0, 0%, 95%);
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        transition-duration: var(--small-element-transition-duration);
    }
    button:hover {
        --border-color: hsl(0, 0%, 85%);
        padding: 0.5rem 1rem;
        background-color: hsl(0, 0%, 90%);
    }
    button:active {
        --border-color: hsl(0, 0%, 75%);
        /* background-color: var(--button-bg-active); */
    }
    button:disabled {
        background-color: var(--button-bg);
        color: var(--button-fg-disabled);
    }
</style>
