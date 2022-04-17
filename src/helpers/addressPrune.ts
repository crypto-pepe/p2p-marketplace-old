export function addressPrune(address: string, simbols: number = 4): string {
  if (address.length > simbols * 2) {
    return `${address.slice(0, simbols)}...${address.slice(-simbols)}`;
  }

  return address;
}