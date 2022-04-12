import { Block, DataFormat } from 'web3-common';
import { BlockTags, Bytes, Numbers } from 'web3-utils';

import { BlockNumberOrTag } from '../../../../src/types';
import { returnFormats } from './return_formats';

const mockRpcResponse: Block = {
	parentHash: '0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54',
	sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
	miner: '0xbb7b8287f3f0a933474a79eae42cbca977791171',
	stateRoot: '0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d',
	transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
	receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
	logsBloom:
		'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
	difficulty: '0x4ea3f27bc',
	number: '0x1b4',
	gasLimit: '0x1388',
	gasUsed: '0x1c96e73',
	timestamp: '0x55ba467c',
	extraData: '0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32',
	mixHash: '0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843',
	nonce: '0x1c11920a4',
	totalDifficulty: '0x78ed983323d',
	size: '0x220',
	transactions: [
		'0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b',
		'0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b',
		'0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b',
	],
	uncles: [
		'0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae',
		'0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae',
		'0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae',
	],
	hash: '0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae',
	baseFeePerGas: '0x13afe8b904',
};

/**
 * Array consists of:
 * - Test title
 * - Input parameters:
 *     - block (identifier e.g. hash, block number, or BlockTag)
 *	   - uncleIndex
 */
