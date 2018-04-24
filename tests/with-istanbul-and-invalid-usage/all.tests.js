runTests(
  __dirname,
  [],
  ['babel-plugin-istanbul', 'babel-plugin-macros'],
  transform => {
    expect(transform).toThrowErrorMatchingSnapshot()
  }
)
