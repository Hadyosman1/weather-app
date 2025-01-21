import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Chatgpt generated this debounce function
export const debounce = <T extends unknown[], R>(
  callback: (...args: T) => Promise<R>, // Ensure callback returns a Promise
  delay: number,
): ((...args: T) => Promise<R>) => {
  // Ensure returned function also returns a Promise
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        // Resolve the promise returned by the callback
        callback(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };
};

export const getDayName = (date: Date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
};
