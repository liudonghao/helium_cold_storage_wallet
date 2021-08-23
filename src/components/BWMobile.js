
import { sha256 } from 'js-sha256'
import nacl_factory from 'js-nacl';
import { Base64 } from 'js-base64';
import {wordList as wordlist} from './BWEntropyFromMnemonic';

const lpad = (
  str,
  padString,
  length,
) => {
  let strOut = str
  while (strOut.length < length) strOut = padString + strOut
  return strOut
}

const bytesToBinary = (bytes) => bytes
  .map((x) => lpad(x.toString(2), '0', 8))
  .join('')

const binaryToByte = (bin) => parseInt(bin, 2)

const deriveChecksumBits = (entropyBuffer) => {
  const ENT = entropyBuffer.length * 8
  const CS = ENT / 32
  const hash = sha256(entropyBuffer)

  return bytesToBinary([].slice.call(hash)).slice(0, CS)
}

export function fromEntropy(entropy) {
  if (entropy.length < 16) throw new Error('invalid entropy, less than 16')
  if (entropy.length > 32) throw new Error('invalid entropy, greater than 32')
  if (entropy.length % 4 !== 0)
    throw new Error('invalid entropy, not divisble by 4')

  const entropyBits = bytesToBinary([].slice.call(entropy))
  const checksumBits = deriveChecksumBits(entropy)

  const bits = entropyBits + checksumBits
  const chunks = bits.match(/(.{1,11})/g) || []
  const words = chunks.map((binary) => wordlist[binaryToByte(binary)])

  return words;
}

//We don't need below codes, tests show that the logics of creating key pair is the same amoung CLI and mobile
// export function fromMnemonic(mnenomic){
//   const entropy = toEntropy(mnenomic)
//   const seed = Buffer.concat([entropy, entropy])

//   return Keypair_fromEntropy(seed)
// }

// function Keypair_fromEntropy(entropy) {
//   const entropyBuffer = Buffer.from(entropy)
//   if (Buffer.byteLength(entropyBuffer) !== 32)
//     throw new Error('Invalid entropy, must be 32 bytes')

//     nacl_factory.instantiate(function (nacl) {
//       let keypair=nacl.crypto_sign_seed_keypair(entropyBuffer);
//       let address= Base64.fromUint8Array(keypair.signPk);
//       console.log('ssssss==========address====', address);
//     });
// }

// function toEntropy(words) {
//   // convert word indices to 11 bit binary strings
//   const bits = words
//     .map((word) => {
//       const index = wordlist.indexOf(word)
//       return lpad(index.toString(2), '0', 11)
//     })
//     .join('')

//   // split the binary string into ENT/CS
//   const dividerIndex = Math.floor(bits.length / 33) * 32
//   const entropyBits = bits.slice(0, dividerIndex)
//   const checksumBits = bits.slice(dividerIndex)

//   // calculate the checksum and compare
//   const entropyBytes = (entropyBits.match(/(.{1,8})/g) || []).map(
//     binaryToByte,
//   )
//   if (entropyBytes.length < 16) throw new Error('invalid checksum')
//   if (entropyBytes.length > 32) throw new Error('invalid checksum')
//   if (entropyBytes.length % 4 !== 0) throw new Error('invalid checksum')

//   const entropy = Buffer.from(entropyBytes)
//   const newChecksum = deriveChecksumBits(entropy)
//   if (newChecksum !== checksumBits) throw new Error('invalid checksum')

//   return entropy
// }