<script lang="ts">
import Calendar from "svelte-material-icons/Calendar.svelte"
import { onMount } from "svelte"

// if the date difference is less than 3 days, we want to show something like:
// "3 hours ago", "2 days ago", "10 minutes ago", etc.

export let date: Date

function get_day_suffix(day: number) {
    switch (day % 10) {
        case 1: return "st"
        case 2: return "nd"
        case 3: return "rd"
        default: return "th"
    }
}

let now = new Date()

onMount(() => {
    setInterval(() => {
        now = new Date()
    }, 1000)
})

$: diff = now.getTime() - date.getTime()
$: diff_in_seconds = diff / 1000
$: diff_in_minutes = diff_in_seconds / 60
$: diff_in_hours = diff_in_minutes / 60
$: diff_in_days = diff_in_hours / 24

$: use_ago = diff_in_days <= 3
$: units_ago = diff_in_hours <= 1 ? "minute" : diff_in_days <= 1 ? "hour" : "day"
$: units = diff_in_hours <= 1 ? diff_in_minutes : diff_in_days <= 1 ? diff_in_hours : diff_in_days
$: ago = `${Math.ceil(units)} ${units_ago}${units > 1 ? "s" : ""} ago`

$: day_with_suffix = date.getDate() + get_day_suffix(date.getDate())
$: month = date.toLocaleString("en-us", { month: "short" })
$: year = date.getFullYear()

</script>
<div class="date">
    <Calendar size={18}/>
    {#if use_ago}
        <span>{ ago }</span>
    {:else}
        <span>{ day_with_suffix } { month } { year }</span>
    {/if}
</div>
<style lang="stylus">

.date
    display flex
    gap 8px
    align-items center
    font-size 14px
    opacity 0.5
    font-weight 600
</style>