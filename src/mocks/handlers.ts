import { http, HttpResponse } from 'msw'

export const handlers = [
	http.get('/api/users', () => {
		return HttpResponse.json(
			{
				message: 'Mocked response',
			},
			{
				status: 202,
				statusText: 'Mocked status',
			}
		)
	}),
]
