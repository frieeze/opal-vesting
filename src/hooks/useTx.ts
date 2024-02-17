import { Address } from "viem";



type UseTx = (contract: Address, user: Address) => {
    isLoading: boolean;
    error: string | null;
    claim: () => Promise<void>;
    accept: () => Promise<void>;
}

const useTx: UseTx = (contract, user) => {

    async function executeTx(fn: string) {
        console.log('executeTx', fn);
    }

    async function claim() {
        return executeTx('claim');
    }

    async function accept() {
        return executeTx('accept');
    }
    return {
        isLoading: false,
        error: null,
        claim,
        accept
    }
}

export default useTx;