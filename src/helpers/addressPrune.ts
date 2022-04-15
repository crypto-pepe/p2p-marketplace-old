export function addressPrune(address: string, simbols: number = 4): string {
  if (address.length > 8) {
    return `${address.slice(0, simbols)}...${address.slice(-simbols)}`;
  }

  return address;
}