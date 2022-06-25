const handler = (req, res) => {
  const { body } = req;
  res.json(body);
};

export { handler as octavify };
