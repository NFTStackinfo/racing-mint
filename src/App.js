import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Icon} from "./components/UIKit";
import {fetchData} from "./redux/data/dataActions";
import {checkRuffle, connect} from "./redux/blockchain/blockchainActions";
import {AppStyle} from "./App.style";
import Countdown from 'react-countdown';
import {isAndroid, isIOS} from "react-device-detect";
import {theme} from "./styles/theme";
import addressList from "./data";
import RunningText from './components/UIKit/RunningText/RunningText';
const {MerkleTree} = require('merkletreejs')
const keccak256 = require('keccak256')

const errorMessages = [
    'Change network to ETH.',
    'Something went wrong.'
]
const metamaskError = 'Install Metamask.'

const fixImpreciseNumber = (number) => {
    return (parseFloat(number.toPrecision(12)));
}

const truncateText = (text) => {
    return text?.substring(0, 5) + "...." + text?.substring(text.length - 4, text.length);
}

function App() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    // const [maxMintCount, setMaxMintCount] = useState(1) //comment if you need static maxMintCount
    const [mintPrice, setMintPrice] = useState(null)
    const [numberMintWallet, setNumberMintWallet] = useState(null)
    const [mintCount, setMintCount] = useState(1)
    const [maxMintCount, setMaxMintCount] = useState(null)
    const [maxTotalSupply, setMaxTotalSupply] = useState(null)
    const [totalSupply, setTotalSupply] = useState(null)
    const [connectingMobile, setConnectingMobile] = useState(false)
    const [walletConnected, setWalletConnected] = useState(false)
    const [publicMintActive, setPublicMintActive] = useState(false)
    const [fallback, setFallback] = useState("")
    const [notSelected, setNotSelected] = useState(true)
    const [loading, setLoading] = useState(false)

    const minMintCount = 1

    // uncomment if you need static maxMintCount
    // const maxMintCount = 5

    useEffect( () => {
        dispatch(checkRuffle())
    }, [])

    useEffect(async () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
            if (blockchain.account) {

              const isMintActive = await blockchain.smartContract.methods
              .isMintActive().call()
              const isRaffleActive = await blockchain.smartContract.methods
              .isRaffleActive().call()


              const price = isMintActive
                  ?  await blockchain.smartContract.methods.mintPrice().call() / 10 ** 18
                  : await blockchain.smartContract.methods.raffleMintPrice().call() / 10 ** 18
              setMintPrice(price)

              const maximumMintSupply = await blockchain?.smartContract?.methods.maximumMintSupply().call()
              setMaxTotalSupply(+maximumMintSupply)

              if(isMintActive) {
                setPublicMintActive(true)
                const publicMintMaxMint = await blockchain.smartContract.methods.maximumAllowedTokensPerWallet().call()
                setMaxMintCount(+publicMintMaxMint)

                const publicMintedWallet = await blockchain?.smartContract?.methods.publicMintClaimed(blockchain.account).call()
                setNumberMintWallet(+publicMintedWallet)
              }
              if(isRaffleActive) {
                const raffleMaxMint = await blockchain.smartContract.methods
                .allowListMaxMint().call()
                setMaxMintCount(+raffleMaxMint)

                const raffleMintedWallet = await blockchain?.smartContract?.methods.allowListClaimedBy(blockchain.account).call()
                setNumberMintWallet(+raffleMintedWallet)
              }

              if(!isMintActive && !isRaffleActive) {
                return setFallback("The minting is closed")
              }
              if (totalSupply > maxTotalSupply) {
                return setFallback("No more NFTs are left to mint for this stage.")
              }

              const getTotalSupply = await blockchain?.smartContract?.methods
              .getTotalSupply()
              .call()

              setTotalSupply(Number(getTotalSupply))

                const root = await blockchain?.smartContract?.methods.getRoot().call()
                let tree

                const createMerkleTree = () => {
                    const leaves = addressList.map(v => keccak256(v))
                    tree = new MerkleTree(leaves, keccak256, { sort: true })
                }

                const getRoot = () => {
                    return tree.getHexRoot()
                }

                setWalletConnected(true)


                createMerkleTree()
                const localRoot = getRoot()
                const account = await blockchain.account

              //uncomment this for seeing root in console
              console.table([localRoot, root]);

              if (root === localRoot && addressList.includes(account) || publicMintActive) {
                setNotSelected(false)
              }
            }
        }
    }, [blockchain.smartContract, totalSupply, maxMintCount, blockchain.account, maxTotalSupply,  dispatch]);

    useEffect(() => {
        setConnectingMobile(true)

        setFallback('')
        if (blockchain.errorMsg && errorMessages.includes(blockchain.errorMsg)) {
            setFallback(blockchain.errorMsg)
        }
        if(blockchain.errorMsg === metamaskError && !(isIOS || isAndroid)) {
            window.location.replace('https://metamask.app.link/dapp/mint.racingsocialclub.com')
        }
    }, [blockchain.errorMsg])

    const openMobileMetamask = () => {
      if (typeof window.ethereum === "undefined") {
        if (
            (connectingMobile && !walletConnected && (isIOS || isAndroid)) ||
            blockchain.errorMsg === metamaskError
        ) {
          window.location.replace(
              "https://metamask.app.link/dapp/mint.racingsocialclub.com"
          )
        }
      }
    }

    const normalizeMintCount = count =>
        count > maxMintCount
            ? maxMintCount
            : count < minMintCount
                ? minMintCount
                : count

    const handleConnectWallet = async () => {
      dispatch(connect(false))
      openMobileMetamask()
    }

    const claimNFTs = async (_amount) => {
        setLoading(true)
        let tree

        const createMerkleTree = () => {
            const leaves = addressList.map(v => keccak256(v))
            tree = new MerkleTree(leaves, keccak256, { sort: true })
        }

        const getProof = (address) => {
            const leaf = keccak256(address)
            return tree.getHexProof(leaf)
        }

        createMerkleTree()

        const isMintActive = await blockchain.smartContract.methods.isMintActive().call();
        const isRaffleActive = await blockchain.smartContract.methods.isRaffleActive().call();
        const mint = isMintActive
            ? await blockchain.smartContract.methods.mint(blockchain.account, _amount)
            : isRaffleActive
                ? await blockchain.smartContract.methods.raffleMint(
                    _amount,
                    getProof(blockchain.account)
                )
                : null

        if (mint) {
            // const mintPrice = await blockchain.smartContract.methods?.mintPrice().call() / 10 ** 18

          const balance = await blockchain.web3.eth.getBalance(
              blockchain.account,
              async (err, result) => {
                return blockchain.web3.utils.fromWei(result, "ether")
              }
          )
          const roundedBalance = balance / 10 ** 18
          if (roundedBalance < fixImpreciseNumber(_amount * mintPrice)) {
            setLoading(false)
            return setFallback(
                `You don’t have enough funds to mint! Please, make sure to have ${fixImpreciseNumber(
                    _amount * mintPrice
                )} ETH + gas.`
            )
          }
          if (roundedBalance) setLoading(false)
          mint
          .send({
            from: blockchain.account,
            value: blockchain.web3.utils.toWei(
                fixImpreciseNumber(mintPrice * _amount).toString(),
                "ether"
            ),
          })
          .once("error", err => {
            if (err.code === -32000 || err.code === "-32000") {
              setFallback(
                  "Insufficient funds, please add funds to your wallet and try again"
              )
            } else {
              setFallback("Sorry, something went wrong please try again")
            }
          })
          .then(receipt => {
            setFallback("Thanks! You have successfully minted.")
          })
        } else {
            setLoading(false)
            setFallback('The mint is not open yet.')
        }

    }

  const handleMint = (e, count) => {
    e.preventDefault()
    setFallback("")
    claimNFTs(count)
  }

    const renderer = ({ days, hours, minutes, seconds, completed, milliseconds }) => {
      if(days === 0 && hours === 0 && seconds === 0 && milliseconds === 0 && minutes === 10) {
        window.location.reload(true)
      }
        if (completed) {
            // Render a completed state
            return <>

                {walletConnected && notSelected && !publicMintActive ? (
                        <>
                            <p className='text'>Unfortunately you have not been selected to mint.</p>
                            {blockchain.account && <p className='yellow-text'>Wallet Address - ${truncateText(blockchain.account)}</p> }
                            <Button
                                href='https://racingsocialclub.com/'
                                withIcon={false}
                                className='mt-24'
                            >
                                BACK TO  HOME PAGE
                            </Button>
                        </>
                    ) : walletConnected &&
                  notSelected === false &&
                  totalSupply <= maxTotalSupply ? (
                        <>
                            <h2 className='title'>Mint</h2>
                            {!publicMintActive && <p className='text'>Congrats! You have been selected to mint.</p>}
                            {publicMintActive && <p className='text'>Supply: {totalSupply} / {maxTotalSupply}</p>}
                            {blockchain.account && <p className='yellow-text'>Wallet Address - ${truncateText(blockchain.account)}</p> }
                            <div className="mint-content">
                                <div className="mint-input">
                                    <Icon
                                        name="minus"
                                        size={24}
                                        color={theme.colors.white}
                                        onClick={() => setMintCount(normalizeMintCount(mintCount - 1))}
                                        className={mintCount === minMintCount ? 'disabled' : ''}
                                    />
                                    <strong>{mintCount}</strong>
                                    <Icon
                                        name="plus"
                                        size={24}
                                        color={theme.colors.white}
                                        onClick={() => setMintCount(normalizeMintCount(mintCount + 1))}
                                        className={mintCount + numberMintWallet >= maxMintCount ||
                                        mintCount + totalSupply >= maxTotalSupply ? 'disabled' : ''}
                                    />
                                </div>

                                <Button
                                    withIcon={false}
                                    className="btn-mint"
                                    isLoading={loading}
                                    onClick={e => handleMint(e, mintCount)}
                                >
                                    Mint
                                </Button>
                            </div>
                            {fallback && <p className="warn-text">{fallback}</p>}
                        </>
                    ) : (
                    <>
                        <h2 className='title'>Mint</h2>
                        <p className='text'>Connect your wallet to mint.</p>
                        <Button
                            as='button'
                            withIcon={false}
                            onClick={handleConnectWallet}
                            isLoading={blockchain.loading}
                        >
                            CONNECT WALLET
                        </Button>
                        {fallback && <p className="warn-text">{fallback}</p>}
                      {/*<h2 className='title'>SOLD OUT</h2>*/}
                    </>
                )
                }
            </>;
        } else {
            // Render a countdown
            return <div>
                {blockchain.registerMessage ? (
                    <>
                        <h2 className='title'>REGISTERed Successfully</h2>
                        <p className='text'>Check back in {days} days {hours} hours {minutes} minutes {seconds} seconds to see if you were selected to mint.</p>
                    </>
                ) : (
                    <>
                        <h2>REGISTER FOR RAFFLE</h2>
                        <p className='text'>The registration is free and registering is only available with metamask wallet. <br/> Registration period ends in {days} days {hours} hours {minutes} minutes {seconds} seconds.</p>
                        <p className='yellow-text'>You need to have 0.18 ETH + gas fee to participate in Raffle.</p>
                        <Button
                            as='button'
                            withIcon={false}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(connect(true));
                                openMobileMetamask();
                            }}
                        >
                            REGISTER
                        </Button>
                        <p>{fallback}</p>
                    </>
                )
                }
            </div>
        }
    };

    return (
        <AppStyle>
            <header>
              <div className="running-text-wrapper">
                <RunningText image="/assets/running" withFlag />
              </div>
            </header>
            <section>
                <div className="content">
                    <Countdown
                        // date={'2022-06-24T12:35:55'}
                        date={1656511200000}
                        renderer={renderer}
                    />
                </div>
            </section>
            <footer />
        </AppStyle>
    )
}

export default App
