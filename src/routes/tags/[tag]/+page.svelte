<script lang="ts">
import Heading from "$lib/display/Heading.svelte"
import type { PageData } from "./$types"

export let data: PageData
</script>

<Heading>{ data.tag.title }</Heading>
<div class="posts">
    {#each data.posts as post}
        <a href="/news/{post.slug}" class="post">
            <h2>{post.title}</h2>
        </a>
    {/each}
</div>