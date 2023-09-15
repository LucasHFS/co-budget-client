export function isEmpty(value: string|undefined|null){
  return (value === null || value === undefined || value.trim() === '')
}

export function isNotEmpty(value: string|undefined|null){
  return (value !== null && value !== undefined && value.trim() !== '')
}