export const testCases: [string, [Bytes | BlockNumberOrTag | undefined, Numbers]][] = [
	// blockNumber = Bytes, uncleIndex = HexString
	[
		'blockNumber = "0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", uncleIndex = "0x0"',
		['0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8', '0x0'],
	],
	[
		'blockNumber = Buffer("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", "hex"), uncleIndex = "0x0"',
		[Buffer.from('0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8', 'hex'), '0x0'],
	],
	[
		'blockNumber = Uint8Array("d5677cf67b5aa051bb40496e68ad359eb97cfbf8"), uncleIndex = "0x0"',
		[
			new Uint8Array([
				213, 103, 124, 246, 123, 90, 160, 81, 187, 64, 73, 110, 104, 173, 53, 158, 185, 124,
				251, 248,
			]),
			'0x0'
		],
	],
	// blockNumber = BlockTag, uncleIndex = HexString
	['blockNumber = BlockTags.LATEST, uncleIndex = "0x0"', [BlockTags.LATEST, '0x0']],
	['blockNumber = BlockTags.EARLIEST, uncleIndex = "0x0"', [BlockTags.EARLIEST, '0x0']],
	['blockNumber = BlockTags.PENDING, uncleIndex = "0x0"', [BlockTags.PENDING, '0x0']],
	// blockNumber = Numbers, uncleIndex = HexString
	['blockNumber = "0x4b7", uncleIndex = "0x0"', ['0x4b7', '0x0']],
	['blockNumber = 1207, uncleIndex = "0x0"', [1207, '0x0']],
	['blockNumber = "1207", uncleIndex = "0x0"', ['1207', '0x0']],
	['blockNumber = BigInt("0x4b7"), uncleIndex = "0x0"', [BigInt('0x4b7'), '0x0']],
	['blockNumber = undefined, uncleIndex = "0x0"', [undefined, '0x0']],

	// blockNumber = Bytes, uncleIndex = number
	[
		'blockNumber = "0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", uncleIndex = 0',
		['0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8, uncleIndex = 0', 0],
	],
	[
		'blockNumber = Buffer("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", "hex"), uncleIndex = 0',
		[Buffer.from('0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8', 'hex'), 0],
	],
	[
		'blockNumber = Uint8Array("d5677cf67b5aa051bb40496e68ad359eb97cfbf8"), uncleIndex = 0',
		[
			new Uint8Array([
				213, 103, 124, 246, 123, 90, 160, 81, 187, 64, 73, 110, 104, 173, 53, 158, 185, 124,
				251, 248,
			]),
			0
		],
	],
	// blockNumber = BlockTag, uncleIndex = number
	['blockNumber = BlockTags.LATEST, uncleIndex = 0', [BlockTags.LATEST, 0]],
	['blockNumber = BlockTags.EARLIEST, uncleIndex = 0', [BlockTags.EARLIEST, 0]],
	['blockNumber = BlockTags.PENDING, uncleIndex = 0', [BlockTags.PENDING, 0]],
	// blockNumber = Numbers, uncleIndex = number
	['blockNumber = "0x4b7"', ['0x4b7, uncleIndex = 0', 0]],
	['blockNumber = 1207, uncleIndex = 0', [1207, 0]],
	['blockNumber = "1207", uncleIndex = 0', ['1207', 0]],
	['blockNumber = BigInt("0x4b7"), uncleIndex = 0', [BigInt('0x4b7'), 0]],
	['blockNumber = undefined, uncleIndex = 0', [undefined, 0]],

	// blockNumber = Bytes, uncleIndex = NumberString
	[
		'blockNumber = "0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", uncleIndex = "0"',
		['0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8', '0'],
	],
	[
		'blockNumber = Buffer("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", "hex"), uncleIndex = "0"',
		[Buffer.from('0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8', 'hex'), '0'],
	],
	[
		'blockNumber = Uint8Array("d5677cf67b5aa051bb40496e68ad359eb97cfbf8"), uncleIndex = "0"',
		[
			new Uint8Array([
				213, 103, 124, 246, 123, 90, 160, 81, 187, 64, 73, 110, 104, 173, 53, 158, 185, 124,
				251, 248,
			]),
			'0'
		],
	],
	// blockNumber = BlockTag, uncleIndex = NumberString
	['blockNumber = BlockTags.LATEST, uncleIndex = "0"', [BlockTags.LATEST, '0']],
	['blockNumber = BlockTags.EARLIEST, uncleIndex = "0"', [BlockTags.EARLIEST, '0']],
	['blockNumber = BlockTags.PENDING, uncleIndex = "0"', [BlockTags.PENDING, '0']],
	// blockNumber = Numbers, uncleIndex = NumberString
	['blockNumber = "0x4b7", uncleIndex = "0"', ['0x4b7', '0']],
	['blockNumber = 1207, uncleIndex = "0"', [1207, '0']],
	['blockNumber = "1207", uncleIndex = "0"', ['1207', '0']],
	['blockNumber = BigInt("0x4b7"), uncleIndex = "0"', [BigInt('0x4b7'), '0']],
	['blockNumber = undefined, uncleIndex = "0"', [undefined, '0']],

	// blockNumber = Bytes, uncleIndex = BigInt
	[
		'blockNumber = "0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", uncleIndex = BigInt("0x0")',
		['0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8', BigInt('0x0')],
	],
	[
		'blockNumber = Buffer("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8", "hex"), uncleIndex = BigInt("0x0")',
		[Buffer.from('0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8', 'hex'), BigInt('0x0')],
	],
	[
		'blockNumber = Uint8Array("d5677cf67b5aa051bb40496e68ad359eb97cfbf8"), uncleIndex = BigInt("0x0")',
		[
			new Uint8Array([
				213, 103, 124, 246, 123, 90, 160, 81, 187, 64, 73, 110, 104, 173, 53, 158, 185, 124,
				251, 248,
			]),
			BigInt('0x0')
		],
	],
	// blockNumber = BlockTag, uncleIndex = BigInt
	['blockNumber = BlockTags.LATEST, uncleIndex = BigInt("0x0")', [BlockTags.LATEST, BigInt('0x0')]],
	['blockNumber = BlockTags.EARLIEST, uncleIndex = BigInt("0x0")', [BlockTags.EARLIEST, BigInt('0x0')]],
	['blockNumber = BlockTags.PENDING, uncleIndex = BigInt("0x0")', [BlockTags.PENDING, BigInt('0x0')]],
	// blockNumber = Numbers, uncleIndex = BigInt
	['blockNumber = "0x4b7", uncleIndex = BigInt("0x0")', ['0x4b7', BigInt('0x0')]],
	['blockNumber = 1207, uncleIndex = BigInt("0x0")', [1207, BigInt('0x0')]],
	['blockNumber = "1207", uncleIndex = BigInt("0x0")', ['1207', BigInt('0x0')]],
	['blockNumber = BigInt("0x4b7"), uncleIndex = BigInt("0x0")', [BigInt('0x4b7'), BigInt('0x0')]],
	['blockNumber = undefined, uncleIndex = BigInt("0x0")', [undefined, BigInt('0x0')]],
];

/**
 * Array consists of:
 * - Test title
 * - Input parameters:
 *     - blockNumber
 *     - uncleIndex
 *     - returnFormat
 * - mockRpcResponse
 */
type TestData = [string, [Bytes | BlockNumberOrTag | undefined, Numbers, DataFormat], Block];

/**
 * For each testCase in testCases, we add a version of testCase with each returnFormat in returnFormats.
 * This also adds mockRpcResponse to each testCase
 */
export const testData = (() => {
	const _testData: TestData[] = [];
	for (const testCase of testCases) {
		for (const returnFormat of returnFormats) {
			const [testTitle, inputParameters] = testCase;
			_testData.push([
				testTitle,
				[...inputParameters, returnFormat],
				mockRpcResponse
			]);
		}
	}
	return _testData;
})();
