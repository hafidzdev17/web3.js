// Disabling because returnTypes must be last param to match 1.x params
/* eslint-disable default-param-last */
import { DataFormat, DEFAULT_RETURN_FORMAT } from 'web3-common';
import {
	SupportedProviders,
	Web3Context,
	Web3ContextInitOptions,
	Web3Subscription,
} from 'web3-core';
import { Address, Bytes, Filter, HexString32Bytes, HexString8Bytes, Numbers } from 'web3-utils';
import * as rpcMethods from './rpc_methods';
import * as rpcMethodsWrappers from './rpc_method_wrappers';
import { BlockNumberOrTag, SendTransactionOptions, Transaction, TransactionCall } from './types';
import { Web3EthExecutionAPI } from './web3_eth_execution_api';
import {
	LogsSubscription,
	NewPendingTransactionsSubscription,
	NewHeadsSubscription,
	SyncingSubscription,
	LogArguments,
	Web3DataEvent,
} from './web3_subscriptions';

enum SubscriptionNames {
	logs = 'logs',
	newPendingTransactions = 'newPendingTransactions',
	newHeads = 'newHeads',
	syncing = 'syncing',
	newBlockHeaders = 'newBlockHeaders',
	pendingTransactions = 'pendingTransactions',
}

type SomeSubscription =
	| LogsSubscription
	| NewPendingTransactionsSubscription
	| NewHeadsSubscription
	| SyncingSubscription;

type Callback = (error: Error | null, result: any) => void;

export class Web3Eth extends Web3Context<Web3EthExecutionAPI> {
	public constructor(providerOrContext: SupportedProviders<any> | Web3ContextInitOptions) {
		super(providerOrContext);
		this.setRegisteredSubscriptions({
			logs: LogsSubscription,
			newPendingTransactions: NewPendingTransactionsSubscription,
			newHeads: NewHeadsSubscription,
			syncing: SyncingSubscription,
			pendingTransactions: NewPendingTransactionsSubscription, // the same as newPendingTransactions. just for support API like in version 1.x
			newBlockHeaders: NewHeadsSubscription, // the same as newHeads. just for support API like in version 1.x
		});
	}

	public async getProtocolVersion() {
		return rpcMethods.getProtocolVersion(this.requestManager);
	}

	public async isSyncing() {
		return rpcMethods.getSyncing(this.requestManager);
	}

	public async getCoinbase() {
		return rpcMethods.getCoinbase(this.requestManager);
	}

	public async isMining() {
		return rpcMethods.getMining(this.requestManager);
	}

