import { Address } from "viem";
import { useWriteContract } from "wagmi"

import vestingABI from '@/abi/vesting';
import { toast } from 'react-toastify';


type UseTx = (contract: Address, user: Address) => {
    status: "error" | "pending" | "idle" | "success";
    error: string | null;
    claim: () => Promise<void>;
    accept: () => Promise<void>;
}

const useTx: UseTx = (contract) => {
    const { status, writeContractAsync } = useWriteContract();
    async function executeTx(fn: 'acceptLock' | 'release') {
        const promise = writeContractAsync({
            address: contract,
            abi: vestingABI,
            functionName: fn,
        })

        toast.promise(promise, {
            pending: `Sending transaction...`,
            success: `Transaction sent successfully`,
            error: `Transaction failed`
        })

    }

    async function claim() {
        return executeTx('release');
    }

    async function accept() {
        return executeTx('acceptLock');
    }
    return {
        status,
        error: null,
        claim,
        accept

    }
}

export default useTx;