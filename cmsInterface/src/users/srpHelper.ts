import { BigInteger } from "jsbn";
import CryptoJS from "crypto-js";

// Constants for SRP (provided by Cognito)
const N_HEX = "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E08...";
const G_HEX = "2";
const K_HEX = "5";

const N = new BigInteger(N_HEX, 16); // Large prime using jsbn
const g = new BigInteger(G_HEX, 16); // Generator
const k = new BigInteger(K_HEX, 16); // Multiplier parameter

function sha256Hex(str: string) {
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}

// Calculate SRP_A using jsbn
export function calculateSrpA() {
  const a = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  const aBigInt = new BigInteger(a, 16); // Client's private key
  const A = g.modPow(aBigInt, N); // SRP A = g^a % N
  return {
    A: A.toString(16),
    a: aBigInt,
  };
}

export function computeSrpSignature(
  username: string,
  password: string,
  challengeParams: { SRP_B: string; SALT: string; SECRET_BLOCK: string }
) {
  const { A, a } = calculateSrpA();
  const B = new BigInteger(challengeParams.SRP_B, 16);
  const salt = new BigInteger(challengeParams.SALT, 16);

  // Calculate u (SHA-256 hash of A and B)
  const uHex = sha256Hex(A + B.toString(16));
  const u = new BigInteger(uHex, 16);

  // Calculate x (salted password hash)
  const xHex = sha256Hex(salt.toString(16) + sha256Hex(`${username}:${password}`));
  const x = new BigInteger(xHex, 16);

  // Calculate S (SRP session key)
  const S = B.subtract(k.multiply(g.modPow(x, N))).modPow(a.add(u.multiply(x)), N);

  // Calculate M (SRP signature)
  const M = sha256Hex(S.toString(16) + challengeParams.SECRET_BLOCK + new Date().toISOString());

  return {
    SRP_A: A,
    PASSWORD_CLAIM_SIGNATURE: M,
    TIMESTAMP: new Date().toISOString(),
  };
}