	public async getHashRate<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getHashRate(this, returnFormat);
	}

	public async getGasPrice<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getGasPrice(this, returnFormat);
	}

	public async getAccounts() {
		return rpcMethods.getAccounts(this.requestManager);
	}

	public async getBlockNumber<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getBlockNumber(this, returnFormat);
	}

	public async getBalance<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		address: Address,
		blockNumber: BlockNumberOrTag = this.defaultBlock,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getBalance(this, address, blockNumber, returnFormat);
	}

	public async getStorageAt(
		address: Address,
		storageSlot: Numbers,
		blockNumber: BlockNumberOrTag = this.defaultBlock,
	) {
		return rpcMethodsWrappers.getStorageAt(this, address, storageSlot, blockNumber);
	}

	public async getCode(address: Address, blockNumber: BlockNumberOrTag = this.defaultBlock) {
		return rpcMethodsWrappers.getCode(this, address, blockNumber);
	}

	public async getBlock<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		block: HexString32Bytes | BlockNumberOrTag = this.defaultBlock,
		hydrated = false,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getBlock(this, block, hydrated, returnFormat);
	}

	public async getBlockTransactionCount<
		ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
	>(
		block: HexString32Bytes | BlockNumberOrTag = this.defaultBlock,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getBlockTransactionCount(this, block, returnFormat);
	}

	public async getBlockUncleCount<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		block: HexString32Bytes | BlockNumberOrTag = this.defaultBlock,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getBlockUncleCount(this, block, returnFormat);
	}

	public async getUncle<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		block: HexString32Bytes | BlockNumberOrTag = this.defaultBlock,
		uncleIndex: Numbers,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getUncle(this, block, uncleIndex, returnFormat);
	}

	public async getTransaction<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		transactionHash: Bytes,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getTransaction(this, transactionHash, returnFormat);
	}

	public async getPendingTransactions<
		ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
	>(returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat) {
		return rpcMethodsWrappers.getPendingTransactions(this, returnFormat);
	}

	public async getTransactionFromBlock<
		ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
	>(
		block: HexString32Bytes | BlockNumberOrTag = this.defaultBlock,
		transactionIndex: Numbers,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getTransactionFromBlock(
			this,
			block,
			transactionIndex,
			returnFormat,
		);
	}

	public async getTransactionReceipt<
		ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
	>(transactionHash: Bytes, returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat) {
		return rpcMethodsWrappers.getTransactionReceipt(this, transactionHash, returnFormat);
	}

	public async getTransactionCount<
		ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
	>(
		address: Address,
		blockNumber: BlockNumberOrTag = this.defaultBlock,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getTransactionCount(this, address, blockNumber, returnFormat);
	}

	public async sendTransaction<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		transaction: Transaction,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
		options?: SendTransactionOptions,
	) {
		return rpcMethodsWrappers.sendTransaction(this, transaction, returnFormat, options);
	}

	public async sendSignedTransaction<
		ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
	>(transaction: Bytes, returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat) {
		return rpcMethodsWrappers.sendSignedTransaction(this, transaction, returnFormat);
	}

	// TODO address can be an address or the index of a local wallet in web3.eth.accounts.wallet
	// https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html?highlight=sendTransaction#sign
	public async sign(message: Bytes, address: Address) {
		return rpcMethodsWrappers.sign(this, message, address);
	}

	public async signTransaction(transaction: Transaction) {
		return rpcMethodsWrappers.signTransaction(this, transaction);
	}

	// TODO Decide what to do with transaction.to
	// https://github.com/ChainSafe/web3.js/pull/4525#issuecomment-982330076
	public async call(
		transaction: TransactionCall,
		blockNumber: BlockNumberOrTag = this.defaultBlock,
	) {
		return rpcMethodsWrappers.call(this, transaction, blockNumber);
	}

	public async estimateGas<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		transaction: Transaction,
		blockNumber: BlockNumberOrTag = this.defaultBlock,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.estimateGas(this, transaction, blockNumber, returnFormat);
	}

	public async getPastLogs<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		filter: Filter,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getLogs(this, filter, returnFormat);
	}

	public async getWork() {
		return rpcMethods.getWork(this.requestManager);
	}

	public async submitWork(
		nonce: HexString8Bytes,
		hash: HexString32Bytes,
		digest: HexString32Bytes,
	) {
		return rpcMethods.submitWork(this.requestManager, nonce, hash, digest);
	}

	// TODO - Format addresses
	public async requestAccounts() {
		return rpcMethods.requestAccounts(this.requestManager);
	}

	public async getChainId<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getChainId(this, returnFormat);
	}

	public async getNodeInfo() {
		return rpcMethods.getNodeInfo(this.requestManager);
	}

	public async getProof<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		address: Address,
		storageKey: Bytes,
		blockNumber: BlockNumberOrTag = this.defaultBlock,
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getProof(this, address, storageKey, blockNumber, returnFormat);
	}

	public async getFeeHistory<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		blockCount: Numbers,
		newestBlock: BlockNumberOrTag = this.defaultBlock,
		rewardPercentiles: Numbers[],
		returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
	) {
		return rpcMethodsWrappers.getFeeHistory(
			this,
			blockCount,
			newestBlock,
			rewardPercentiles,
			returnFormat,
		);
	}

	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
	private getSubscribeInputArguments(
		args: LogArguments | Callback | undefined,
		cb: Callback | undefined,
	): { options: LogArguments; callBack?: Callback } {
		if (typeof cb === 'function') {
			return { options: args as LogArguments, callBack: cb };
		}
		if (typeof args === 'function') {
			return { options: {} as LogArguments, callBack: args };
		}
		return {
			options: args as LogArguments,
		};
	}

	public async subscribe(
		name: keyof typeof SubscriptionNames,
		args?: LogArguments | Callback | undefined,
		cb?: Callback,
	): Promise<SomeSubscription> {
		const { callBack, options } = this.getSubscribeInputArguments(args, cb);

		const subscription = (await this.subscriptionManager?.subscribe(
			name,
			options ?? {},
		)) as Web3Subscription<any>;
		if (typeof callBack === 'function') {
			subscription.on('data', (data: any) => callBack(null, data));
			subscription.on('error', (error: Error) => callBack(error, null));
		}
		if (
			subscription &&
			name === SubscriptionNames.logs &&
			typeof options === 'object' &&
			options.fromBlock &&
			Number.isFinite(Number(options.fromBlock))
		) {
			setImmediate(() => {
				this.getPastLogs({ fromBlock: String(options.fromBlock) })
					.then(logs => {
						for (const log of logs) {
							subscription.emit(Web3DataEvent.data, log);
						}
					})
					.catch(e => {
						subscription.emit(Web3DataEvent.error, e);
					});
			});
		}

		return subscription as SomeSubscription;
	}

	private static shouldClearSubscription({ sub }: { sub: unknown }): boolean {
		return !(sub instanceof SyncingSubscription);
	}

	public clearSubscriptions(notClearSyncing = false): Promise<void[]> | undefined {
		return this.subscriptionManager?.unsubscribe(
			// eslint-disable-next-line
			notClearSyncing ? Web3Eth.shouldClearSubscription : undefined,
		);
	}
}
