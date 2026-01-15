export const getProfile = (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email
  });
};