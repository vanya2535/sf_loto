export const intValidator = (e) => {
  if (
    /[^0-9\s]/.test(e.target.value + e.key) &&
    !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(
      e.key
    )
  ) {
    e.preventDefault()
  }
}
