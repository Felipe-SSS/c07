export type LogPaginationInput = {
  limit?: string;
  offset?: string;
};

export const normalizeLogPagination = (input: LogPaginationInput = {}) => {
  const parsedLimit = Number(input.limit ?? 50);
  const parsedOffset = Number(input.offset ?? 0);

  const limit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 50) : 50;
  const offset = Number.isInteger(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0;

  return { limit, offset };
};
