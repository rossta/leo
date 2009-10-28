
load('./spec/lib/jspec.js')
load('lib/artcart.core.js')

JSpec
.exec('spec/spec.core.js')
.run({ formatter: JSpec.formatters.Terminal })
.report()