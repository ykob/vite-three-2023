export const createElements = () => {
  const contentDom = document.getElementById("content");

  if (contentDom)
    contentDom.innerHTML = `
      <img
        class="vite-logo"
        src="vite.svg"
        width="240"
        height="240"
        decoding="async"
        alt="Vite"
      />
      <div class="title">Vite + three.js</div>
    `;
}
