import argon2 from 'argon2';

const generateHash = async (password) => {
  const hash = await argon2.hash(password);
  console.log(`Mot de passe : ${password}`);
  console.log(`Hash : ${hash}`);
};

await generateHash('admin');
await generateHash('user');
await generateHash('user1');
await generateHash('user2');
await generateHash('user3');
