export const package_Template2 = (projectName, package1) => `
import { isEven } from "@${projectName}/${package1}";
import type { isEvenT } from "@${projectName}/${package1}";

export type isOddT = isEvenT;

export const isOdd: isOddT = (num) => !isEven(num);
export default isOdd;

`;
