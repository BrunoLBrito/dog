const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const says = document.querySelector('p')

const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition

let speech = new SpeechRecognition()

if ('SpeechRecognition' in window) {
	speech.continuous = true
	speech.interimResults = true
	speech.start()

	let playerState = 'levanta'
	const playerImage = new Image()
	playerImage.src = 'shadow_dog.png'

	const statesDog = [
		'levanta',
		'pula',
		'voando',
		'corre',
		'tonto',
		'deitado',
		'rola',
		'late',
		'morto',
		'dança',
	]

	const spriteWidth = 575
	const spriteHeight = 523

	let gameFrame = 0
	const staggerFrames = 5
	const spriteAnimations = []
	const animationStates = [
		{
			name: 'levanta',
			frames: 7,
		},
		{
			name: 'pula',
			frames: 7,
		},
		{
			name: 'voando',
			frames: 7,
		},
		{
			name: 'corre',
			frames: 9,
		},
		{
			name: 'tonto',
			frames: 11,
		},
		{
			name: 'deitado',
			frames: 5,
		},
		{
			name: 'rola',
			frames: 7,
		},
		{
			name: 'late',
			frames: 7,
		},
		{
			name: 'morto',
			frames: 12,
		},
		{
			name: 'dança',
			frames: 4,
		},
	]

	animationStates.forEach((state, index) => {
		let frames = {
			loc: [],
		}

		for (let j = 0; j < state.frames; j++) {
			let positionX = j * spriteWidth
			let positionY = index * spriteHeight

			frames.loc.push({ x: positionX, y: positionY })
		}

		spriteAnimations[state.name] = frames
	})

	function animation() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

		let position =
			Math.floor(gameFrame / staggerFrames) %
			spriteAnimations[playerState].loc.length

		let frameX = spriteWidth * position
		let frameY = spriteAnimations[playerState].loc[position].y

		ctx.drawImage(
			playerImage,
			frameX,
			frameY,
			spriteWidth,
			spriteHeight,
			0,
			0,
			spriteWidth,
			spriteHeight
		)

		// if (timer % staggerFrames === 0) {
		// 	frameX = (frameX + 1) % 7
		// }
		gameFrame++
		requestAnimationFrame(animation, canvas)
	}

	speech.onresult = e => {
		// console.log(e)
		let transcript = e.results[e.results.length - 1][0].transcript
			.toLowerCase()
			.replace(/\s/g, '')

		if (statesDog.includes(transcript)) {
			playerState = transcript
			says.innerHTML = transcript
		}

		// switch (transcript) {
		// 	case 'levanta':
		// 		playerState = 'levanta'
		// 		break
		// 	case 'pula':
		// 		playerState = 'pula'
		// 		break
		// }
		console.log(e.results[e.results.length - 1][0].transcript)
	}

	animation()
}
