const api = '/Accounts';

async function getAccountById(accountId: number) {
  const result = await fetch(`${api}/${accountId}`);
  if (!result.ok) {
    throw new Error('Something went wrong');
  }

  return result.json();
}

export { getAccountById };
