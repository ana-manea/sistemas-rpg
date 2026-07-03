export async function dashboardSummary(req, res) {
  res.json({ message: 'Dashboard disponível.', user: req.user });
}
