<script>
import {PODCAST_ICONS_FILE_NAMES} from "../constants";


let className = ''
let fileName

$: fileName = PODCAST_ICONS_FILE_NAMES[icon]

export let icon
export { className as class }
</script>

<img class={className} src={`/images/podcasts/${fileName}.svg`} alt="{icon} podcast service icon" />
