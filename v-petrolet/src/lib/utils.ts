import * as Joi from "joi";
import { v4 as uuidv4 } from "uuid";

export const randomUuid = () => uuidv4();

export function insertQueryParams(
  url: string,
  params: Record<string, string | number>
): string {
  const urlObj = new URL(url);

  const searchParams = new URLSearchParams(urlObj.search);

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value));
  });

  urlObj.search = searchParams.toString();

  return urlObj.toString();
}

export function validateForm(
  schema: Joi.ObjectSchema<any>,
  payload: any
): { valid: boolean; errors: Record<string, string> } {
  const { error } = schema.validate(payload, { abortEarly: false });

  let errors: Record<string, string> = {};
  if (error) {
    errors = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {} as Record<string, string>);
  }

  return {
    valid: !!error,
    errors,
  };
}

export const formatDuration: (ms: number) => string = (ms) => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

const patterns = [/[a-z]+/, /[A-Z]+/, /[0-9]+/, /[!#@?]+/];

const passwordStrengths = ["", "weak", "fair", "strong", "very strong"];

export function gradePassword(passwd: string): {
  strength: number;
  desc: string;
} {
  const strength = !!passwd
    ? patterns.map((pattern) => !!passwd.match(pattern)).filter((p) => p).length
    : 0;
  return {
    strength,
    desc: passwordStrengths[strength],
  };
}

export function isStrongPassword(passwd: string): boolean {
  return gradePassword(passwd).strength === patterns.length;
}
