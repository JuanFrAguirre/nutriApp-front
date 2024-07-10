export const checkIfNumber = (input: any) => {
  return !isNaN(Number(input)) && typeof input === 'number';
};
