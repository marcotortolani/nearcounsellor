export const countries = [
  { name: 'Argentina', code: 'AR' },
  { name: 'Brazil', code: 'BR' },
  { name: 'New Zealand', code: 'NZ' },
].sort((a, b) => a.name.localeCompare(b.name));

export const getCountryFlag = (countryCode: string) => {
  const country = countries.find(c => c.code === countryCode);
  if (!country) return '';
  const codePoints = country.code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
