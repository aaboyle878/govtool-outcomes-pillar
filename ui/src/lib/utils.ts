import { bech32 } from "bech32";
import { Buffer } from "buffer";

export function formatTimeStamp(timeStamp: string): string {
  const date = new Date(timeStamp);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Encodes a CIP129 identifier based on the provided transaction ID, index, and bech32 prefix.
 * @param txID - The transaction ID.
 * @param index - The index.
 * @param bech32Prefix - The bech32 prefix.
 * @returns The generated CIP129 identifier.
 */
export const encodeCIP129Identifier = ({
  txID,
  index,
  bech32Prefix,
}: {
  txID: string;
  index?: string;
  bech32Prefix: string;
}) => {
  const govActionBytes = Buffer.from(index ? txID + index : txID, "hex");
  const words = bech32.toWords(govActionBytes);
  return bech32.encode(bech32Prefix, words);
};

export function getProposalStatus(status: Status): string {
  if (status.enacted_epoch !== null) {
    return "Enacted";
  }
  if (status.expired_epoch !== null) {
    return "Expired";
  }
  if (status.ratified_epoch !== null) {
    return "Ratified";
  }
  if (
    status.enacted_epoch === null &&
    status.expired_epoch === null &&
    status.ratified_epoch === null &&
    status.dropped_epoch === null
  ) {
    return "Live";
  }
  return "Unknown";
}

export function getStatusDetails(status: Status, statusTimes: StatusTimes) {
  const currentStatus = getProposalStatus(status);

  let statusEpoch: number | null = null;
  let statusDate: string | null = null;

  switch (currentStatus) {
    case "Enacted":
      statusEpoch = status.enacted_epoch;
      statusDate = statusTimes.enacted_time;
      break;
    case "Expired":
      statusEpoch = status.expired_epoch;
      statusDate = statusTimes.expired_time;
      break;
    case "Ratified":
      statusEpoch = status.ratified_epoch;
      statusDate = statusTimes.ratified_time;
      break;
    case "Live":
      statusEpoch = null;
      statusDate = null;
      break;
  }

  return {
    statusEpoch,
    statusDate: statusDate ? formatTimeStamp(statusDate) : null,
  };
}
