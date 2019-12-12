import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";

// We create a new instance of metamask provider.
const provider = new MetamaskProvider();

export async function enableMetamask() {
  // We first check if metamask is already enabled.
  if (!(await provider.isEnabled())) {
    // If metamask is not enabled, we enable it.
    await provider.enable();
  }
}
