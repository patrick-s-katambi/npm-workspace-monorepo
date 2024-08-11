export type isEvenT = (num: number) => boolean;

export const isEven: isEvenT = (num) => num % 2 === 0;
export default isEven;
