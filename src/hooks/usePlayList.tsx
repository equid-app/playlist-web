import { ethers } from "ethers"
import abi from './../config/PlayListPortal.json'
const contractAddress = '0x7b812Be6fef21c0E5Ae84FFdA9679541Ed58F784'
const contractABI = abi.abi
export type PlayListDataType = {
    name: string
    description: string
    url: string
}

type UsePlayListReturnType = [
    (req: { name: string, description: string, url: string }) => Promise<void>,
    () => Promise<any>
]
const usePlayList = (): UsePlayListReturnType => {
    const createNew = async (req: { name: string, description: string, url: string }) => {
        try {
            const { ethereum }: any = window
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const playListPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                let count = await playListPortalContract.getPlayListCount();
                console.log("Retrieved total wave count...", count.toNumber());

                const newPlayListTxn = await playListPortalContract.createPlayList(req.name, req.description, req.url)
                console.log("Mining...", newPlayListTxn.hash);
                await newPlayListTxn.wait();
                console.log("Mined -- ", newPlayListTxn.hash);
                count = await playListPortalContract.getPlayListCount();
                console.log("Retrieved total playlist count...", count.toNumber());

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getContractList = async (): Promise<PlayListDataType[] | undefined> => {
        try {
            const { ethereum }: any = window
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const playListPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                let list = await playListPortalContract.getPlayListItems();
                console.log("Retrieved total playlist count...", list);
                return list;
            } else {
                console.log("Ethereum object doesn't exist!");
                return [];

            }
        } catch (error) {
            console.log(error)
        }
    }

    return [createNew, getContractList]

}

export default usePlayList;