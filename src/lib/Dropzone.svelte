<script lang="ts">
    let fi: HTMLInputElement;
    export let selectedFiles: File[] | undefined = [];
    export let filter: string = "*/*";

    let isDraggingOver = false;

    function handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
        selectedFiles = [...e.currentTarget.files];
    }

    function handleDragOver(e: DragEvent) {
        let input = fi;
        e.stopPropagation();
        e.preventDefault();
        if (
            e.dataTransfer.items.length > 0 &&
            ((e.dataTransfer.items.length > 1 &&
                Array.from(input.attributes)
                    .map(w => w.name)
                    .includes("multiple")) ||
                e.dataTransfer.items.length == 1) /* &&
                !Array.from(input.attributes).map(w => w.name).includes("multiple")*/
        ) {
            if (Array.from(e.dataTransfer.items).every(item => item.type.includes("image/"))) {
                isDraggingOver = true;

                e.dataTransfer.dropEffect = "copy";
            } else {
                e.dataTransfer.dropEffect = "none";
            }
        } else {
            e.dataTransfer.dropEffect = "none";
        }
    }

    function handleDragExit(e: DragEvent) {
        e.stopPropagation();
        e.preventDefault();
        isDraggingOver = false;
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        let input = fi;
        if (
            e.dataTransfer.items.length > 0 &&
            ((e.dataTransfer.items.length > 1 &&
                Array.from(input.attributes)
                    .map(w => w.name)
                    .includes("multiple")) ||
                e.dataTransfer.items.length == 1)
        ) {
            if (Array.from(e.dataTransfer.items).every(item => item.type.includes("image/"))) {
                isDraggingOver = false;
                selectedFiles = [...e.dataTransfer.files];
            }
        }
    }
</script>

<label
    id="dropzone"
    tabindex="0"
    on:keydown={event => {
        if (event.key == "Enter") event.currentTarget.click();
    }}
    role="button"
    on:dragover={handleDragOver}
    on:dragexit={handleDragExit}
    on:drop={handleDrop}
    class:draggingover={isDraggingOver}
>
    <input type="file" bind:this={fi} on:input={handleInput} accept={filter} tabindex="-1" />
    <span>Drag a file here or click to pick a file</span>
</label>

<style>
    #dropzone {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 5rem;
        border: 2px dashed var(--ridge-color);
        border-radius: 1rem;
        transition-duration: var(--big-element-transition-duration);
    }
    #dropzone:hover,
    #dropzone.draggingover {
        border-color: var(--primary-color);
        min-height: 6rem;
    }
    #dropzone span {
        color: var(--disabled-color);
        font-size: 0.8rem;
        margin: auto;
        transition-duration: var(--big-element-transition-duration);
    }
    #dropzone:hover span,
    #dropzone.draggingover span {
        color: black;
        font-size: 1rem;
    }
    input[type="file"] {
        display: none;
    }

    input {
        border: 2px solid var(--ridge-color);
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    input:focus {
        border-color: var(--primary-color);
    }
</style>
