async function request<T>(
	url: RequestInfo | URL,
	init?: RequestInit
): Promise<T> {
	const req = await fetch(url, init);
	return await req.json();
}

export const api = {
	get: <T>(url: RequestInfo | URL) => request<T>(url),
	post: <T>(url: RequestInfo | URL, options: RequestInit) =>
		request<T>(url, options),
	put: <T>(url: RequestInfo | URL, options: Record<string, any>) =>
		request<T>(url, {
			method: 'put',
			body: JSON.stringify(options)
		})
};
