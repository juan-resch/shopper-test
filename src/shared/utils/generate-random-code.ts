export function generateRandomCode(size: number): string {
  const possibleCaracters = '1234567890abcdefghijklmnopqrstuvwxyz'

  let code = ''

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * possibleCaracters.length)

    code = `${code}${possibleCaracters[randomIndex]}`
  }
  return code
}
