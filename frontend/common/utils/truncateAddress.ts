export const truncateAddress = (address: string, length = 6) =>
  `${address?.substring(0, length)}...${address?.substring(
    address.length - length
  )}`;
