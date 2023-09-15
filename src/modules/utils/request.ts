export function formatedErrorsArray(err: any) {
  console.error(err)
  const errorsArray = err?.response?.data?.errors;

  if (Array.isArray(errorsArray)) {
    return errorsArray;
  } else if (errorsArray) {
    return Object.entries(errorsArray).map((value) => {
      return value.join(" ");
    });
  } if (err?.response?.data?.error) {
    if(err?.response?.data?.error.message)
      return [err?.response?.data?.error.message]

      return ["Erro Interno do Servidor!"];
  }
  else {
    return ["Erro Interno do Servidor!"];
  }
}
