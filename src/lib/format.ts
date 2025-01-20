export const formatTemperature = (tmp: number, sign: "c" | "f") => {
  return `${tmp}°${sign.toUpperCase()}`;
};
