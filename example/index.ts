import { z } from 'zod';
import { fetchy } from '../src';

const fetchResponseSchema = z.object({
	userId: z.number(),
	id: z.number(),
	title: z.string(),
	completed: z.string(),
});

fetchy({
	url: 'https://jsonplaceholder.typicode.com/todos/1',
	options: {},
	fetchResponseSchema,
	parsingType: 'safeParse',
});
