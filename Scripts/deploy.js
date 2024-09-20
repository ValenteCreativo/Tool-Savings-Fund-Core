const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Obtener el nonce manualmente
    let nonce = await ethers.provider.getTransactionCount(deployer.address);

    const gasPrice = await ethers.provider.getGasPrice();
    const adjustedGasPrice = gasPrice.mul(2); // Ajusta según sea necesario

    const StakingToken = await ethers.getContractFactory("StakingToken");
    const stakingToken = await StakingToken.deploy("Staking Token", "STK", {
        gasPrice: adjustedGasPrice,
        nonce: nonce++, // Incrementa el nonce después de cada transacción
    });

    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy("Reward Token", "RTK", {
        gasPrice: adjustedGasPrice,
        nonce: nonce++, // Incrementa el nonce
    });

    const StakingDapp = await ethers.getContractFactory("StakingDapp");
    const stakingDapp = await StakingDapp.deploy(stakingToken.address, rewardToken.address, {
        gasPrice: adjustedGasPrice,
        nonce: nonce++, // Incrementa el nonce
    });

    console.log("Contracts deployed:");
    console.log("Staking Token:", stakingToken.address);
    console.log("Reward Token:", rewardToken.address);
    console.log("Staking Dapp:", stakingDapp.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
