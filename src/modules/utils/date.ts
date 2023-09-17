export function formatDate(inputDate: string | number | Date){
  let date;

  if(typeof inputDate == Date.name.toLowerCase())
    date = inputDate
  else
    date = new Date(inputDate);

  // @ts-ignore
  return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

export function parseDate(inputDate: string){
  if (!inputDate)
    return
  const dateSplitted = inputDate.split('-')

  const year = parseInt(dateSplitted[0])
  //@ts-ignore
  const month = parseInt(dateSplitted[1] - 1)
  const day = parseInt(dateSplitted[2])

  return new Date(year,month,day);
}
