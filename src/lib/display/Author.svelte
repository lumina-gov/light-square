<script lang="ts">

export let author: {
    name: string
    src: string
}

</script>
<div class="author">
    <img src="{author.src}" alt="{author.name} profile picture" class="author_img">
    <div class="author_info">
        <div class="by">
            By
        </div>
        <div class="author_name">
            {author.name}
        </div>
    </div>
</div>
<style lang="stylus">
@import 'variables'

.author
    display flex
    flex-direction row
    gap 8px
    align-items center
    font-size 16px

.author_img
    width 32px
    height 32px
    border-radius 100px

.author_name
    font-weight 600

.author_info
    display flex
    align-items center
    gap 4px

.by
    font-weight 500
    opacity 0.5
</style>