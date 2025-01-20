export type TempFormat = "c" | "f";

export const formatTemperature = (tmp: number, sign: TempFormat) => {
  return `${tmp}°${sign.toUpperCase()}`;
};
