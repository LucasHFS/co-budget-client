export function formatDate(inputDate: string){
  const date = new Date(inputDate);

  return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

export function parseDate(inputDate: string){
  const dateSplitted = inputDate.split('-')

  const year = parseInt(dateSplitted[0])
  //@ts-ignore
  const month = parseInt(dateSplitted[1] - 1)
  const day = parseInt(dateSplitted[2])

  return new Date(year,month,day);
}

export function ptBrToDDMMYYY(inputDate: string){
  const dateSplitted = inputDate.split('/')

  const day = parseInt(dateSplitted[0])
  //@ts-ignore
  const month = parseInt(dateSplitted[1] - 1)
  const year = parseInt(dateSplitted[2])

  return `${year}-${month}-${day}`
}
