import { ReadonlyURLSearchParams } from 'next/navigation';

export const createQueryString = (name: string, value: string | undefined, searchParams: ReadonlyURLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());

  if (value !== undefined) {
    params.set(name, value);
  } else {
    params.delete(name);
  }

  return params.toString();
};
