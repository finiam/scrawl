<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="w-full h-full flex justify-center items-center flex-col gap-20">
	<form action="?/signIn" method="post" use:enhance class="flex flex-col gap-4">
		<h3>Sign in</h3>

		<input
			type="text"
			name="username"
			placeholder="Username"
			class="py-2 px-4 border border-white block mt-1"
			required
		/>

		<input
			type="password"
			name="key"
			class="py-2 px-4 border border-white block mt-1"
			placeholder="Key"
			required
		/>

		<button type="submit" class="btn variant-filled">Log in</button>

		{#if form?.error}
			<p>{form.message}</p>
		{/if}

		<p>or <a href="/sign-up">sign up</a></p>
	</form>
</div>
