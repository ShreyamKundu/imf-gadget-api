const { nanoid } = require("nanoid");

const generateCodename = () => {
  const prefixes = ["The Nightingale", "The Kraken", "Phantom Shadow", "Silver Fox", "Ghost Whisperer", "The Viper", "Black Falcon", "Iron Scorpion", "Silent Specter", "The Mirage"];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = nanoid(4).toUpperCase();  

  return `${prefix} ${suffix}`;
};

module.exports = generateCodename;
