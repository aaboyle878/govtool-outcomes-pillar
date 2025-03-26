import { MetadataValidationStatus } from "../types/api";

/**
 * Retrieves the translation for the given metadata validation status.
 *
 * @param t - The translation function from useTranslation
 * @param status - The metadata validation status.
 * @returns The translated string corresponding to the status.
 */
export const getMetadataDataMissingStatusTranslation = (
  t: (key: string) => string,
  status: MetadataValidationStatus
): string => {
  const errorKey =
    {
      [MetadataValidationStatus.URL_NOT_FOUND]: "dataMissing",
      [MetadataValidationStatus.INVALID_JSONLD]: "incorrectFormat",
      [MetadataValidationStatus.INCORRECT_FORMAT]: "incorrectFormat",
      [MetadataValidationStatus.INVALID_HASH]: "notVerifiable",
    }[status] || "dataMissing";

  return t(`dataMissingErrors.${errorKey}`);
};
