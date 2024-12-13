export function getRandomInt(min: number, max: number) {
  const multiplier = Number((max / 10).toFixed()) || 1;
  const modulus = max - min + 1;
  return (
    Math.ceil(Math.random() * (10 * multiplier)) % (modulus > 0 ? modulus : 1)
  );
}
