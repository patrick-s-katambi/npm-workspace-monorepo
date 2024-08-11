export const package_Template2 = `
import { isEven } from "@react-dojo/is-even";
import type { isEvenT } from "@react-dojo/is-even";

export type isOddT = isEvenT;

export const isOdd: isOddT = (num) => !isEven(num);
export default isOdd;

`;
