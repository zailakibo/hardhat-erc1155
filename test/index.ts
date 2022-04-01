import { expect } from "chai";
import { ethers } from "hardhat";

describe("GameNFT", function () {
  it("Should return the url metadata", async function () {
    const GameNFT = await ethers.getContractFactory("GameNFT");
    const gameNFT = await GameNFT.deploy();
    await gameNFT.deployed();

    await gameNFT.mint(1);

    expect(await gameNFT.nftCount()).to.equal("1");

    expect(await gameNFT.uri(0)).to.equal("https://nft-domain.com/0.json");
  });

  it("Should return an error", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const GameNFT = await ethers.getContractFactory("GameNFT");
    const gameNFT = await GameNFT.deploy();
    await gameNFT.deployed();

    expect(await gameNFT.nftCount()).to.equal("0");

    const err = await gameNFT.connect(addr1).uri(0).catch(e => e)
    expect(err.message).to.equal("NotFound");
  })
});
