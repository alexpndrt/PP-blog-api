import argon2 from 'argon2';

const generateHash = async (password) => {
  const hash = await argon2.hash(password);
  console.log(`Mot de passe : ${password}`);
  console.log(`Hash : ${hash}`);
};

await generateHash('admin123');
await generateHash('user123');
await generateHash('password');
