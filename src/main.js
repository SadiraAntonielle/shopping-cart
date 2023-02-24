import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Requisito 4, ajuda da Maysa na monitoria dia 17/11 as 09h00
const textoCarregando = () => {
  const buscandoTagMae = document.body;
  const criandoTag = document.createElement('h3');
  criandoTag.innerHTML = 'carregando...';
  criandoTag.className = 'loading';
  buscandoTagMae.appendChild(criandoTag);
};

// Requisito 4, ajuda da Maysa na monitoria dia 17/11 as 09h00
const removendoTagCarregando = () => {
  const buscandoTag = document.querySelector('.loading');
  buscandoTag.remove();
};

// Requisito 5, ajuda da Maysa na monitoria dia 17/11 as 09h00
const mensagemDeErro = () => {
  const buscandoTagMae = document.body;
  const criandoTag = document.createElement('h3');
  criandoTag.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  criandoTag.className = 'error';
  buscandoTagMae.appendChild(criandoTag);
};

// Requisito 3
// Pedro (Sincero) ajudou na mentoria dia 16/11 as 19h00 feita juntamente com outros colegas
const pegandoItens = async () => {
  textoCarregando();
  try {
    const produtoLista = await fetchProductsList('computador');
    const criandoElemento = document.querySelector('.products');
    produtoLista.forEach((itens) => {
      const resultadoLista = createProductElement(itens);
      criandoElemento.appendChild(resultadoLista);
    });
  } catch (erro) {
    mensagemDeErro();
  }
  removendoTagCarregando();
};

// Requisito 9, ajuda na monitoria com Maysa dia 18/11 as 09h00
const salvandoItensLocalStorage = async () => {
  const chamandoFuncaoGet = getSavedCartIDs(); // chamando a funcão importada que possui os ids
  // console.log(chamandoFuncaoGet);
  const criandoNovoArray = chamandoFuncaoGet.map((id) => fetchProduct(id));
  const produtos = await Promise.all(criandoNovoArray);
  // console.log(produtos);
  produtos.forEach((produto) => {
    const chamandoTag = document.querySelector('.cart__products');
    chamandoTag.appendChild(createCartProductElement(produto));
  });
};

pegandoItens();
salvandoItensLocalStorage();
