// Requisito 7;
export const fetchProduct = async (id) => {
  if (id === undefined) {
    throw new Error('ID não informado');
  }
  const url = `https://api.mercadolibre.com/items/${id}`;
  const resposta = await fetch(url);
  const data = await resposta.json();
  // console.log(data);
  return data;
};

// Requisito 2
export const fetchProductsList = async (produto) => {
  if (produto === undefined) {
    throw new Error('Termo de busca não informado');
  }
  /*  try { */
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  const resposta = await fetch(url);
  const data = await resposta.json();
  // console.log(data);
  return data.results;
  /* } catch (e) {
    return e.message;
  } */
};
