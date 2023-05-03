<script lang="ts">
    import { NoteType } from "./types/noteTypes";

    export let type: NoteType = NoteType.INFO;
</script>

<div class:err={type == NoteType.ERROR} class:warn={type == NoteType.WARNING}>
    <slot />
</div>

<style>
    div {
        box-sizing: border-box;
        padding: 0.5rem;
        background-color: hsl(0, 0%, 95%);
        border-radius: 0 0.5rem 0.5rem 0;
        border-left: 0.25rem solid hsl(0, 0%, 90%);
    }
    .warn {
        border-left: 0.25rem solid hsl(35, 100%, 50%);
    }
    .err {
        border-left: 0.25rem solid hsl(0, 90%, 60%);
    }
</style>
