import React, { useEffect } from 'react'

type ConnectEthereumWalletReturnType = [
    boolean,
    string | undefined,
    () => void
]
const useConnectEthereumWallet = (): ConnectEthereumWalletReturnType => {
    const [isConnected, setIsConnected] = React.useState(false)
    const [currentAccount, setCurrentAccount] = React.useState<string | undefined>(undefined)
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum }: any = window;
            // checkin if etherium is available
            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return true;
            } else {
                // checkin if wa are authenticated
                const accounts = await ethereum?.request({ method: 'eth_accounts' });
                if (accounts && accounts.length > 0) {
                    setCurrentAccount(accounts[0])
                    console.log("Found and authrozied account: ", accounts);
                } else {
                    console.log("Please authrozied metamask!");
                }
                setIsConnected(true)
            }
        } catch (error) {
            setIsConnected(false)
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum }: any = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    //implement logout

    /*
    * This runs our function when the page loads.
    */
    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])


    return [isConnected, currentAccount, connectWallet]
}

export default useConnectEthereumWallet;