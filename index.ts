import { enableMetamask } from "./src/example";

const btnEnableMetamask = document.getElementById("btnEnableMetamask");

btnEnableMetamask.addEventListener("click", async () => {
  await enableMetamask();
});
