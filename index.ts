import {
  deployValueLedger,
  getValueLedgerInfo,
  getBalance,
  transferValue
} from "./src/example";
import { config } from "./src/config";

const btnDeployValueLedger = document.getElementById("btnDeployValueLedger");
const btnGetValueLedgerInfo = document.getElementById("btnGetValueLedgerInfo");
const btnTransferValue = document.getElementById("btnTransferValue");
const btnGetBalance = document.getElementById("btnGetBalance");
const divConsole = document.getElementById("console");

btnDeployValueLedger.addEventListener("click", async () => {
  printMessage("Starting value ledger deploy");
  const mutation = await deployValueLedger().catch(e => {
    printError(e);
  });
  if (mutation) {
    printMessage("Value ledger deploy in progress: " + mutation.id);
    printMessage("This may take a while.");
    await mutation.complete();
    printMessage("Value ledger deploy completed");
    printMessage("ValueLedger address: " + mutation.receiverId);
  }
});

btnGetValueLedgerInfo.addEventListener("click", async () => {
  if (config.valueLedgerSource === "") {
    printWarning(
      "No valueLedgerSource defined. Either deploy a new value ledger or set value ledger source in src/config.ts file."
    );
  } else {
    const info = await getValueLedgerInfo().catch(e => {
      printError(e);
    });
    if (info) {
      printMessage(info);
    }
  }
});

btnGetBalance.addEventListener("click", async () => {
  if (config.valueLedgerSource === "") {
    printWarning(
      "No valueLedgerSource defined. Either deploy a new value ledger or set value ledger source in src/config.ts file."
    );
  } else {
    const info = await getBalance().catch(e => {
      printError(e);
    });
    if (info) {
      printMessage(info);
    }
  }
});

btnTransferValue.addEventListener("click", async () => {
  if (config.valueLedgerSource === "") {
    printWarning(
      "No valueLedgerSource defined. Either deploy a new value ledger or set value ledger source in src/config.ts file."
    );
  } else {
    printMessage("Starting value transfer");
    const mutation = await transferValue().catch(e => {
      printError(e);
    });
    if (mutation) {
      printMessage("Value transfer in progress: " + mutation.id);
      printMessage("This may take a while.");
      await mutation.complete();
      printMessage("Value transfered.");
    }
  }
});

function printError(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Error: " + message;
  div.className = "error";
  divConsole.prepend(div);
}

function printWarning(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Warning: " + message;
  div.className = "warning";
  divConsole.prepend(div);
}

function printMessage(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = message;
  divConsole.prepend(div);
}
