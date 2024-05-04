const { multichain, web3 } = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = BigInt(currentTimestampInSeconds + 600);  // The Sygma bridging protocol requires ~5min time to pass
  const deployerAccounts = await web3.eth.getAccounts();
  const deployer = deployerAccounts[0]; // We will deploy from the same address (as derived from our private key) across chains

  const networkArguments = {
    sepolia: {
      args: [deployer, unlockTime],
      initData: {
        initMethodName: "setName",
        initMethodArgs: ["sepolia"],
      },
    },
    cronos: {
      args: [deployer, unlockTime],
      initData: {
        initMethodName: "setName",
        initMethodArgs: ["cronos"],
      },
    },
    holesky: {
      args: [deployer, unlockTime],
      initData: {
        initMethodName: "setName",
        initMethodArgs: ["holesky"],
      },
    },
  };

  const deploymentResult = await multichain.deployMultichain("Lock", networkArguments);
  if (deploymentResult) {
    const { transactionHash, domainIDs } = deploymentResult;
    await multichain.getDeploymentInfo(transactionHash, domainIDs);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
