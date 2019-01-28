jest.mock('@/provider/InpageProvider', () => {
  class InpageProvider {}

  return InpageProvider;
});
