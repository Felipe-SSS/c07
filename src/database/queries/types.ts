export type InsertResult = {
  insertId: number;
  affectedRows: number;
};

export type MutationResult = {
  affectedRows: number;
};

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
