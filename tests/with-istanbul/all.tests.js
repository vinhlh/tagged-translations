const mockIstanbulTracker = babel => {
  const { types: t } = babel

  return {
    visitor: {
      Program(path) {
        debugger
      },
      Identifier(path) {
        if (path.node.name.indexOf('cov_') !== -1) {
          path.node.name = 'cov_tracker'
        }
      }
    }
  }
}

runTests(
  __dirname,
  [],
  ['babel-plugin-istanbul', 'babel-plugin-macros', mockIstanbulTracker],
  transform => {
    const { code } = transform()
    expect(code).toMatch(
      "const name = (cov_tracker.s[0]++, `Xin chào ${'Vinh'} 👻`);"
    )
    expect(code).toMatch(
      'return success ? (cov_tracker.b[1][0]++, `Xin chào ${name} 👻`) : (cov_tracker.b[1][1]++, "it\'s an error");'
    )
    expect(code).toMatch(
      'cov_tracker.f[0]++;\n  cov_tracker.s[2]++;\n  return t`Xin chào ${name} 👻`;'
    )
  }
)
