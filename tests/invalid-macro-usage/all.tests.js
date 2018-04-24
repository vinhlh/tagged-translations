runTests(__dirname, [], ['babel-plugin-macros'], transform => {
  expect(transform).toThrowErrorMatchingSnapshot()
})
