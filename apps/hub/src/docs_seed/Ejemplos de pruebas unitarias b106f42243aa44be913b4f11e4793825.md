# Ejemplos de pruebas unitarias

```tsx
describe('getFullName', () => {
	it('returns user full name', () => {
		const fullName = {
			name: {
				firstName: 'Name',
				middleName: 'MiddleName',
				lastName: 'LastName',
				lastName2: 'LastName2',
			},
			email: 'name@example.com',
		} as User

		const name = getFullName(fullName)

		expect(name).toEqual('Name MiddleName LastName LastName2')
	})

	it('returns user partial name', () => {
		const partialName = {
			name: {
				firstName: 'Name',
				lastName: 'LastName',
			},
		} as User

		const name = getFullName(partialName)

		expect(name).toEqual('Name LastName')
	})
})
```

```tsx
describe('useEntityToggle', () => {
	const mockMutate = vi.fn()
	const toggle = {
		mutate: mockMutate,
	} as unknown as WriteMutation<Entity>
	const mockEntity = {
		id: 'test',
		active: true,
		name: 'test',
	}

	it('call the mutation with the corresponding entity', () => {
		const { result } = renderHook(() => useEntityToggle(toggle))

		act(() => result.current.handleToggle(mockEntity))

		expect(mockMutate).toHaveBeenCalled()
	})
})
```

```tsx
vi.mock('./use-search-input')

describe('SearchInput', () => {
	const mockUseSearchInput = useSearchInput as Mock
	const filters = [
		{
			attribute: 'name',
			name: 'Name',
			placeholder: 'Filter by name',
		},
		{
			attribute: 'kind',
			name: 'Kind',
			placeholder: 'Filter by kind',
		},
	]

	it('renders', () => {
		render(<SearchInput filters={filters} />)
	})

	describe('selected option', () => {
		const selected = filters[0]
		mockUseSearchInput.mockReturnValue({ selected })

		it('render prefix', () => {
			render(<SearchInput filters={filters} />)

			expect(
				screen.getByTestId('prefix', { suggest: false }),
			).toHaveTextContent(selected.name)
		})

		it('render reset button', () => {
			render(<SearchInput filters={filters} />)

			expect(screen.getByRole('button')).toBeInTheDocument()
		})
	})
})
```