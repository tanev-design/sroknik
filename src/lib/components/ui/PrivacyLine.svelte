<script lang="ts">
  import { t } from '$lib/copy/i18n.svelte';

  interface Props {
    /** Override default with a custom string (e.g. add-flow line). */
    text?: string;
    align?: 'left' | 'center';
  }
  let { text, align = 'left' }: Props = $props();
</script>

<p
  class="text-xs text-muted {align === 'center' ? 'text-center' : ''}"
  aria-label={text ?? t.current.privacy.localOnly}
>
  {text ?? t.current.privacy.localOnly}
</p>
