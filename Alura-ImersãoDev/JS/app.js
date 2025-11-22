function buscarOrientacoes() {
  return new Promise(resolve => {
    setTimeout(() => resolve(orientacoes), 200); 
  });
}

async function filtrar(busca) {
  const lista = await buscarOrientacoes();

  return lista.filter(o =>
    o.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    o.tema.toLowerCase().includes(busca.toLowerCase()) ||
    o.conteudo.toLowerCase().includes(busca.toLowerCase())
  );
}

document.getElementById("btn-busca").addEventListener("click", async () => {
  const termo = document.getElementById("input-busca").value.trim();

  const encontrados = await filtrar(termo);
  mostrarResultados(encontrados);
});

function mostrarResultados(lista) {
  const sec = document.getElementById("resultados");
  sec.innerHTML = "";

  if (lista.length === 0) {
    sec.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  lista.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${item.tema} • ${item.titulo}</h3>
      <p>${item.conteudo}</p>
      <a href="${item.link}" target="_blank">Saiba mais</a>
    `;

    sec.appendChild(card);
  });
}
