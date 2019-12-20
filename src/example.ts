import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";
import { ValueLedger } from "@0xcert/ethereum-value-ledger";
import { config } from "./config";

// We create a new instance of metamask provider.
const provider = new MetamaskProvider(config.providerConfig);

export async function enableMetamask() {
  // We first check if metamask is already enabled.
  if (!(await provider.isEnabled())) {
    // If metamask is not enabled, we enable it.
    await provider.enable();
  }
}

export async function deployValueLedger() {
  await enableMetamask();
  const mutation = await ValueLedger.deploy(provider, {
    name: "Utility token",
    symbol: "UTT",
    decimals: "18",
    supply: "500000000000000000000000000" // 500 mio
  }).catch(e => {
    throw e;
  });
  mutation.complete().then(m => {
    config.valueLedgerSource = m.receiverId; // Address of the created smart contract.
  });
  return mutation;
}

export async function getValueLedgerInfo() {
  await enableMetamask();
  const valueLedger = ValueLedger.getInstance(
    provider,
    config.valueLedgerSource
  );
  return valueLedger.getInfo();
}

export async function getBalance() {
  await enableMetamask();
  const valueLedger = ValueLedger.getInstance(
    provider,
    config.valueLedgerSource
  );
  return valueLedger.getBalance(provider.accountId);
}

export async function transferValue() {
  await enableMetamask();
  const valueLedger = ValueLedger.getInstance(
    provider,
    config.valueLedgerSource
  );
  return valueLedger.transferValue({
    receiverId: "0xF9196F9f176fd2eF9243E8960817d5FbE63D79aa",
    value: "50000000000000000000" // 50 tokens
  });
}
