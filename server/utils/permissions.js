export const getUserRole = (file, userId) => {
  if (file.user.toString() === userId.toString()) {
    return "owner";
  }

  const shared = file.sharedWith.find(
    s => s.user.toString() === userId.toString()
  );

  return shared ? shared.role : null;
};
