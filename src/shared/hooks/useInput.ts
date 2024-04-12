import { useState } from "react"

export const useInput = (value: string = '') => {
	const [input, setInput] = useState(value)

	const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setInput(e.target.value)
	}

	return {
		input,
		setInput,
		onChange
	}
}