import z from 'zod';

export type FetchyParams<T> = {
	url: string;
	options: RequestInit;
	fetchResponseSchema: z.Schema<T>;
	parsingType?: 'parse' | 'safeParse';
};

export const fetchy = async <T>(params: FetchyParams<T>) => {
	const { url, options, fetchResponseSchema, parsingType = 'parse' } = params;

	const res = await fetch(url, options);

	const data = await res.json();

	if (parsingType === 'parse') {
		const parsedData = fetchResponseSchema.parse(data);
		return parsedData;
	}

	const parsedData = fetchResponseSchema.safeParse(data);
	if (parsedData.success) return parsedData.data;
	//workaround to show safeParse error
	//@ts-ignore
	console.error((parsedParams as { error: Error }).error);
};
