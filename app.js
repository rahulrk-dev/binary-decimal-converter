const input = document.querySelector('#in')
const output = document.querySelector('#out')
const h1 = document.querySelector('.title')
const radioBtn = document.querySelectorAll('.radioBtn')
let mode = 0

const dec2bin = (number) => {
	const binFact = gen2FactArr(50)
	const res = binFact
		.filter((n) => n <= number)
		.reverse()
		.map((n) => (number >= n ? 1 && 1 ** (number -= n) : 0))

	return res.join('')
}

const bin2dec = (number) => {
	const binFact = gen2FactArr(50)
	const res = binFact
		.filter((_, n) => number.length > n)
		.reverse()
		.filter((n, i) => number.split('')[i] === '1' && n)
		.reduce((t, n) => (t += n), 0)

	return res
}

const handleInputChange = (e) => {
	const max = parseInt(e.target.getAttribute('max'))
	const min = parseInt(e.target.getAttribute('min'))
	const currentInput = e.data
	const numberToConvert = e.target.value
	if (currentInput > max || currentInput < min) {
		input.value = numberToConvert.slice(0, -1)
		return false
	}

	output.innerText =
		mode === '1' ? bin2dec(numberToConvert) : dec2bin(numberToConvert)
}

const handleModeChange = (e) => {
	input.value = output.innerText = ''
	mode = e.target.value
	const title =
		mode === '1'
			? 'Binary<sub>2</sub> to Decimal<sub>10</sub>'
			: 'Decimal<sub>10</sub> to Binary<sub>2</sub>'

	h1.innerHTML = title

	mode === '1'
		? (input.setAttribute('min', 0), input.setAttribute('max', 1))
		: (input.removeAttribute('min'), input.removeAttribute('max'))
}

const gen2FactArr = (n) => {
	let arr = []
	for (let i = 0; i < n; i += 1) {
		arr.push(2 ** i)
	}
	return arr
}

input.addEventListener('input', handleInputChange)

radioBtn.forEach((node) => node.addEventListener('change', handleModeChange))
